import { displaySingleMetricSchema } from "@/common/schemas/highcharts/display-metric";
import {
  CpuArchitecture,
  type CpuMetric,
  cpuMetricFilterSchema,
} from "@/common/schemas/metrics/cpu-metric";
import { createTRPCRouter, publicProcedure } from "@/common/trpc/init";
import z from "zod";

const now = new Date();

const cpuMetrics: CpuMetric[] = Array.from({ length: 100 }, (_, deviceIdx) => {
  const deviceId = (deviceIdx + 1).toString();
  const period = 5 + Math.random() * 10;
  const points = Array.from({ length: 100 }, (_, pointIdx) => ({
    time: new Date(now.getTime() - pointIdx * 30 * 1000).getTime(),
    value: 50 + 40 * Math.sin(pointIdx / period),
  })).reverse();

  return {
    deviceId,
    architecture: deviceIdx % 2 === 0 ? CpuArchitecture.ARM : CpuArchitecture.X86,
    points,
  };
});

export const cpuMetricsRouer = createTRPCRouter({
  getCpuPerDevice: publicProcedure
    .input(cpuMetricFilterSchema)
    .output(z.array(displaySingleMetricSchema))
    .query(async opts => {
      const filter = opts.input;

      return cpuMetrics
        .filter(metric => {
          const matchesDevice = !filter.deviceId || filter.deviceId.includes(metric.deviceId);
          const matchesArchitecture =
            !filter.architecture ||
            (Array.isArray(filter.architecture) &&
              filter.architecture.includes(metric.architecture));
          return matchesDevice && matchesArchitecture;
        })
        .map(metric => {
          const filterdPoints = metric.points.filter(point => {
            const startTime = typeof filter.startTime === "number" ? filter.startTime : undefined;
            const endTime = typeof filter.endTime === "number" ? filter.endTime : undefined;

            return (
              (startTime === undefined || point.time >= startTime) &&
              (endTime === undefined || point.time <= endTime)
            );
          });

          if (filterdPoints.length === 0) return;

          return {
            name: `${metric.deviceId} (${metric.architecture})`,
            points: filterdPoints,
          };
        })
        .filter(metric => metric !== undefined);
    }),
});
