import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BasicButton } from '../../data-display/button/basic-button/BasicButton';

export const Footer = () => {
  return (
    <footer className="flex justify-center w-[100%] bg-on-background">
      <div className="max-w-[1440px] w-[100%] px-8 py-8">
        <div className="flex justify-between lg:items-center flex-col lg:flex-row text-surface--variant space-y-4 lg:space-x-20 lg:space-y-0">
          <div className="flex-grow">
            <div className="flex space-x-2">
              <Image src="/robotic-logo.svg" alt="Robotics Logo" width="40px" height="40px" />
              <a href="/" className="text-heading-sm text-red-400 font-logo">
                ALTRO
              </a>
            </div>
            <p className="text-surface--variant max-w-[500px] body-sm pt-6">
              &copy; 2022 All Rights Reserved
            </p>
          </div>
          <div className="flex justify-between flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-20">
            <ul className="flex mt-4 space-y-4 lg:space-x-10 lg:space-y-0 flex-col lg:flex-row lg:items-center">
              <li className="text-body-md text-grey-100 hover:text-white-500">
                <Link href="/docs">Docs</Link>
              </li>
              <li className="text-body-md text-grey-100 hover:text-white-500">
                <Link href="/citing">Citing</Link>
              </li>
              <li className="text-body-md text-grey-100 hover:text-white-500">
                <Link href="/github">Github</Link>
              </li>
              <div className="flex justify-start">
                <BasicButton label="Get Started" size="medium" />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

Footer.defaultProps = {};
