import { Card, WarnButton, DangerButton } from "@/helpers/ui";

export default async function InvoiceDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Faktura #{id}</h1>

      <Card className="space-y-2">
        <div className="space-y-1">
          <p className="flex justify-between">
            <span className="text-gray-700">Paliwo gazowe</span>
            <strong>300,00 zł</strong>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-700">Abonament</span>
            <strong>20,00 zł</strong>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-700">Dystrybucja stała</span>
            <strong>50,00 zł</strong>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-700">Dystrybucja zmienna</span>
            <strong>60,00 zł</strong>
          </p>
        </div>

        <hr className="my-2 border-gray-100" />

        <div className="space-y-1">
          <p className="flex justify-between">
            <span className="text-gray-700">Dom 22E</span>
            <strong>210,00 zł</strong>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-700">Dom 22H</span>
            <strong>220,00 zł</strong>
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <WarnButton>Edytuj</WarnButton>
        <DangerButton>Usuń</DangerButton>
      </div>
    </div>
  );
}
