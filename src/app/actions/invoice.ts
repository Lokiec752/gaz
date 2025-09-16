"use server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Invoice, InvoiceModel } from "@/models/Invoice";
import { redirect } from "next/navigation";

type CreateInvoiceData = {
  userEmail: string;
  gasFuel: number;
  subscription: number;
  fixedDistribution: number;
  variableDistribution: number;
  meterReading22E: number;
  meterReading22H: number;
  date: Date;
};

function calculateGross(net: number): number {
  const vat = 0.23; // 23% VAT
  return parseFloat((net * (1 + vat)).toFixed(2));
}

function invoiceToGross(
  invoice: Omit<CreateInvoiceData, "userEmail" | "date">
): Pick<
  CreateInvoiceData,
  "gasFuel" | "subscription" | "fixedDistribution" | "variableDistribution"
> {
  return {
    gasFuel: calculateGross(invoice.gasFuel),
    subscription: calculateGross(invoice.subscription),
    fixedDistribution: calculateGross(invoice.fixedDistribution),
    variableDistribution: calculateGross(invoice.variableDistribution),
  };
}

function calculate22HCharge(
  data: Omit<CreateInvoiceData, "userEmail" | "date">,
  previousMeterReadings: { meterReading22E: number; meterReading22H: number }
): number {
  const { gasFuel, subscription, fixedDistribution, variableDistribution } =
    invoiceToGross(data);

  // Calculate actual usage differences
  const usage22H = data.meterReading22H - previousMeterReadings.meterReading22H;
  const usage22E = data.meterReading22E - previousMeterReadings.meterReading22E;

  // Safety check: prevent division by zero or negative usage
  if (usage22E <= 0) {
    console.warn("Invalid usage22E:", usage22E, "Using fallback calculation");
    // Fallback: split evenly if no valid usage data
    const totalInvoiceGross =
      gasFuel + subscription + fixedDistribution + variableDistribution;
    return parseFloat((totalInvoiceGross / 2).toFixed(2));
  }

  const usageRatio = usage22H / usage22E;

  const usedGasFuel = gasFuel * usageRatio;
  const fixedTaxes = (subscription + fixedDistribution) / 2; // Half of fixed taxes
  const variableTaxes = variableDistribution * usageRatio;

  const total22H = usedGasFuel + fixedTaxes + variableTaxes;
  return parseFloat(total22H.toFixed(2));
}

function calculate22ECharge(
  data: Omit<CreateInvoiceData, "userEmail" | "date">,
  total22HCharge: number
): number {
  const { gasFuel, subscription, fixedDistribution, variableDistribution } =
    invoiceToGross(data);

  const totalInvoiceGross =
    gasFuel + subscription + fixedDistribution + variableDistribution;
  const total22E = totalInvoiceGross - total22HCharge;

  return parseFloat(total22E.toFixed(2));
}

export async function getTheLastInvoice(): Promise<Invoice | null> {
  try {
    await connectToDatabase();
    const lastInvoice = await InvoiceModel.findOne().sort({ date: -1 }).exec();
    return lastInvoice;
  } catch (error) {
    console.error("Error fetching the last invoice:", error);
    return null;
  }
}

async function getPreviousMeterReadings(
  currentDate: Date
): Promise<{ meterReading22E: number; meterReading22H: number }> {
  try {
    await connectToDatabase();

    // Find the most recent invoice before the current date (across all users)
    const previousInvoice = await InvoiceModel.findOne({
      date: { $lt: currentDate },
    })
      .sort({ date: -1 })
      .exec();

    if (previousInvoice) {
      return {
        meterReading22E: previousInvoice.meterReading22E,
        meterReading22H: previousInvoice.meterReading22H,
      };
    }

    // If no previous invoice found, return 0s
    return {
      meterReading22E: 0,
      meterReading22H: 0,
    };
  } catch (error) {
    console.error("Error fetching previous meter readings:", error);
    // Return 0s as fallback
    return {
      meterReading22E: 0,
      meterReading22H: 0,
    };
  }
}

function parseFloatLocale(value: string | null): number {
  if (!value) return 0;
  // Replace all commas with dots for proper parsing
  const normalizedValue = value.toString().replace(/,/g, ".");
  return Number(normalizedValue) || 0;
}

