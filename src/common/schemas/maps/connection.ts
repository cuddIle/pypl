import z from "zod";
import { makeSchemaOptional, schemaToList } from "../utils";

export enum ConnectionState {
  ACTIVE = "active",
  INACTIVE = "inactive",
  IDLE = "idle",
  DEPRECATED = "deprecated",
}

export const connectionSchema = z.object({
  id: z.string(),
  sourceNodeId: z.string(),
  targetNodeId: z.string(),
  state: z.nativeEnum(ConnectionState),
});
export const connectionFilterSchema = makeSchemaOptional(schemaToList(connectionSchema));

export type Connection = z.infer<typeof connectionSchema>;
