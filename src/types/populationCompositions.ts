import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import { Prefecture } from "@/types/prefecture";

export type PopulationComposition = {
  label: Prefecture;
  data: PopulationCompositionResponse["result"];
};
