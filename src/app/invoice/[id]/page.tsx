import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export default async function InvoiceDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-amber-900">Faktura #{id}</h1>

      <Card className="space-y-3">
        <div className="space-y-2">
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">Paliwo gazowe</span>
            <strong className="text-amber-900">300,00 zł</strong>
          </p>
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">Abonament</span>
            <strong className="text-amber-900">20,00 zł</strong>
          </p>
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">
              Dystrybucja stała
            </span>
            <strong className="text-amber-900">50,00 zł</strong>
          </p>
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">
              Dystrybucja zmienna
            </span>
            <strong className="text-amber-900">60,00 zł</strong>
          </p>
        </div>

        <hr className="my-3 border-amber-200/50" />

        <div className="space-y-2">
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">Dom 22E</span>
            <strong className="text-amber-900">210,00 zł</strong>
          </p>
          <p className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">Dom 22H</span>
            <strong className="text-amber-900">220,00 zł</strong>
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="warning" className="font-bold">
          Edytuj
        </Button>
        <Button variant="danger" className="font-bold">
          Usuń
        </Button>
      </div>
    </div>
  );
}
