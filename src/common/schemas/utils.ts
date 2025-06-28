import z from "zod";

export function makeSchemaOptional<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
): z.ZodObject<{ [K in keyof T]: z.ZodOptional<T[K]> }> {
  const shape = schema.shape;

  // [K in keyof T]: z.ZodOptional<T[K]> is a mapping type
  // that map between each key in T to its corresponding type wrapped in z.ZodOptional
  const optionalShape = {} as { [K in keyof T]: z.ZodOptional<T[K]> };

  for (const key in shape) {
    optionalShape[key] = shape[key].optional();
  }

  return z.object(optionalShape);
}

export function schemaToList<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
): z.ZodObject<{ [K in keyof T]: z.ZodArray<T[K]> }> {
  const shape = schema.shape;
  const newShape = {} as { [K in keyof T]: z.ZodArray<T[K]> };

  for (const key in shape) {
    newShape[key] = z.array(shape[key]);
  }

  return z.object(newShape);
}
