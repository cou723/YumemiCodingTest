import { Prefecture } from "@/types/prefecture";

export type ResasPopulationCompositionOptions = {
  type: "populationComposition";
  url: "population/composition/perYear";
  method: "GET";
  params: {
    prefCode: Prefecture["prefCode"];
    cityCode?: string;
    addArea?: { prefCode: number; cityCode: string }[];
  };
};
