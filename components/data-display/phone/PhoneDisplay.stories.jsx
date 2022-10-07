import React from 'react';

import { PhoneDisplay } from './PhoneDisplay';

export default {
  title: 'Components/Data Display/Phone/Phone Display',
  component: PhoneDisplay,
  argTypes: {},
};

const Template = (args) => <PhoneDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  phoneCase: {
    src: '/phone.png',
    alt: 'phone case',
  },
  phoneContent: {
    src: 'https://imgur.com/1NAO7vU.gif',
    alt: 'playing with sword',
  },
};
