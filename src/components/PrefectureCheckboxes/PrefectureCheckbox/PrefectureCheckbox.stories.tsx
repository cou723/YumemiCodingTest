import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PrefectureCheckbox from ".";

import type { StoryFn, Meta, StoryObj } from "@storybook/react";
const queryClient = new QueryClient();
const meta = {
  title: "PrefectureCheckbox",
  component: PrefectureCheckbox,
  decorators: [(Story) => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>],
  argTypes: { onChange: { action: "onChange" } },
} satisfies Meta<typeof PrefectureCheckbox>;

export default meta;

type Story = StoryObj<typeof PrefectureCheckbox>;

export const Normal: Story = {
  args: {
    prefecture: { prefCode: 1, prefName: "東京都" },
  },
};
