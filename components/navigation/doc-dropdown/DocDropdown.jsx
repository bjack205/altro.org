import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export const DocDropdown = ({ doc, index, length }) => {
  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    for (let child of doc.children) {
      if (router.asPath == '/docs/' + child.slug) {
        setDropdown(true);
        break;
      }
    }
  }, [router.asPath, doc.children]);

  return (
    <div
      className={clsx('w-[100%] select-none border-t-[.5px] border-grey-600 border-solid', {
        ['border-b-[.5px]']: index == length - 1,
      })}
    >
      <li
        className={clsx(
          'flex items-center justify-between text-[14px] px-8 py-3 text-grey-200 hover:cursor-pointer'
        )}
        onClick={() => setDropdown(!dropdown)}
      >
        {doc.title}
        <span className="text-[1.5rem]">
          {dropdown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </span>
      </li>
      {dropdown && (
        <ul className="w-[95%] flex flex-col mt-[-8px] pb-2 space-y-2">
          {doc.children.map((child, j) => {
            return (
              <li key={j} className="">
                <Link href={'/docs/' + child.slug}>
                  <a
                    href={'/docs/' + child.slug}
                    className={clsx(
                      'hover:bg-hover-effect text-grey-100 py-1 text-[14px] px-8 pl-16 hover:cursor-pointer leading-6 flex items-center rounded-r-xl',
                      {
                        ['bg-active-effect text-red-200']: router.asPath == '/docs/' + child.slug,
                      }
                    )}
                  >
                    {child.title}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

DocDropdown.propTypes = {};

DocDropdown.defaultProps = {};
