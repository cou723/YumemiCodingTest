import { useQuery } from "@tanstack/react-query";

import { keys } from "@/constants/queryKeys";
import { fetchPopulationComposition } from "@/libs/fetchResas";
import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import { Prefecture } from "@/types/prefecture";

export function usePopulationComposition(prefCode: Prefecture["prefCode"]) {
  return useQuery<PopulationCompositionResponse, Error>({
    queryKey: [keys.populationComposition, prefCode],
    queryFn: () => fetchPopulationComposition({ prefCode }),
    staleTime: 1000 * 60 * 60 * 24 * 120 /* 120days */,
  });
}
