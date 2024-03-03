"use client";
import React from "react";

import Highcharts from "highcharts";
import highChartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  highChartsAccessibility(Highcharts);
}

type Props = {
  populationCompositions: { label: string; data: [number, number][] }[];
};

const Graph: React.FC<Props> = ({ populationCompositions }) => {
  const options: Highcharts.Options = {
    chart: { type: "line", animation: false },

    title: { text: "人口構成" },

    xAxis: {
      // 重複を除去した年のリストをcategoriesに設定
      categories: Array.from(
        new Set(
          populationCompositions
            .map((populationComposition) => populationComposition.data.map(([year]) => year.toString()))
            .flat()
        )
      ),
    },
    yAxis: { title: { text: "人口数" }, min: 0 },

    series: populationCompositions.map((populationComposition) => ({
      name: populationComposition.label,
      type: "line",
      data: populationComposition.data,
    })),
  };
  return <HighchartsReact highcharts={Highcharts} options={options}></HighchartsReact>;
};

export default Graph;
