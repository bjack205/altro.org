import React from 'react';
import { OrbitSpinner } from './OrbitSpinner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Feedback/Spinners/OrbitSpinner',
  component: OrbitSpinner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <OrbitSpinner {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

export const NonPrimary = Template.bind({});
NonPrimary.args = {
  primary: false,
};
