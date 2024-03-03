import CircularProgress from ".";

import type { Meta, StoryObj } from "@storybook/react";
const meta = {
  title: "CircularProgress",
  component: CircularProgress,
} satisfies Meta<typeof CircularProgress>;

export default meta;

type Story = StoryObj<typeof CircularProgress>;

export const Normal: Story = {};
