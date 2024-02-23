import { z } from "zod";

import { ResasResponseSchema } from "./resasResponse";

export const PrefecturesResponseSchema = ResasResponseSchema(
  z
    .object({
      prefCode: z.number(),
      prefName: z.string(),
    })
    .array()
);

export type PrefecturesResponse = z.infer<typeof PrefecturesResponseSchema>;
