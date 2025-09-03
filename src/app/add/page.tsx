import { Card, SectionTitle, Input, PrimaryButton } from "@/helpers/ui";

export default function AddInvoicePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Dodaj fakturę</h1>

      <form className="space-y-6">
        <Card className="space-y-3">
          <SectionTitle>Dane z faktury</SectionTitle>
          <Input type="number" placeholder="Paliwo gazowe (PLN)" />
          <Input type="number" placeholder="Abonament (PLN)" />
          <Input type="number" placeholder="Dystrybucja stała (PLN)" />
          <Input type="number" placeholder="Dystrybucja zmienna (PLN)" />
        </Card>

        <Card className="space-y-3">
          <SectionTitle>Stany liczników</SectionTitle>
          <Input type="number" placeholder="Dom 22E" />
          <Input type="number" placeholder="Dom 22H" />
        </Card>

        <PrimaryButton type="submit">Zapisz fakturę</PrimaryButton>
      </form>
    </div>
  );
}
