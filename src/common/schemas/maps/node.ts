import z from "zod";
import { makeSchemaOptional, schemaToList } from "../utils";

export const deviceNodeSchema = z.object({
  id: z.string(),
  deviceId: z.string(),
  x: z.number(),
  y: z.number(),
});
export const deviceNodeFilterSchema = makeSchemaOptional(
  schemaToList(deviceNodeSchema.omit({ x: true, y: true }))
);

export type DeviceNode = z.infer<typeof deviceNodeSchema>;
