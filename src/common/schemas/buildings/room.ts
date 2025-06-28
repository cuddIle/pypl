import z from "zod";
import { makeSchemaOptional, schemaToList } from "../utils";

export const roomSchema = z.object({
  id: z.string(),
  name: z.string(),
  houseId: z.string(),
});
export const roomFilterSchema = makeSchemaOptional(schemaToList(roomSchema));

export type Room = z.infer<typeof roomSchema>;
