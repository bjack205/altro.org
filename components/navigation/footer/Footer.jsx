import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BasicButton } from '../../data-display/button/basic-button/BasicButton';

export const Footer = ({ docsUrl }) => {
  return (
    <footer className="flex justify-center w-[100%] bg-on-background">
      <div className="w-[100%] px-8 py-8">
        <div className="flex justify-between lg:items-center flex-col lg:flex-row text-surface--variant space-y-4 lg:space-x-20 lg:space-y-0">
          <div className="flex-grow">
            <div className="flex space-x-2">
              <Link href="https://www.ri.cmu.edu/" passHref>
                <a href="https://www.ri.cmu.edu/" target="_blank" rel="noreferrer">
                  <Image src="/robotic-logo.svg" alt="Robotics Logo" width="40px" height="40px" />
                </a>
              </Link>
              <Link href="/">
                <span className="text-heading-sm text-red-400 font-logo">ALTRO</span>
              </Link>
            </div>
            <p className="text-surface--variant max-w-[500px] body-sm pt-6">
              &copy; 2022 All Rights Reserved
            </p>
          </div>
          <div className="flex justify-between flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-20">
            <ul className="flex mt-4 space-y-4 lg:space-x-10 lg:space-y-0 flex-col lg:flex-row lg:items-center">
              <li className="text-body-md text-grey-100 hover:text-white-500">
                <Link href={docsUrl}>Docs</Link>
              </li>
              <li className="text-body-md text-grey-100 hover:text-white-500">
                <Link href="/citing">Citing</Link>
              </li>
              <li className="text-body-md text-grey-100 hover:text-white-500">
                <Link href="https://github.com/bjack205/altro" passHref>
                  <a href="https://github.com/bjack205/altro" target="_blank" rel="noreferrer">
                    Github
                  </a>
                </Link>
              </li>
              <div className="flex justify-start">
                <Link href={docsUrl}>
                  <BasicButton label="Get Started" size="medium" />
                </Link>
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
