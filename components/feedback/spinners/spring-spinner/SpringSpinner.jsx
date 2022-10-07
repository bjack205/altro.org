import React from 'react';
import PropTypes from 'prop-types';
import styles from './spring-spinner.module.scss';
import clsx from 'clsx';

/**
 * Fade in modal as a reusable component
 */
export const SpringSpinner = ({ size, primary }) => {
  return (
    <div
      className={clsx(styles['spring-spinner'], styles[`spring-spinner-${size}`], {
        ['spinner-primary']: primary,
        ['spinner-outline']: !primary,
      })}
    >
      <div className={clsx(styles['spring-spinner-part'], styles.top)}>
        <div className={styles['spring-spinner-rotator']}></div>
      </div>
      <div className={clsx(styles['spring-spinner-part'], styles.bottom)}>
        <div className={styles['spring-spinner-rotator']}></div>
      </div>
    </div>
  );
};

SpringSpinner.propTypes = {
  /**
   * Size
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Primary color
   */
  primary: PropTypes.bool,
};

SpringSpinner.defaultProps = {
  size: 'medium',
  primary: true,
};
