import { Card } from "@/components/Card";
import { Chart } from "./Chart";
import { getAllInvoices } from "../actions/invoice";

interface PlainInvoice {
  date: string;
  charges: {
    house22E: number;
    house22H: number;
  };
  meterReading22E: number;
  meterReading22H: number;
  total: number;
}

// Helper function to aggregate invoice data by month
function aggregateInvoicesByMonth(invoices: PlainInvoice[]) {
  const monthlyData: {
    [key: string]: {
      house22E: number;
      house22H: number;
      count: number;
      sortDate: Date;
    };
  } = {};

  invoices.forEach((invoice) => {
    // Convert date string back to Date for processing
    const date = new Date(invoice.date);
    const monthKey = date.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
    });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        house22E: 0,
        house22H: 0,
        count: 0,
        sortDate: new Date(date.getFullYear(), date.getMonth(), 1), // First day of the month for sorting
      };
    }

    monthlyData[monthKey].house22E += invoice.charges.house22E;
    monthlyData[monthKey].house22H += invoice.charges.house22H;
    monthlyData[monthKey].count += 1;
  });

  // Convert to array format for the chart and sort by actual date (oldest first)
  return Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      house22E: Math.round(data.house22E * 100) / 100,
      house22H: Math.round(data.house22H * 100) / 100,
      invoiceCount: data.count,
      sortDate: data.sortDate,
    }))
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime()) // Sort by actual invoice dates
    .map(({ sortDate, ...rest }) => rest); // Remove sortDate from final result
}

// Helper function to calculate usage per month (difference between consecutive readings)
function aggregateUsageByMonth(invoices: PlainInvoice[]) {
  // First, sort all invoices by date to get proper chronological order
  const sortedInvoices = invoices
    .map((invoice) => ({
      ...invoice,
      dateObj: new Date(invoice.date),
    }))
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

  const monthlyData: {
    [key: string]: {
      usage22E: number;
      usage22H: number;
      count: number;
      sortDate: Date;
    };
  } = {};

  sortedInvoices.forEach((invoice, index) => {
    const monthKey = invoice.dateObj.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
    });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        usage22E: 0,
        usage22H: 0,
        count: 0,
        sortDate: new Date(
          invoice.dateObj.getFullYear(),
          invoice.dateObj.getMonth(),
          1
        ),
      };
    }

    // Calculate usage: current reading - previous reading
    let usage22E = 0;
    let usage22H = 0;

    if (index > 0) {
      // Not the first invoice, calculate difference
      const previousInvoice = sortedInvoices[index - 1];
      usage22E = invoice.meterReading22E - previousInvoice.meterReading22E;
      usage22H = invoice.meterReading22H - previousInvoice.meterReading22H;

      // Ensure positive values (in case of meter reset or data issues)
      usage22E = Math.max(0, usage22E);
      usage22H = Math.max(0, usage22H);
    }
    // For the first invoice (index === 0), usage remains 0

    monthlyData[monthKey].usage22E += usage22E;
    monthlyData[monthKey].usage22H += usage22H;
    monthlyData[monthKey].count += 1;
  });

  // Convert to array format for the chart and sort by actual date (oldest first)
  return Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      usage22E: Math.round(data.usage22E * 100) / 100,
      usage22H: Math.round(data.usage22H * 100) / 100,
      invoiceCount: data.count,
      sortDate: data.sortDate,
    }))
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime())
    .map(({ sortDate, ...rest }) => rest);
}

export default async function ChartsPage() {
  // Fetch all invoices on the server
  const invoices = await getAllInvoices();

  // Convert to plain objects (serialize the data)
  const plainInvoices = invoices.map((invoice) => ({
    date: invoice.date.toISOString(), // Convert Date to string
    charges: {
      house22E: invoice.charges.house22E,
      house22H: invoice.charges.house22H,
    },
    meterReading22E: invoice.meterReading22E,
    meterReading22H: invoice.meterReading22H,
    total: invoice.total,
  }));

  // Aggregate the data by month
  const chartData = aggregateInvoicesByMonth(plainInvoices);
  const usageData = aggregateUsageByMonth(plainInvoices);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-amber-900 mb-4">Wykres</h1>

      <Card>
        <h1 className="text-xl font-bold text-amber-900 mb-4">Koszty</h1>
        <Chart
          data={chartData}
          dataKeys={{ key1: "house22E", key2: "house22H" }}
          labels={{ label1: "22E", label2: "22H" }}
          colors={{ color1: "#2563eb", color2: "#60a5fa" }}
        />
      </Card>

      <Card>
        <h1 className="text-xl font-bold text-amber-900 mb-4">Zużycie gazu</h1>
        <Chart
          data={usageData}
          dataKeys={{ key1: "usage22E", key2: "usage22H" }}
          labels={{ label1: "22E", label2: "22H" }}
          colors={{ color1: "#10b981", color2: "#059669" }}
        />
      </Card>
    </div>
  );
}
