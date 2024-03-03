import { useQuery } from "@tanstack/react-query";

import type { PrefecturesResponse } from "@/types/prefecturesResponse";

import { keys } from "@/constants/queryKeys";
import { fetchPrefectures } from "@/libs/fetchApi";

export function usePrefectures() {
  return useQuery<PrefecturesResponse, Error>({
    queryKey: [keys.prefectures],
    queryFn: fetchPrefectures,
    staleTime: 1000 * 60 * 60 * 24 * 120 /* 120days */,
  });
}
