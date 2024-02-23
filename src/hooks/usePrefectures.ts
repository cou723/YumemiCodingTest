import { useQuery } from "@tanstack/react-query";

import { keys } from "@/constants/queryKeys";
import { fetchPrefectures } from "@/libs/fetchResas";
import { PrefecturesResponse } from "@/types/prefecturesResponse";

export function usePrefectures() {
  return useQuery<PrefecturesResponse, Error>({
    queryKey: [keys.prefectures],
    queryFn: fetchPrefectures,
    staleTime: 1000 * 60 * 60 * 24 * 120 /* 120days */,
  });
}
