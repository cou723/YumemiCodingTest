"use client";
import { useState } from "react";

import toast from "react-hot-toast";

import styles from "./page.module.css";

import type { PopulationComposition } from "@/types/populationCompositions";

import GraphPanel from "@/components/GraphPanel";
import Header from "@/components/Header";
import PrefectureCheckboxes from "@/components/PrefectureCheckboxes";
import { usePrefectures } from "@/hooks/usePrefectures";

export default function Home() {
  const [populationCompositions, setPopulationCompositions] = useState<PopulationComposition[]>([]);

  const { data: prefectures, isLoading, error } = usePrefectures();
  if (error) toast.error("県一覧の取得に失敗しました");
  return (
    <>
      <Header />
      <main className={styles.box}>
        <PrefectureCheckboxes
          isLoading={isLoading}
          prefectures={prefectures?.result}
          onChange={(prefectures) => setPopulationCompositions(prefectures)}
        />
        <GraphPanel populationCompositions={populationCompositions} />
      </main>
    </>
  );
}
