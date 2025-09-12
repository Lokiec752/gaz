import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-amber-900">Ostatnia faktura</h1>

      <Card className="space-y-4">
        <p className="text-amber-600 font-medium text-sm">01.08.2025</p>
        <p className="text-3xl font-black tracking-tight text-amber-900">
          430,00 zł
        </p>

        {/* mini tabela 22E / 22H jak w mockupie */}
        <div className="divide-y divide-amber-200/50 rounded-xl border border-amber-200/60 overflow-hidden bg-amber-25/30">
          <div className="flex items-center justify-between px-4 py-3 bg-amber-50/60 hover:bg-amber-100/50 transition-colors">
            <span className="text-amber-800 font-medium">Dom 22E</span>
            <span className="font-bold text-amber-900">210,00 zł</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-amber-50/60 hover:bg-amber-100/50 transition-colors">
            <span className="text-amber-800 font-medium">Dom 22H</span>
            <span className="font-bold text-amber-900">220,00 zł</span>
          </div>
        </div>

        <Button variant="warning" className="mt-3 font-bold">
          Dodaj nową fakturę
        </Button>
      </Card>
    </div>
  );
}
