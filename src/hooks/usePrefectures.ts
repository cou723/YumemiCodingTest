import { useQuery } from "@tanstack/react-query";

import { keys } from "@/constants/queryKeys";
import { fetchPrefectures } from "@/libs/fetchResas";

export function usePrefectures() {
  // TODO: useQueryの型引数を指定する
  return useQuery({
    queryKey: [keys.prefectures],
    queryFn: fetchPrefectures,
    staleTime: 1000 * 60 * 60 * 24 * 120 /* 120days */,
  });
}
