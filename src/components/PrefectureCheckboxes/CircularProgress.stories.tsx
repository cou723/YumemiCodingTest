import { QueryClient } from "@tanstack/react-query";

import CircularProgress from "./CircularProgress";

import type { Meta, StoryObj } from "@storybook/react";
const meta = {
  title: "CircularProgress",
  component: CircularProgress,
} satisfies Meta<typeof CircularProgress>;

export default meta;

type Story = StoryObj<typeof CircularProgress>;

export const Normal: Story = {};
