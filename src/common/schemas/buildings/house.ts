import z from "zod";
import { makeSchemaOptional, schemaToList } from "../utils";

export const houseSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().optional(),
});
export const houseFilterSchema = makeSchemaOptional(schemaToList(houseSchema));

export type House = z.infer<typeof houseSchema>;
