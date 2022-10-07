import React from 'react';
import PropTypes from 'prop-types';
import styles from './basic-button.module.scss';
import clsx from 'clsx';

/**
 * Primary button component with sizes and color
 */
export const BasicButton = ({
  color,
  size,
  label,
  shape,
  disabled,
  startIcon,
  endIcon,
  boxShadow,
  configuration,
  onClick,
  stretch,
  ...props
}) => {
  return (
    <button
      type="button"
      className={clsx(
        styles['sb-basic-button'],
        styles[`sb-basic-button--${size}`],
        styles[`sb-basic-button--${shape}`],
        styles[`sb-basic-button--${configuration}`],
        styles[`sb-basic-button--${color}`],
        {
          [styles['sb-basic-button--disabled']]: disabled,
          [`box-shadow--${boxShadow}`]: configuration === 'filled',
          ['w-[100%]']: stretch,
        }
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {label}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

BasicButton.propTypes = {
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Configuration of button
   */
  configuration: PropTypes.oneOf(['filled', 'outline']),
  /**
   * How large should the button be?
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'primary-container']),
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Optional button shape
   */
  shape: PropTypes.oneOf(['round', 'square']),
  /**
   * Optional button disable
   */
  disabled: PropTypes.bool,
  /**
   * Stretch
   */
  stretch: PropTypes.bool,
  /**
   * Start Icon
   */
  startIcon: PropTypes.element,
  /**
   * End Icon
   */
  endIcon: PropTypes.element,
  /**
   * Optional to add box shadow to button
   */
  boxShadow: PropTypes.number,
};

BasicButton.defaultProps = {
  color: 'primary',
  configuration: 'filled',
  size: 'large',
  onClick: undefined,
  shape: 'square',
  boxShadow: 0,
  disabled: false,
  startIcon: null,
  endIcon: null,
  stretch: false,
};
