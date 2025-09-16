import { Card } from "./Card";

type InvoiceOverviewProps = {
  date: Date;
  total: number;
  meterReading22E: number;
  meterReading22H: number;
};

export async function InvoiceOverview({
  date,
  meterReading22E,
  meterReading22H,
  total,
}: InvoiceOverviewProps) {
  const formattedDate = new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <Card className="space-y-4">
      <div className="flex items-end justify-between">
        <p className="text-xl font-bold tracking-tight text-amber-600">
          {formattedDate}
        </p>
        <p className="text-2xl font-black tracking-tight text-amber-900">
          {total.toFixed(2)} zł
        </p>
      </div>

      <div className="divide-y divide-amber-200/50 rounded-xl border border-amber-200/60 overflow-hidden bg-amber-25/30">
        <div className="flex items-center justify-between px-4 py-3 bg-amber-50/60 hover:bg-amber-100/50 transition-colors">
          <span className="text-amber-800 font-medium">Dom 22E</span>
          <span className="font-bold text-amber-900">
            {meterReading22E.toFixed(2)} zł
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-amber-50/60 hover:bg-amber-100/50 transition-colors">
          <span className="text-amber-800 font-medium">Dom 22H</span>
          <span className="font-bold text-amber-900">
            {meterReading22H.toFixed(2)} zł
          </span>
        </div>
      </div>
    </Card>
  );
}
