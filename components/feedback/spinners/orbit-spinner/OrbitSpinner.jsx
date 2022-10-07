import React from 'react';
import PropTypes from 'prop-types';
import styles from './orbit-spinner.module.scss';
import clsx from 'clsx';

/**
 * Fade in modal as a reusable component
 */
export const OrbitSpinner = ({ size, primary }) => {
  return (
    <div
      className={clsx(styles['orbit-spinner'], {
        ['w-[55px] h-[55px]']: size == 'large',
        ['w-[40px] h-[40px]']: size == 'medium',
        ['w-[25px] h-[25px]']: size == 'small',
      })}
    >
      <div
        className={clsx(styles.orbit, 'border-b-[3px] border-solid', {
          ['border-b-primary']: primary,
          ['border-b-outline']: !primary,
        })}
      ></div>
      <div
        className={clsx(styles.orbit, 'border-r-[3px] border-solid', {
          ['border-r-primary']: primary,
          ['border-r-outline']: !primary,
        })}
      ></div>
      <div
        className={clsx(styles.orbit, 'border-t-[3px] border-solid', {
          ['border-t-primary']: primary,
          ['border-t-outline']: !primary,
        })}
      ></div>
    </div>
  );
};

OrbitSpinner.propTypes = {
  /**
   * Size
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Primary color
   */
  primary: PropTypes.bool,
};

OrbitSpinner.defaultProps = {
  size: 'medium',
  primary: true,
};
