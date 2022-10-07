import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

export const PhoneDisplay = ({ phoneCase, phoneContent }) => {
  return (
    <div className="overflow-hidden w-[300px] flex justify-center h-[595px] rounded-3xl relative">
      <div className="rounded-3xl w-[275px] h-[590px] overflow-hidden">
        <Image
          src={phoneContent.src}
          alt={phoneContent.alt}
          width="275px"
          height="590px"
          priority={true}
          loading="eager"
        />
      </div>
      <div className="absolute z-1 top-[0] left-[0] w-[300px] h-[595px]">
        <Image
          src={phoneCase.src}
          alt={phoneCase.alt}
          width="300px"
          height="595px"
          priority={true}
          loading="eager"
        />
      </div>
    </div>
  );
};

PhoneDisplay.propTypes = {
  /**
   * Phone Case
   */
  phoneCase: PropTypes.objectOf({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  /**
   * Phone Content
   */
  phoneContent: PropTypes.objectOf({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
};

PhoneDisplay.defaultProps = {
  phoneCase: {
    src: '/phone.png',
    alt: 'phone case',
  },
  phoneContent: {
    src: 'https://imgur.com/1NAO7vU.gif',
    alt: 'playing with sword',
  },
};
