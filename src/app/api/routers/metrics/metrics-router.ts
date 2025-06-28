import { createTRPCRouter } from "@/common/trpc/init";
import { cpuMetricsRouer } from "./cpu-metric-router";

export const metricsRouter = createTRPCRouter({
  cpu: cpuMetricsRouer,
});
