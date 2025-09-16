import Link from "next/link";
import { InvoiceOverview } from "@/components/InvoiceOverview";
import { getTheLastInvoice } from "../actions/invoice";
import { Button } from "@/components/Button";

export default async function DashboardPage() {
  const lastInvoice = await getTheLastInvoice();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-amber-900">Gaz</h1>

      {lastInvoice && (
        <div>
          <p className="flex justify-between items-center">
            <span className="text-xl text-amber-700 font-bold">
              Ostatnia faktura
            </span>
          </p>
          <Link href={`/invoice/${lastInvoice.id}`} className="space-y-4 p-5">
            <InvoiceOverview
              date={lastInvoice.date}
              meterReading22E={lastInvoice.charges.house22E}
              meterReading22H={lastInvoice.charges.house22H}
              total={lastInvoice.total}
            />
          </Link>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <Link href="/history">
          <Button variant="success">Przejdź do historii</Button>
        </Link>
        <Link href="/chart">
          <Button variant="primary">Wyświetl wykres</Button>
        </Link>
      </div>
    </div>
  );
}
