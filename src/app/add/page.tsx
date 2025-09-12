import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function AddInvoicePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-amber-900">Dodaj fakturę</h1>

      <form className="space-y-6">
        <Card className="space-y-4">
          <SectionTitle>Dane z faktury</SectionTitle>
          <Input
            type="number"
            placeholder="Paliwo gazowe (PLN)"
            className="placeholder:text-amber-400"
          />
          <Input
            type="number"
            placeholder="Abonament (PLN)"
            className="placeholder:text-amber-400"
          />
          <Input
            type="number"
            placeholder="Dystrybucja stała (PLN)"
            className="placeholder:text-amber-400"
          />
          <Input
            type="number"
            placeholder="Dystrybucja zmienna (PLN)"
            className="placeholder:text-amber-400"
          />
        </Card>

        <Card className="space-y-4">
          <SectionTitle>Stany liczników</SectionTitle>
          <Input
            type="number"
            placeholder="Dom 22E"
            className="placeholder:text-amber-400"
          />
          <Input
            type="number"
            placeholder="Dom 22H"
            className="placeholder:text-amber-400"
          />
        </Card>

        <Button variant="primary" type="submit" className="font-bold">
          Zapisz fakturę
        </Button>
      </form>
    </div>
  );
}
