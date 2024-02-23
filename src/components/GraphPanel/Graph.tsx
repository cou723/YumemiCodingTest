import React from "react";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  populationCompositions: { label: string; data: [number, number][] }[];
};

const Graph: React.FC<Props> = ({ populationCompositions }) => {
  const options: Highcharts.Options = {
    chart: { type: "line", animation: false },
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
      name: populationComposition.label,
      type: "line",
      data: populationComposition.data,
    })),
  };
  return <HighchartsReact highcharts={Highcharts} options={options}></HighchartsReact>;
};

export default Graph;
