"use client";

import { ChartTooltipProps } from "@mantine/charts";
import { Paper, Text } from "@mantine/core";
import type { TooltipProps } from 'recharts';

export function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload || !label) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      {payload.map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          {item.name}: {item.value}
        </Text>
      ))}
    </Paper>
  );
}

export function ChartTooltipWrapper({ label, payload }: TooltipProps<any, any>) {
  return <ChartTooltip label={label} payload={payload} />;
}