import { useQuery } from "@tanstack/react-query";

import { keys } from "@/constants/queryKeys";
import { fetchPopulationComposition } from "@/libs/fetchApi";
import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import { Prefecture } from "@/types/prefecture";

export function usePopulationComposition(prefCode: Prefecture["prefCode"]) {
  return useQuery<PopulationCompositionResponse, Error>({
    queryKey: [keys.populationComposition, keys.populationComposition + prefCode],
    queryFn: () => fetchPopulationComposition({ prefCode }),
    staleTime: 1 /* 120days */,
  });
}
