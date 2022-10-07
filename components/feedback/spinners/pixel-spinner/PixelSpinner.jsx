import React from 'react';
import PropTypes from 'prop-types';
import styles from './pixel-spinner.module.scss';
import clsx from 'clsx';

/**
 * Fade in modal as a reusable component
 */
export const PixelSpinner = ({ size, primary }) => {
  return (
    <div className={clsx(styles['pixel-spinner'], styles[`spinner-${size}`])}>
      <div
        className={clsx(styles['pixel-spinner-inner'], {
          ['bg-primary text-primary']: primary,
          ['bg-outline text-outline']: !primary,
        })}
      ></div>
    </div>
  );
};

PixelSpinner.propTypes = {
  /**
   * Size
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Primary color
   */
  primary: PropTypes.bool,
};

PixelSpinner.defaultProps = {
  size: 'medium',
  primary: true,
};
