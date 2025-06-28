import z, { string } from "zod";
import { makeSchemaOptional, schemaToList } from "../utils";

export const pointSchema = z.object({
  time: z.number(),
  value: z.number(),
});

export const singelMetricSchema = z.object({
  deviceId: string(),
  points: z.array(pointSchema),
});

export const networkMetricSchema = z.object({
  sourceDeviceId: string(),
  targetDeviceId: string(),
  points: z.array(pointSchema),
});

export const singleMetricFilterSchema = makeSchemaOptional(
  schemaToList(singelMetricSchema).omit({ points: true })
).extend({
  startTime: z.number().optional(),
  endTime: z.number().optional(),
});

export const networkMetricFilterSchema = makeSchemaOptional(
  schemaToList(networkMetricSchema.omit({ points: true })).extend({
    startTime: z.number().optional(),
    endTime: z.number().optional(),
  })
);

export type Point = z.infer<typeof pointSchema>;
export type SingelMetric = z.infer<typeof singelMetricSchema>;
export type NetworkMetric = z.infer<typeof networkMetricSchema>;
