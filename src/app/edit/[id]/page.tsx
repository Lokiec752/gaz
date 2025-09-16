import { InvoiceForm } from "@/components/InvoiceForm";
import { getInvoiceById, updateInvoice } from "../../actions/invoice";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

type EditInvoicePageProps = {
  params: { id: string };
};

export default async function EditInvoicePage({
  params,
}: EditInvoicePageProps) {
  const { id } = await params;
  // Get user session
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  // Fetch the invoice
  const invoice = await getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  // Verify ownership
  if (invoice.userEmail !== session.user.email) {
    notFound(); // Don't reveal that the invoice exists to unauthorized users
  }

  // Convert Mongoose document to plain object for client component
  const invoiceData = {
    gasFuel: invoice.gasFuel,
    subscription: invoice.subscription,
    fixedDistribution: invoice.fixedDistribution,
    variableDistribution: invoice.variableDistribution,
    meterReading22E: invoice.meterReading22E,
    meterReading22H: invoice.meterReading22H,
  };

  // Create a bound action with the invoice ID
  const updateInvoiceWithId = async (formData: FormData) => {
    "use server";
    return updateInvoice(id, formData);
  };

  return (
    <InvoiceForm
      title="Edytuj fakturę"
      submitButtonText="Zapisz zmiany"
      initialDate={invoice.date}
      initialGasFuel={invoiceData.gasFuel}
      initialSubscription={invoiceData.subscription}
      initialFixedDistribution={invoiceData.fixedDistribution}
      initialVariableDistribution={invoiceData.variableDistribution}
      initialMeterReading22E={invoiceData.meterReading22E}
      initialMeterReading22H={invoiceData.meterReading22H}
      action={updateInvoiceWithId}
    />
  );
}
