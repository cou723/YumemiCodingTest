import type { Meta, StoryObj } from "@storybook/react";
import Tabs from ".";

const meta = {
  title: "Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Empty: Story = {
  args: {
    tabs: [],
    onChange: () => {},
    value: 0,
  },
};

export const Normal: Story = {
  args: {
    tabs: [
      {
        label: "tab1",
        value: 0,
      },
      {
        label: "tab2",
        value: 1,
      },
      {
        label: "tab3",
        value: 2,
      },
    ],
    onChange: () => {},
    value: 0,
  },
};
