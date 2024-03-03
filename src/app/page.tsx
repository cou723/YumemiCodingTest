"use client";
import GraphPanel from "@/components/GraphPanel";
import Header from "@/components/Header";
import PrefectureCheckboxes from "@/components/PrefectureCheckboxes";
import { usePrefectures } from "@/hooks/usePrefectures";
import { PopulationComposition } from "@/types/populationCompositions";
import { useState } from "react";
import toast from "react-hot-toast";

import styles from "./page.module.css";

export default function Home() {
  const [populationCompositions, setPopulationCompositions] = useState<PopulationComposition[]>([]);

  const { data: prefectures, isLoading, error } = usePrefectures();
  if (error) toast.error("県一覧の取得に失敗しました");
  return (
    <>
      <Header />
      <div className={styles.box}>
        <PrefectureCheckboxes
          isLoading={isLoading}
          prefectures={prefectures?.result}
          onChange={(prefectures) => setPopulationCompositions(prefectures)}
        />
        <GraphPanel populationCompositions={populationCompositions} />
      </div>
    </>
  );
}
