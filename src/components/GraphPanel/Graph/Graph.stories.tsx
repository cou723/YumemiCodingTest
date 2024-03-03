import Graph from ".";

import type { Meta, StoryObj } from "@storybook/react";

import { range } from "@/libs/range";

const meta = {
  title: "Graph",
  component: Graph,
} satisfies Meta<typeof Graph>;

export default meta;

type Story = StoryObj<typeof Graph>;

export const Empty: Story = {
  args: {
    populationCompositions: [],
  },
};

export const SinglePrefectureSingleData: Story = {
  args: {
    populationCompositions: [
      {
        label: "東京都",
        data: [[2020, 100]],
      },
    ],
  },
};

export const SinglePrefectureMultiData: Story = {
  args: {
    populationCompositions: [
      {
        label: "東京都",
        data: [
          [2020, 100],
          [2021, 200],
          [2022, 200],
        ],
      },
    ],
  },
};

export const FewMultiPrefectureFewMultiData: Story = {
  args: {
    populationCompositions: [
      {
        label: "東京都",
        data: [
          [2020, 100],
          [2021, 200],
          [2022, 200],
        ],
      },
      {
        label: "京都府",
        data: [
          [2020, 10],
          [2021, 20],
          [2022, 20],
        ],
      },
    ],
  },
};

export const FewMultiPrefectureLotOfMultiData: Story = {
  args: {
    populationCompositions: [
      {
        label: "東京都",
        data: range(100).map((i) => [2020 + i, 100 + i] as [number, number]),
      },
      {
        label: "京都府",
        data: range(100).map((i) => [2020 + i, 10 + i] as [number, number]),
      },
    ],
  },
};

export const LotOfMultiPrefectureLotOfMultiData: Story = {
  args: {
    populationCompositions: range(100).map((i) => ({
      label: i + "県",
      data: range(100).map((j) => [2020 + j, 100 + i + j] as [number, number]),
    })),
  },
};

export const WithMissingValue: Story = {
  args: {
    populationCompositions: [
      {
        label: "東京都",
        data: [
          [2020, 100],
          [2022, 200],
          [2023, 200],
        ],
      },
      {
        label: "京都府",
        data: [
          [2021, 10],
          [2022, 20],
          [2024, 20],
        ],
      },
    ],
  },
};
