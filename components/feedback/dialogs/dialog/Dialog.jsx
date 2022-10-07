import React from 'react';
import PropTypes from 'prop-types';
import { BasicButton } from '../../../data-display/button/basic-button/BasicButton';
import clsx from 'clsx';

/**
 * Fade in modal as a reusable component
 */
export const Dialog = ({
  rejectButton,
  modalIcon,
  modalImage,
  confirmButton,
  modalTitle,
  importantText,
  modalSubtitle,
  modalContent,
  boxShadow,
  position,
  buttonFlex,
  stateChecked,
  setStateChecked,
}) => {
  return (
    <>
      <input
        type="checkbox"
        checked={stateChecked}
        readOnly
        name="dialog-state"
        id="dialog-state"
        className="hidden invisible opacity-0"
      />
      <div
        className={clsx(
          'fixed z-[9999] top-0 left-0 w-[100vw] h-[100vh] text-center bg-dialog-background',
          {
            ['opacity-1 visible']: stateChecked,
            ['opacity-0 invisible']: !stateChecked,
          }
        )}
      >
        <label
          className="absolute top-0 left-0 w-[100vw] h-[100vh] cursor-pointer"
          htmlFor="dialog-state"
          onClick={() => setStateChecked(!stateChecked)}
        ></label>
        <div
          className={`relative z-[1] block box-border mx-auto my-0 top-[50%] translate-y-[-50%] w-[100%] max-w-[320px] p-[16px] rounded-lg bg-[#fff] overflow-hidden box-shadow--${boxShadow}`}
        >
          <label
            className="absolute top-0 right-0 w-[2rem] h-[2rem] leading-6 text-center cursor-pointer"
            htmlFor="dialog-state"
          ></label>
          {modalIcon && (
            <div
              className={clsx('text-[40px] text-primary flex w-[100%] mb-3', {
                ['justify-start']: position == 'left',
                ['justify-center']: position == 'center',
              })}
            >
              {modalIcon}
            </div>
          )}
          {modalImage && (
            <div className="rounded-md max-h-[170px] overflow-hidden flex justify-center items-center mb-3">
              <img src={modalImage} alt="modal picture" />
            </div>
          )}
          <h2
            className={clsx('text-[18px] font-semibold', {
              ['text-left']: position == 'left',
              ['text-center']: position == 'center',
            })}
          >
            {modalTitle}
          </h2>
          {importantText && (
            <p
              className={clsx('text-body-sm text-primary font-bold mt-2', {
                ['text-left']: position == 'left',
                ['text-center']: position == 'center',
              })}
            >
              {importantText}
            </p>
          )}
          {modalSubtitle && (
            <p
              className={clsx('text-body-md font-semibold mt-2', {
                ['text-left']: position == 'left',
                ['text-center']: position == 'center',
              })}
            >
              {modalSubtitle}
            </p>
          )}
          <div
            className={clsx('text-body-md mt-2 mb-6 text-outline', {
              ['text-left']: position == 'left',
              ['text-center']: position == 'center',
            })}
          >
            {modalContent}
          </div>
          <div
            className={clsx('flex items-center justify-center mt-[20px] w-[100%]', {
              ['flex-row space-x-4']: buttonFlex == 'row',
              ['flex-col space-y-3']: buttonFlex == 'column',
            })}
          >
            {rejectButton && (
              <span onClick={() => setStateChecked(!stateChecked)} className="flex-grow w-[100%]">
                {rejectButton}
              </span>
            )}
            {confirmButton && (
              <span onClick={() => setStateChecked(!stateChecked)} className="flex-grow w-[100%]">
                {confirmButton}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* <label htmlFor="dialog-state" onClick={() => setStateChecked(!stateChecked)}>
        {triggerButton}
      </label> */}
      <div className="absolute bottom-0 left-0 w-[100%] h-[100px] box-border bg-background text-on-background text-left p-[2px] overflow-y-scroll hidden"></div>
    </>
  );
};

Dialog.propTypes = {
  /**
   * Button that triggers modal
   */
  triggerButton: PropTypes.element,
  /**
   * Button that rejects modal
   */
  rejectButton: PropTypes.element,
  /**
   * Modal Image
   */
  modalImage: PropTypes.string,
  /**
   * Modal Icon
   */
  modalIcon: PropTypes.element,
  /**
   * Button that confirms modal
   */
  confirmButton: PropTypes.element,
  /**
   * Title for modal
   */
  modalTitle: PropTypes.string,
  /**
   * Important text
   */
  importantText: PropTypes.string,
  /**
   * subTitle for modal
   */
  modalSubtitle: PropTypes.string,
  /**
   * Content inside of modal
   */
  modalContent: PropTypes.string,
  /**
   * Box shadow
   */
  boxShadow: PropTypes.number,
  /**
   * Text position
   */
  position: PropTypes.oneOf(['center', 'left']),
  /**
   * Button Flex
   */
  buttonFlex: PropTypes.oneOf(['row', 'column']),
  /**
   * Dialog State
   */
  stateChecked: PropTypes.bool,
};

Dialog.defaultProps = {
  triggerButton: <BasicButton label="Open the dialog" />,
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
  confirmButton: (
    <BasicButton label="Confirm" shape="square" size="medium" primary={true} stretch={true} />
  ),
  buttonText: 'Open the dialog',
  buttonPrimary: 'primary',
  buttonSize: 'large',
  buttonShape: 'square',
  modalTitle: 'File Shared',
  modalContent: 'All team members will be able to read, write and share this file.',
  boxShadow: 4,
  position: 'center',
  buttonFlex: 'row',
  stateChecked: true,
};
