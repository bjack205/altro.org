import React from 'react';
import PropTypes from 'prop-types';
import styles from './half-circle-spinner.module.scss';
import clsx from 'clsx';

/**
 * Fade in modal as a reusable component
 */
export const HalfCircleSpinner = ({ size, primary }) => {
  return (
    <div
      className={clsx(styles['half-circle-spinner'], {
        ['spinner-primary']: primary,
        ['spinner-outline']: !primary,
        ['w-[60px] h-[60px]']: size == 'large',
        ['w-[40px] h-[40px]']: size == 'medium',
        ['w-[25px] h-[25px]']: size == 'small',
      })}
    >
      <div
        className={clsx(styles['circle'], styles['circle-1'], {
          [styles.primary]: primary,
        })}
      ></div>
      <div
        className={clsx(styles['circle'], styles['circle-2'], {
          [styles.primary]: primary,
        })}
      ></div>
    </div>
  );
};

HalfCircleSpinner.propTypes = {
  /**
   * Size
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Primary color
   */
  primary: PropTypes.bool,
};

HalfCircleSpinner.defaultProps = {
  size: 'medium',
  primary: true,
};
