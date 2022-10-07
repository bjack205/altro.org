import React from 'react';
import { SpringSpinner } from './SpringSpinner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Feedback/Spinners/SpringSpinner',
  component: SpringSpinner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <SpringSpinner {...args} />;

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
