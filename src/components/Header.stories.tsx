import Header from "./Header";

import type { Meta, StoryObj } from "@storybook/react";
const meta = {
  title: "Header",
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Normal: Story = {};
