"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartData = {
  month: string;
  [key: string]: any; // Allow any data keys for flexibility
};

type ChartProps = {
  data: ChartData[];
  dataKeys: {
    key1: string;
    key2: string;
  };
  labels: {
    label1: string;
    label2: string;
  };
  colors: {
    color1: string;
    color2: string;
  };
};

// Dynamic chart config will be created in the component

export function Chart({ data, dataKeys, labels, colors }: ChartProps) {
  // Create dynamic chart config based on props
  const chartConfig = {
    [dataKeys.key1]: {
      label: labels.label1,
      color: colors.color1,
    },
    [dataKeys.key2]: {
      label: labels.label2,
      color: colors.color2,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.substring(0, 3)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent className="bg-amber-50/90 border border-amber-100/60 shadow-md" />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey={dataKeys.key1}
          fill={`var(--color-${dataKeys.key1})`}
          radius={4}
        />
        <Bar
          dataKey={dataKeys.key2}
          fill={`var(--color-${dataKeys.key2})`}
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
