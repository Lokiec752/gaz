import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import {
  deleteInvoiceById,
  getAllInvoices,
  getInvoiceById,
} from "@/app/actions/invoice";
import { auth } from "@/auth";
import { DeleteInvoiceButton } from "./DeleteInvoiceButton";
import Link from "next/link";

export default async function InvoiceDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const invoice = await getInvoiceById(id);
  const session = await auth();
  const isAdmin = session?.user.isAdmin;

  if (!invoice) {
    return (
      <Card className="space-y-3">
        <p>Faktura nie znaleziona.</p>
      </Card>
    );
  }

  const date = new Date(invoice.date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-amber-900">Faktura z {date}</h1>

      <Card className="space-y-3">
        <div className="space-y-2">
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">Suma</span>
            <strong className="text-amber-900">{invoice.total} zł</strong>
          </p>

          <hr className="my-3 border-amber-200/50" />

          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">Paliwo gazowe</span>
            <strong className="text-amber-900">{invoice.gasFuel} zł</strong>
          </p>
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">Abonament</span>
            <strong className="text-amber-900">
              {invoice.subscription} zł
            </strong>
          </p>
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">
              Dystrybucja stała
            </span>
            <strong className="text-amber-900">
              {invoice.fixedDistribution} zł
            </strong>
          </p>
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">
              Dystrybucja zmienna
            </span>
            <strong className="text-amber-900">
              {invoice.variableDistribution} zł
            </strong>
          </p>
        </div>

        <hr className="my-3 border-amber-200/50" />

        <div className="space-y-2">
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">Dom 22E</span>
            <strong className="text-amber-900">
              {invoice.meterReading22E} zł
            </strong>
          </p>
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">Dom 22H</span>
            <strong className="text-amber-900">
              {invoice.meterReading22H} zł
            </strong>
          </p>
        </div>
      </Card>

      {isAdmin && (
        <div className="grid grid-cols-2 gap-3">
          <Link href={`/edit/${invoice.id}`}>
            <Button variant="warning" className="font-bold">
              Edytuj
            </Button>
          </Link>
          <DeleteInvoiceButton invoiceId={invoice.id} />
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const invoices = await getAllInvoices();
  return invoices.map((invoice) => ({ id: invoice.id }));
}
