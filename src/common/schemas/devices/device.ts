import z from "zod";
import { makeSchemaOptional, schemaToList } from "../utils";

export enum DeviceType {
  PHONE = "phone",
  TV = "tv",
}

export const deviceSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(DeviceType),
  name: z.string(),
  configId: z.string(),
  nodeId: z.string(),
  roomId: z.string(),
  roomName: z.string(),
  version: z.string(),
  houseId: z.string(),
  houseName: z.string(),
});
export const deviceFilterSchema = makeSchemaOptional(schemaToList(deviceSchema));

export type Device = z.infer<typeof deviceSchema>;
