import { useQuery } from "@tanstack/react-query";

import type { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import type { Prefecture } from "@/types/prefecture";

import { keys } from "@/constants/queryKeys";
import { fetchPopulationComposition } from "@/libs/fetchApi";

export function usePopulationComposition(prefCode: Prefecture["prefCode"]) {
  return useQuery<PopulationCompositionResponse, Error>({
    queryKey: [keys.populationComposition, prefCode],
    queryFn: () => fetchPopulationComposition({ prefCode }),
    staleTime: 1000 * 60 * 60 * 24 * 120 /* 120days */,
  });
}
