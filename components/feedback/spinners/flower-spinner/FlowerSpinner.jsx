import React from 'react';
import PropTypes from 'prop-types';
import styles from './flower-spinner.module.scss';
import clsx from 'clsx';

export const FlowerSpinner = ({ size, primary }) => {
  return (
    <div className={clsx(styles['flower-spinner'], styles[`spinner-${size}`])}>
      <div className={styles['dots-container']}>
        <div
          className={clsx(styles['bigger-dot'], {
            [styles['spinner-primary']]: primary,
          })}
        >
          <div
            className={clsx(styles['smaller-dot'], {
              [styles['spinner-primary']]: primary,
            })}
          ></div>
        </div>
      </div>
    </div>
  );
};

FlowerSpinner.propTypes = {
  /**
   * Size
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Primary color
   */
  primary: PropTypes.bool,
};

FlowerSpinner.defaultProps = {
  size: 'medium',
  primary: true,
};
