import z from "zod";
import { pointSchema } from "../metrics/base-metrics";

export const displaySingleMetricSchema = z.object({
  name: z.string(),
  points: z.array(pointSchema),
});

export type DisplaySingleMetric = z.infer<typeof displaySingleMetricSchema>;
