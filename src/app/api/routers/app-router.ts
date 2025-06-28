// trpc/router.ts
import { createTRPCRouter } from "@/common/trpc/init";
import { devicesRouter } from "./devices/devices-router";
import { configRouter } from "./config/config-router";
import { mapRouter } from "./maps/map-router";
import { metricsRouter } from "./metrics/metrics-router";
import { buildingRouter } from "./buildings/building-router";


export const appRouter = createTRPCRouter({
  device: devicesRouter,
  config: configRouter,
  map: mapRouter,
  metrics: metricsRouter,
  building: buildingRouter,
});

export type AppRouter = typeof appRouter;
