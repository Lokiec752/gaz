import Link from "next/link";
import { getAllInvoices } from "../actions/invoice";
import { InvoiceOverview } from "@/components/InvoiceOverview";

export default async function History() {
  const allInvoices = await getAllInvoices();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-amber-900">Ostatnie faktury</h1>

      {allInvoices.map((invoice) => (
        <Link
          key={invoice.id}
          href={`/invoice/${invoice.id}`}
          className="space-y-4 p-5"
        >
          <InvoiceOverview
            key={invoice.date.toISOString()}
            date={invoice.date}
            meterReading22E={invoice.charges.house22E}
            meterReading22H={invoice.charges.house22H}
            total={invoice.total}
          />
        </Link>
      ))}
    </div>
  );
}
