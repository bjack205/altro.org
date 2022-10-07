import React from 'react';
import { BasicButton } from '../../../data-display/button/basic-button/BasicButton';
import { Dialog } from './Dialog';
import { IoAlertCircleOutline } from 'react-icons/io5';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Feedback/Dialogs/Dialog',
  component: Dialog,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Dialog {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const Left = Template.bind({});
Left.args = {
  position: 'left',
};

export const ImportantText = Template.bind({});
ImportantText.args = {
  importantText: 'IMPORTANT',
  modalSubtitle: 'You have not the permission to read or modify this file.',
  position: 'left',
};

export const Subtitle = Template.bind({});
Subtitle.args = {
  modalSubtitle: 'You have not the permission to read or modify this file.',
  position: 'left',
};

export const SingleButton = Template.bind({});
SingleButton.args = {
  rejectButton: null,
};

export const ButtonFlexColumn = Template.bind({});
ButtonFlexColumn.args = {
  confirmButton: (
    <BasicButton label="Confirm" shape="square" size="medium" primary={true} stretch={true} />
  ),
  rejectButton: (
    <BasicButton
      label="Cancel"
      shape="square"
      configuration={'outline'}
      size="medium"
      stretch={true}
      primary={false}
    />
  ),
  buttonFlex: 'column',
};

export const Image = Template.bind({});
Image.args = {
  modalImage: '/demo-carousel/controller-1.png',
};

export const Icon = Template.bind({});
Icon.args = {
  modalIcon: <IoAlertCircleOutline />,
  position: 'left',
  importantText: 'IMPORTANT',
};
