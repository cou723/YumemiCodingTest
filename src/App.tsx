import { useState } from "react";

import GraphPanel from "@/components/GraphPanel";
import Header from "@/components/Header";
import PrefectureCheckboxes from "@/components/PrefectureCheckboxes";
import { usePrefectures } from "@/hooks/usePrefectures";
import { PopulationComposition } from "@/types/populationCompositions";

function App() {
  const [populationCompositions, setPopulationCompositions] = useState<PopulationComposition[]>([]);

  const { data: prefectures, isLoading, error } = usePrefectures();

  // TODO: loading UI
  if (isLoading) return <div>loading...</div>;
  // TODO: error UI
  if (error || prefectures === undefined) return <div>error:{JSON.stringify(error)}</div>;
  return (
    <>
      <Header />
      <PrefectureCheckboxes
        prefectures={prefectures.result}
        onChange={(prefectures) => setPopulationCompositions(prefectures)}
      />
      <GraphPanel populationCompositions={populationCompositions} isLoading={isLoading} />
    </>
  );
}

export default App;
