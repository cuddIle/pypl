import z from "zod";
import { makeSchemaOptional, schemaToList } from "../utils";

export const configSchema = z.object({
  id: z.string(),
  data: z.string(),
});
export const configFilterSchema = makeSchemaOptional(
  schemaToList(configSchema.omit({ data: true }))
);

export type Config = z.infer<typeof configSchema>;
