import Link from "next/link";
import { Card } from "@/components/Card";

export default function HistoryPage() {
  const invoices = [
    { id: 1, date: "01.08.2025", total: "430,00 zł" },
    { id: 2, date: "01.07.2025", total: "390,00 zł" },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-amber-900">Historia faktur</h1>

      <div className="space-y-3">
        {invoices.map((inv) => (
          <Link key={inv.id} href={`/invoice/${inv.id}`}>
            <Card className="flex justify-between items-center hover:bg-amber-100/60 transition-colors cursor-pointer">
              <span className="text-amber-700 font-medium">{inv.date}</span>
              <span className="font-bold text-lg text-amber-900">
                {inv.total}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
