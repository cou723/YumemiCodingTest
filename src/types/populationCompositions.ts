import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import { Prefecture } from "@/types/prefecture";

export type PopulationCompositions = {
  label: Prefecture;
  data: PopulationCompositionResponse["result"];
}[];
