import { useState } from "react";

import Graph from "@/components/Graph";
import Header from "@/components/Header";
import PrefectureCheckboxes from "@/components/PrefectureCheckboxes";
import { usePrefectures } from "@/hooks/usePrefectures";
import { PopulationCompositions } from "@/types/populationCompositions";

function App() {
  const [populationCompositions, setPopulationCompositions] =
    useState<PopulationCompositions>([]);

  const { data: prefectures, isLoading, error } = usePrefectures();

  if (isLoading) return <div>loading...</div>;
  if (error || prefectures === undefined)
    return <div>error:{JSON.stringify(error)}</div>;
  return (
    <>
      <Header />
      <PrefectureCheckboxes
        prefectures={prefectures.result}
        onChange={(prefectures) => setPopulationCompositions(prefectures)}
      />
      <Graph
        populationCompositions={populationCompositions}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
