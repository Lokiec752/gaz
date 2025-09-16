import { InvoiceForm } from "@/components/InvoiceForm";
import { createInvoice } from "../actions/invoice";

export default function AddInvoicePage() {
  return (
    <InvoiceForm
      action={createInvoice}
      submitButtonText="Dodaj fakturę"
      title="Dodaj fakturę"
    />
  );
}
