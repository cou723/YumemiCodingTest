import { useQuery } from "@tanstack/react-query";

import { keys } from "@/constants/queryKeys";
import { fetchPopulationComposition } from "@/libs/fetchResas";
import { Prefecture } from "@/types/prefecture";

export function usePopulationComposition(prefCode: Prefecture["prefCode"]) {
  // TODO: useQueryの型引数を指定する
  return useQuery({
    queryKey: [keys.populationComposition, prefCode],
    queryFn: () => fetchPopulationComposition({ prefCode }),
    staleTime: 1000 * 60 * 60 * 24 * 120 /* 120days */,
  });
}
