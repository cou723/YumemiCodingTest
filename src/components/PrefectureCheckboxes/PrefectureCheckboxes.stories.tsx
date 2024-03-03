import type { StoryFn, Meta, StoryObj } from "@storybook/react";
import PrefectureCheckboxes from "../PrefectureCheckboxes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const meta = {
  title: "PrefectureCheckboxes",
  component: PrefectureCheckboxes,
  decorators: [(Story) => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>],
  argTypes: { onChange: { action: "onChange" } },
} satisfies Meta<typeof PrefectureCheckboxes>;

export default meta;

type Story = StoryObj<typeof PrefectureCheckboxes>;

export const Normal: Story = {
  args: {
    prefectures: [
      { prefCode: 1, prefName: "東京都" },
      { prefCode: 2, prefName: "神奈川県" },
    ],
    isLoading: false,
  },
};

export const Empty: Story = {
  args: {
    prefectures: [],
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    prefectures: [],
    isLoading: true,
  },
};
