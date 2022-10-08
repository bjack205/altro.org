/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from 'react';
import { HamburgerMenu } from '../hamburger-menu/HamburgerMenu';
import styles from './header.module.scss';
// import { RiShoppingCartLine } from 'react-icons/ri';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Image from 'next/image';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';

export const Header = ({ links, stickyHeader, docs }) => {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  console.log('docs', docs);

  return (
    <>
      <header
        className={
          styles.header +
          ' flex justify-center w[100%] lg:px-4 ' +
          (stickyHeader ? 'sticky top-[0px]' : '')
        }
      >
        <div className="flex justify-between items-center w-[100%] max-w-[1440px] pr-4 lg:px-4 ">
          <div className="block lg:hidden w-[60px]">
            <HamburgerMenu animationType={'rotateX'} active={active} setActive={setActive} />
          </div>
          <div className="flex space-x-0 items-center">
            <div className="lg:w-[163px] h-[55px] flex justify-start items-center hover:cursor-pointer">
              <Link href="/">
                <a href="/" className="text-heading-sm text-red-400 font-logo">
                  ALTRO
                </a>
              </Link>
            </div>
            <ul className="hidden lg:flex justify-around pt-1">
              {links.map((link, i) => {
                return (
                  <li
                    key={i}
                    className={clsx('text-grey-200 mx-4 hover:text-white-500', {
                      ['text-[#FFFFFF]']: router.pathname.includes(link.label.toLowerCase()),
                      ['text-surface--variant ']: router.pathname !== link.url,
                    })}
                  >
                    {link.target ? (
                      <Link href={link.url} passHref>
                        <a href={link.url} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      </Link>
                    ) : (
                      <Link href={link.url}>{link.label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex justify-end w-[60px] lg:w-[162px]">
            <Image src="/robotic-logo.svg" alt="robotic logo" width="50px" height="40px" />
          </div>
        </div>
      </header>
      <div
        className={clsx(
          'lg:hidden w-[100%] h-[98vh] overflow-hidden bg-grey-900 fixed top-[55px] opacity-0 transition-opacity duration-500 ease-in-out py-8',
          {
            ['opacity-100']: active,
            ['z-[400]']: active,
          }
        )}
      >
        <ul className="flex flex-col space-y-4">
          <li
            className={clsx('text-grey-200 mx-5 hover:text-white-500 text-body-md', {
              ['text-[#FFFFFF]']: router.pathname == '/',
              ['text-surface--variant ']: router.pathname !== '/',
            })}
          >
            <Link href="/">Overview</Link>
          </li>
          {links.map((link, i) => {
            if (link.label === 'Docs') {
              return (
                <div key={i}>
                  <li
                    key={i}
                    className={clsx(
                      'text-grey-200 mx-5 text-body-md flex items-start space-x-2 hover:cursor-pointer',
                      {
                        ['text-[#FFFFFF]']: router.pathname.includes(link.label.toLowerCase()),
                        ['text-surface--variant ']: router.pathname !== link.url,
                      }
                    )}
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <span>Docs</span>
                    {dropdown ? (
                      <div className="text-body-lg">
                        <MdOutlineArrowDropUp />
                      </div>
                    ) : (
                      <div className="text-body-lg">
                        <MdOutlineArrowDropDown />
                      </div>
                    )}
                  </li>
                  {dropdown && (
                    <ul className="text-grey-100 mx-5 hover:text-white-500 text-body-md bg-grey-800 p-6">
                      {docs.map((doc, i) => {
                        return (
                          <>
                            <li
                              key={i}
                              className={clsx(
                                'text-grey-200 hover:text-white-500 text-body-md mb-3',
                                {}
                              )}
                              onClick={() => setActive(false)}
                            >
                              <Link href={'/docs/' + doc.slug}>{doc.title}</Link>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            } else {
              return (
                <li
                  key={i}
                  className={clsx('text-grey-200 mx-5 hover:text-white-500 text-body-md', {
                    ['text-[#FFFFFF]']: router.pathname.includes(link.label.toLowerCase()),
                    ['text-surface--variant ']: router.pathname !== link.url,
                  })}
                >
                  {link.target ? (
                    <Link href={link.url} passHref>
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    </Link>
                  ) : (
                    <Link href={link.url}>{link.label}</Link>
                  )}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </>
  );
};

Header.propTypes = {
  /**
   * Sticky header
   */
  stickyHeader: PropTypes.bool,
  /**
   * Logo URL string
   */
  logoUrl: PropTypes.string,
  /**
   * Logo URL string
   */
  docs: PropTypes.array,
  /**
   * Navigation bar links
   */
  links: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  stickyHeader: true,
  logoUrl: '/logo.png',
  links: [
    {
      label: 'Docs',
      url: '/docs/solver',
    },
    {
      label: 'Citing',
      url: '/citing',
    },
    {
      label: 'Github',
      url: 'https://github.com/bjack205/altro-cpp',
      target: '_blank',
    },
  ],
  docs: [],
};