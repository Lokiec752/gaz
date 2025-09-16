"use client";

import { deleteInvoiceById } from "@/app/actions/invoice";
import { Button } from "@/components/Button";
import { redirect } from "next/navigation";

export function DeleteInvoiceButton({ invoiceId }: { invoiceId: string }) {
  const handleDelete = async () => {
    if (!confirm("Czy na pewno chcesz usunąć tę fakturę?")) return;
    try {
      await deleteInvoiceById(invoiceId);
    } catch (error) {
      console.error("Error deleting invoice:", error);
    } finally {
      redirect("/dashboard");
    }
  };

  return (
    <Button variant="danger" className="font-bold" onClick={handleDelete}>
      Usuń
    </Button>
  );
}
