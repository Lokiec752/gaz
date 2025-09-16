import { InvoiceForm } from "@/components/InvoiceForm";
import { createInvoice, getTheLastInvoice } from "../actions/invoice";

export default async function AddInvoicePage() {
  const lastInvoice = await getTheLastInvoice();
  return (
    <InvoiceForm
      title="Dodaj fakturę"
      submitButtonText="Dodaj fakturę"
      initialFixedDistribution={lastInvoice?.fixedDistribution}
      initialSubscription={lastInvoice?.subscription}
      action={createInvoice}
    />
  );
}
