import { StoryFn, Meta } from "@storybook/react";

import Graph from "./Graph";

export default {
  title: "Components/Graph",
  component: Graph,
} as Meta;

const Template: StoryFn = (args) => <Graph {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add props here
};
