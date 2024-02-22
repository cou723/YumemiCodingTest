import { z } from "zod";

import { ResasResponseSchema } from "./resasResponse";

export const PopulationCompositionResponseSchema = ResasResponseSchema(
  z.object({
    boundaryYear: z.number(),
    data: z
      .object({
        label: z.string(),
        data: z
          .object({
            year: z.number(),
            value: z.number(),
          })
          .array(),
      })
      .array(),
  }),
);

export type PopulationCompositionResponse = z.infer<
  typeof PopulationCompositionResponseSchema
>;