export async function createInvoice(formData: FormData) {
  try {
    // Get user session
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    // Parse form data
    const formDataParsed = {
      gasFuel: parseFloatLocale(formData.get("gasFuel") as string),
      subscription: parseFloatLocale(formData.get("subscription") as string),
      fixedDistribution: parseFloatLocale(
        formData.get("fixedDistribution") as string
      ),
      variableDistribution: parseFloatLocale(
        formData.get("variableDistribution") as string
      ),
      meterReading22E: parseFloatLocale(
        formData.get("meterReading22E") as string
      ),
      meterReading22H: parseFloatLocale(
        formData.get("meterReading22H") as string
      ),
    };

    // Connect to database first (needed for getting previous readings)
    await connectToDatabase();

    // Get previous meter readings for usage calculation
    const currentDate = new Date();
    const previousMeterReadings = await getPreviousMeterReadings(currentDate);

    // Calculate charges using your business logic with previous readings
    const charge22H = calculate22HCharge(formDataParsed, previousMeterReadings);
    const charge22E = calculate22ECharge(formDataParsed, charge22H);

    // Calculate total from gross amounts
    const { gasFuel, subscription, fixedDistribution, variableDistribution } =
      invoiceToGross(formDataParsed);
    const total =
      gasFuel + subscription + fixedDistribution + variableDistribution;

    // Create complete invoice data
    const invoiceData = {
      ...formDataParsed,
      userEmail: session.user.email,
      date: currentDate,
      total: parseFloat(total.toFixed(2)),
      charges: {
        house22E: charge22E,
        house22H: charge22H,
      },
    };

    // Create and save invoice
    const invoice = new InvoiceModel(invoiceData);
    const savedInvoice = await invoice.save();

    console.log("Invoice created successfully:", savedInvoice._id);
  } catch (error) {
    console.error("Error creating invoice:", error);
    // In a real app, you might want to show an error message to the user
    throw error;
  }

  // Redirect to dashboard after successful creation
  redirect("/dashboard");
}

export async function getAllInvoices(): Promise<Invoice[]> {
  await connectToDatabase();
  return InvoiceModel.find().sort({ date: -1 }).exec();
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  await connectToDatabase();
  return InvoiceModel.findById(id).exec();
}

export async function deleteInvoiceById(id: string): Promise<void> {
  await connectToDatabase();
  await InvoiceModel.findByIdAndDelete(id).exec();
}

export async function updateInvoice(id: string, formData: FormData) {
  try {
    // Get user session
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    // Parse form data
    const formDataParsed = {
      gasFuel: parseFloatLocale(formData.get("gasFuel") as string),
      subscription: parseFloatLocale(formData.get("subscription") as string),
      fixedDistribution: parseFloatLocale(
        formData.get("fixedDistribution") as string
      ),
      variableDistribution: parseFloatLocale(
        formData.get("variableDistribution") as string
      ),
      meterReading22E: parseFloatLocale(
        formData.get("meterReading22E") as string
      ),
      meterReading22H: parseFloatLocale(
        formData.get("meterReading22H") as string
      ),
    };

    // Connect to database
    await connectToDatabase();

    // Find the invoice and verify ownership
    const existingInvoice = await InvoiceModel.findById(id);
    if (!existingInvoice) {
      throw new Error("Invoice not found");
    }

    if (existingInvoice.userEmail !== session.user.email) {
      throw new Error("Unauthorized - You can only edit your own invoices");
    }

    // Get previous meter readings (excluding the current invoice being updated)
    const previousMeterReadings = await getPreviousMeterReadings(
      existingInvoice.date
    );

    // Calculate charges using your business logic with previous readings
    const charge22H = calculate22HCharge(formDataParsed, previousMeterReadings);
    const charge22E = calculate22ECharge(formDataParsed, charge22H);

    // Calculate total from gross amounts
    const { gasFuel, subscription, fixedDistribution, variableDistribution } =
      invoiceToGross(formDataParsed);
    const total =
      gasFuel + subscription + fixedDistribution + variableDistribution;

    // Create complete update data
    const updateData = {
      ...formDataParsed,
      total: parseFloat(total.toFixed(2)),
      charges: {
        house22E: charge22E,
        house22H: charge22H,
      },
    };
    // Update the invoice
    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("Invoice updated successfully:", updatedInvoice?._id);
  } catch (error) {
    console.error("Error updating invoice:", error);
    throw error;
  }

  // Redirect to dashboard after successful update
  redirect("/dashboard");
}
