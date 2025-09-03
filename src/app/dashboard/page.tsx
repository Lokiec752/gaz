import { Card, SuccessButton } from "@/helpers/ui";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Ostatnia faktura</h1>

      <Card className="space-y-3">
        <p className="text-gray-500">01.08.2025</p>
        <p className="text-3xl font-extrabold tracking-tight">430,00 zł</p>

        {/* mini tabela 22E / 22H jak w mockupie */}
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-white">
            <span className="text-gray-700">Dom 22E</span>
            <span className="font-semibold">210,00 zł</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-white">
            <span className="text-gray-700">Dom 22H</span>
            <span className="font-semibold">220,00 zł</span>
          </div>
        </div>

        <SuccessButton className="mt-2">Dodaj nową fakturę</SuccessButton>
      </Card>
    </div>
  );
}
