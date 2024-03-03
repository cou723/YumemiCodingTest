import type { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import type { Prefecture } from "@/types/prefecture";

export type PopulationComposition = {
  label: Prefecture;
  data: PopulationCompositionResponse["result"];
};
