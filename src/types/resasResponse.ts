import { z } from "zod";

export function ResasResponseSchema<T extends z.ZodTypeAny>(resultSchema: T) {
  return z.object({
    message: z.any(),
    result: resultSchema,
  });
}
