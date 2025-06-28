import z from "zod";
import { singelMetricSchema, singleMetricFilterSchema } from "./base-metrics";

export enum CpuArchitecture {
  X86 = "x86",
  ARM = "arm",
}

export const cpuMetricSchema = singelMetricSchema.extend({
  architecture: z.nativeEnum(CpuArchitecture),
});
export const cpuMetricFilterSchema = singleMetricFilterSchema.extend({
  architecture: z.array(z.nativeEnum(CpuArchitecture)).optional(),
});

export type CpuMetric = z.infer<typeof cpuMetricSchema>;
