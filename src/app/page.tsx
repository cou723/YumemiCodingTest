"use client";
import GraphPanel from "@/components/GraphPanel";
import Header from "@/components/Header";
import PrefectureCheckboxes from "@/components/PrefectureCheckboxes";
import { usePrefectures } from "@/hooks/usePrefectures";
import { PopulationComposition } from "@/types/populationCompositions";
import { Box } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [populationCompositions, setPopulationCompositions] = useState<PopulationComposition[]>([]);

  const { data: prefectures, isLoading, error } = usePrefectures();
  if (error) toast.error("県一覧の取得に失敗しました");
  return (
    <>
      <Header />
      <Box sx={{ padding: "32px" }}>
        <PrefectureCheckboxes
          isLoading={isLoading}
          prefectures={prefectures?.result}
          onChange={(prefectures) => setPopulationCompositions(prefectures)}
        />
        <GraphPanel populationCompositions={populationCompositions} />
      </Box>
    </>
  );
}