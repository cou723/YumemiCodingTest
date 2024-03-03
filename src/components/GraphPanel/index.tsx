import React from "react";

import styles from "./GraphPanel.module.css";

import type { PopulationComposition } from "@/types/populationCompositions";

import Graph from "@/components/GraphPanel/Graph";
import Tabs from "@/components/GraphPanel/Tabs";
import { extractPopulationCompositionsLabel } from "@/libs/extractPopulationCompositionsLabel";

type Props = {
  populationCompositions: PopulationComposition[];
};

function extractGraphData(pc: PopulationComposition, target: string): { label: string; data: [number, number][] } {
  const targetBody = pc.data.data.find((itemizedData) => itemizedData.label === target);
  return {
    label: pc.label.prefName,
    data: targetBody?.data.map((dataPerYear) => [dataPerYear.year, dataPerYear.value]) ?? [],
  };
}

const GraphPanel: React.FC<Props> = ({ populationCompositions }) => {
  const labels = extractPopulationCompositionsLabel(populationCompositions);
  const [selectedLabel, setSelectedLabel] = React.useState(0);

  return (
    <div className={styles.box}>
      <div>
        <Tabs
          value={selectedLabel}
          onChange={(value) => setSelectedLabel(value)}
          aria-label="class label"
          tabs={labels.map((label, i) => ({ label, value: i }))}
        />
      </div>
      <Graph
        populationCompositions={
          populationCompositions.map((populationComposition) =>
            extractGraphData(populationComposition, labels[selectedLabel])
          ) ?? []
        }
      />
    </div>
  );
};

export default GraphPanel;
