import type { Meta, StoryObj } from "@storybook/react";
import { range } from "@/libs/range";

import GraphPanel from "../GraphPanel";

const meta = {
  title: "GraphPanel",
  component: GraphPanel,
} satisfies Meta<typeof GraphPanel>;

export default meta;

type Story = StoryObj<typeof GraphPanel>;

export const Empty: Story = {
  args: {
    populationCompositions: [],
  },
};

export const SingleClass: Story = {
  args: {
    populationCompositions: [
      {
        label: { prefCode: 1, prefName: "東京都" },
        data: {
          boundaryYear: 2020,
          data: [
            {
              label: "人口",
              data: [
                { year: 2020, value: 100 },
                { year: 2022, value: 101 },
                { year: 2023, value: 100 },
              ],
            },
          ],
        },
      },
    ],
  },
};

export const MultiClass: Story = {
  args: {
    populationCompositions: [
      {
        label: { prefCode: 1, prefName: "東京都" },
        data: {
          boundaryYear: 2020,
          data: [
            {
              label: "人口1",
              data: [
                { year: 2020, value: 100 },
                { year: 2022, value: 101 },
                { year: 2023, value: 100 },
              ],
            },
            {
              label: "人口2",
              data: [
                { year: 2020, value: 100 },
                { year: 2022, value: 101 },
                { year: 2023, value: 100 },
              ],
            },
          ],
        },
      },
    ],
  },
};

// データに欠損年がある
export const MultiClassWithMissingData: Story = {
  args: {
    populationCompositions: [
      {
        label: { prefCode: 1, prefName: "東京都" },
        data: {
          boundaryYear: 2020,
          data: [
            {
              label: "人口1",
              data: [
                { year: 2020, value: 100 },
                { year: 2021, value: 101 },
                { year: 2022, value: 101 },
                { year: 2023, value: 100 },
              ],
            },
            {
              label: "人口2",
              data: [
                { year: 2020, value: 100 },
                { year: 2023, value: 100 },
              ],
            },
          ],
        },
      },
    ],
  },
};

// データに欠損項目がある
export const MultiClassWithMissingClass: Story = {
  args: {
    populationCompositions: [
      {
        label: { prefCode: 1, prefName: "東京都" },
        data: {
          boundaryYear: 2020,
          data: [
            {
              label: "人口1",
              data: [
                { year: 2020, value: 100 },
                { year: 2021, value: 101 },
                { year: 2022, value: 100 },
              ],
            },
            {
              label: "人口2",
              data: [
                { year: 2020, value: 110 },
                { year: 2021, value: 111 },
                { year: 2022, value: 110 },
              ],
            },
          ],
        },
      },
      {
        label: { prefCode: 1, prefName: "京都府" },
        data: {
          boundaryYear: 2020,
          data: [
            {
              label: "人口1",
              data: [
                { year: 2020, value: 10 },
                { year: 2021, value: 11 },
                { year: 2022, value: 10 },
              ],
            },
          ],
        },
      },
    ],
  },
};
