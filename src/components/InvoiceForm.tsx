"use client";

import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

function handleNumberInput(event: React.FormEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  // Allow numbers, commas, dots, and basic editing
  const value = input.value;

  // Only allow numbers, one comma or dot, and ensure proper decimal format
  const sanitized = value
    .replace(/[^0-9,.]/g, "") // Only allow numbers, comma, dot
    .replace(/,/g, ".") // Replace comma with dot
    .replace(/\.{2,}/g, ".") // Replace multiple dots with single dot
    .replace(/^\./, "0."); // Add leading zero if starts with dot

  // Ensure only one decimal point
  const parts = sanitized.split(".");
  if (parts.length > 2) {
    input.value = parts[0] + "." + parts.slice(1).join("");
  } else {
    input.value = sanitized;
  }
}

type InvoiceFormProps = {
  title: string;
  submitButtonText: string;
  initialGasFuel?: number;
  initialFixedDistribution?: number;
  initialSubscription?: number;
  initialVariableDistribution?: number;
  initialMeterReading22E?: number;
  initialMeterReading22H?: number;
  action: (formData: FormData) => Promise<void>;
};

export function InvoiceForm({
  submitButtonText,
  title,
  initialGasFuel,
  initialFixedDistribution,
  initialSubscription,
  initialVariableDistribution,
  initialMeterReading22E,
  initialMeterReading22H,
  action,
}: InvoiceFormProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-amber-900">{title}</h1>

      <form className="space-y-6" action={action}>
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
              type="text"
              inputMode="decimal"
              placeholder="0 zł"
              defaultValue={initialGasFuel}
              onInput={handleNumberInput}
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
              type="text"
              inputMode="decimal"
              placeholder="0 zł"
              defaultValue={initialSubscription}
              onInput={handleNumberInput}
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
              type="text"
              inputMode="decimal"
              placeholder="0 zł"
              defaultValue={initialFixedDistribution}
              onInput={handleNumberInput}
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
              type="text"
              inputMode="decimal"
              placeholder="0 zł"
              defaultValue={initialVariableDistribution}
              onInput={handleNumberInput}
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
              type="text"
              inputMode="decimal"
              placeholder="Wprowadź stan licznika"
              defaultValue={initialMeterReading22E}
              onInput={handleNumberInput}
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
              type="text"
              inputMode="decimal"
              placeholder="Wprowadź stan licznika"
              defaultValue={initialMeterReading22H}
              onInput={handleNumberInput}
              className="placeholder:text-amber-400"
            />
          </div>
        </Card>

        <Button variant="primary" type="submit" className="font-bold">
          {submitButtonText}
        </Button>
      </form>
    </div>
  );
}
