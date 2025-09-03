import Link from "next/link";
import { Card } from "@/helpers/ui";

export default function HistoryPage() {
  const invoices = [
    { id: 1, date: "01.08.2025", total: "430,00 zł" },
    { id: 2, date: "01.07.2025", total: "390,00 zł" },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Historia faktur</h1>

      <div className="space-y-3">
        {invoices.map((inv) => (
          <Link key={inv.id} href={`/invoice/${inv.id}`}>
            <Card className="flex justify-between items-center hover:bg-gray-50">
              <span className="text-gray-700">{inv.date}</span>
              <span className="font-semibold text-lg">{inv.total}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
