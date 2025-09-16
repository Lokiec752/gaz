"use server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { IInvoice, Invoice } from "@/models/Invoice";
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
    const data: CreateInvoiceData = {
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
      userEmail: session.user.email, // Store user email
      date: new Date(),
    };

    // Removed console.log to avoid exposing sensitive user data in server logs

    // Connect to database
    await connectToDatabase();

    // Create and save invoice
    const invoice = new Invoice(data);
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

export async function getAllInvoices(): Promise<IInvoice[]> {
  await connectToDatabase();
  return Invoice.find().sort({ date: -1 }).exec();
}

export async function getInvoiceById(id: string): Promise<IInvoice | null> {
  await connectToDatabase();
  return Invoice.findById(id).exec();
}

export async function deleteInvoiceById(id: string): Promise<void> {
  await connectToDatabase();
  await Invoice.findByIdAndDelete(id).exec();
}

export async function updateInvoice(id: string, formData: FormData) {
  try {
    // Get user session
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    // Parse form data
    const updateData = {
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
    const existingInvoice = await Invoice.findById(id);
    if (!existingInvoice) {
      throw new Error("Invoice not found");
    }

    if (existingInvoice.userEmail !== session.user.email) {
      throw new Error("Unauthorized - You can only edit your own invoices");
    }

    // Update the invoice (pre-save hook will recalculate the total)
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    console.log("Invoice updated successfully:", updatedInvoice?._id);
  } catch (error) {
    console.error("Error updating invoice:", error);
    throw error;
  }

  // Redirect to dashboard after successful update
  redirect("/dashboard");
}
