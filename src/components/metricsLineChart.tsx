"use client";

import { Point, pointsToDisplayPoints, pointsToUinqueIdentifiers } from '@/common/types';
import { ChartTooltipWrapper }  from '@/components/chartToolTip';
import { LineChart } from '@mantine/charts';



export default function MetricsLineChart({ points }: { points: Point[] }) {
    const colorPalette = [
        "#FF5733", // Vibrant orange
        "#33FF57", // Bright green
        "#3357FF", // Bright blue
        "#FF33A1", // Pink
        "#FFD700", // Gold
        "#33FFF5", // Cyan
        "#FF8C00", // Dark orange
        "#ADFF2F", // Green-yellow
        "#FF4500", // Red-orange
        "#1E90FF", // Dodger blue
    ];

    return <>
        <LineChart
          h={300}
          data={pointsToDisplayPoints(points)}
          dataKey="date"
          tooltipProps={{
            content: ChartTooltipWrapper
          }}
          series={
            pointsToUinqueIdentifiers(points).map((uinqueIdentifier: string, index: number) => ({
              name: uinqueIdentifier,
              color: colorPalette[index % colorPalette.length],
            }))
          }
          curveType="linear"
        />
      </>
}
