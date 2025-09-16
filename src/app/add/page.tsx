import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { createInvoice } from "../actions/invoice";

export default function AddInvoicePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-amber-900">Dodaj fakturę</h1>

      <form className="space-y-6" action={createInvoice}>
        <Card className="space-y-4">
          <SectionTitle>Dane z faktury</SectionTitle>
          <div className="space-y-2">
            <label
              htmlFor="gasFuel"
              className="block text-sm font-bold text-amber-600"
            >
              Paliwo gazowe (PLN)
            </label>
            <Input
              id="gasFuel"
              name="gasFuel"
              type="number"
              placeholder="0 zł"
              className="placeholder:text-amber-400"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="subscription"
              className="block text-sm font-bold text-amber-600"
            >
              Abonament (PLN)
            </label>
            <Input
              id="subscription"
              name="subscription"
              type="number"
              placeholder="0 zł"
              className="placeholder:text-amber-400"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="fixedDistribution"
              className="block text-sm font-bold text-amber-600"
            >
              Dystrybucja stała (PLN)
            </label>
            <Input
              id="fixedDistribution"
              name="fixedDistribution"
              type="number"
              placeholder="0 zł"
              className="placeholder:text-amber-400"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="variableDistribution"
              className="block text-sm font-bold text-amber-600"
            >
              Dystrybucja zmienna (PLN)
            </label>
            <Input
              id="variableDistribution"
              name="variableDistribution"
              type="number"
              placeholder="0 zł"
              className="placeholder:text-amber-400"
            />
          </div>
        </Card>

        <Card className="space-y-4">
          <SectionTitle>Stany liczników</SectionTitle>
          <div className="space-y-2">
            <label
              htmlFor="meterReading22E"
              className="block text-sm font-bold text-amber-600"
            >
              Dom 22E
            </label>
            <Input
              id="meterReading22E"
              name="meterReading22E"
              type="number"
              placeholder="Wprowadź stan licznika"
              className="placeholder:text-amber-400"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="meterReading22H"
              className="block text-sm font-bold text-amber-600"
            >
              Dom 22H
            </label>
            <Input
              id="meterReading22H"
              name="meterReading22H"
              type="number"
              placeholder="Wprowadź stan licznika"
              className="placeholder:text-amber-400"
            />
          </div>
        </Card>

        <Button variant="primary" type="submit" className="font-bold">
          Dodaj fakturę
        </Button>
      </form>
    </div>
  );
}
