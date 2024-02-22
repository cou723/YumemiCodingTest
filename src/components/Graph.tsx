import React from "react";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { PopulationComposition } from "@/types/populationCompositions";

type Props = {
  populationCompositions: PopulationComposition[];
  isLoading: boolean;
};

function extractPopulationComposition(pc: PopulationComposition) {
  // return pc.data.data.map((itemizedData /*総人口や年少人口ごとにわけられたデータ */) => {
  //   return itemizedData.data.map((dataPerYear) => ({ name: dataPerYear.year, y: 10 }));
  // });
  return pc.data.data[0].data.map((dataPerYear) => [
    dataPerYear.year,
    dataPerYear.value,
  ]);
}

const Graph: React.FC<Props> = ({ populationCompositions, isLoading }) => {
  if (isLoading) return <div>loading...</div>;
  if (populationCompositions.length === 0) return <div>no data</div>;
  const options: Highcharts.Options = {
    chart: { type: "line" },
    title: {
      text: "人口構成",
    },
    xAxis: {
      title: {
        text: "年度",
      },
    },
    yAxis: {
      title: {
        text: "人口数",
      },
      min: 0,
    },
    series: populationCompositions.map((populationComposition) => ({
      name: populationComposition.label.prefName,
      type: "line",
      data: extractPopulationComposition(populationComposition),
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
