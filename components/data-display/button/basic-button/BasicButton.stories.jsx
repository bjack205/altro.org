import React from 'react';
import { BasicButton } from './BasicButton';
import { FaTrash, FaPaperPlane } from 'react-icons/fa';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Data Display/Button/BasicButton',
  component: BasicButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <BasicButton {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: 'Button',
};

export const Elevation = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Elevation.args = {
  label: 'Button',
  boxShadow: 5,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  color: 'secondary',
};

export const Outline = Template.bind({});
Outline.args = {
  label: 'Button',
  configuration: 'outline',
};

export const Round = Template.bind({});
Round.args = {
  label: 'Button',
  shape: 'round',
};

export const StartIcon = Template.bind({});
StartIcon.args = {
  startIcon: <FaTrash className="start-icon" />,
  label: 'Delete',
};

export const EndIcon = Template.bind({});
EndIcon.args = {
  endIcon: <FaPaperPlane className="end-icon" />,
  label: 'Send',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Button',
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Button',
  size: 'medium',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Button',
  disabled: true,
};
