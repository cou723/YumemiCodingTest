import React from "react";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { PopulationCompositions } from "@/types/populationCompositions";

type Props = {
  populationCompositions: PopulationCompositions;
  isLoading: boolean;
};

const Graph: React.FC<Props> = ({ populationCompositions, isLoading }) => {
  if (isLoading) return <div>loading...</div>;
  if (populationCompositions.length === 0) return <div>no data</div>;
  const options: Highcharts.Options = {
    title: {
      text: "人口構成",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      categories: populationCompositions[0].data.data[0].data.map((d) =>
        d.year.toString(),
      ),
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    series: populationCompositions.map((populationComposition) => ({
      name: populationComposition.label.prefName,
      type: "line",
      data: populationComposition.data.data.map((datum) =>
        datum.data.map((d) => ({ name: d.year, y: d.value })),
      ),
    })),
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    ></HighchartsReact>
  );
};

export default Graph;
