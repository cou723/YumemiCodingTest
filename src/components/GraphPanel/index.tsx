import React from "react";

import { Box, Tab, Tabs } from "@mui/material";

import Graph from "@/components/GraphPanel/Graph";
import {
  PopulationComposition,
  extractPopulationCompositionsLabel,
} from "@/types/populationCompositions";

type Props = {
  populationCompositions: PopulationComposition[];
  isLoading: boolean;
};

function extractGraphData(
  pc: PopulationComposition,
  target: string,
): { label: string; data: [number, number][] } {
  const targetBody = pc.data.data.find(
    (itemizedData) => itemizedData.label === target,
  );
  return {
    label: pc.label.prefName,
    data:
      targetBody?.data.map((dataPerYear) => [
        dataPerYear.year,
        dataPerYear.value,
      ]) ?? [],
  };
}

const GraphPanel: React.FC<Props> = ({ populationCompositions, isLoading }) => {
  const labels = extractPopulationCompositionsLabel(populationCompositions);
  const [selectedLabel, setSelectedLabel] = React.useState(0);

  // TODO: loading
  if (isLoading) return <div>loading...</div>;

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedLabel}
          onChange={(_e, value) => {
            if (typeof value != "number")
              throw new Error(
                "[GraphPanel] value is not number. this should not happen.",
              );
            setSelectedLabel(value);
          }}
          aria-label="basic tabs example"
        >
          {labels.map((label, i) => (
            <Tab label={label} value={i} key={i} />
          ))}
        </Tabs>
      </Box>
      <Graph
        populationCompositions={
          populationCompositions.map((populationComposition) =>
            extractGraphData(populationComposition, labels[selectedLabel]),
          ) ?? []
        }
      />
    </Box>
  );
};

export default GraphPanel;
