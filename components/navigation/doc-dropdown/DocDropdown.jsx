import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export const DocDropdown = ({ doc }) => {
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
    <div className="w-[100%] select-none">
      <li
        className={clsx('flex items-center px-8 py-2 text-grey-200 hover:cursor-pointer', {
          ['bg-grey-800 text-white-500']: dropdown,
        })}
        onClick={() => setDropdown(!dropdown)}
      >
        {doc.title}
      </li>
      {dropdown && <hr className="border-none h-[0.5px] bg-grey-500 text-grey-500" />}
      {dropdown && (
        <ul className="bg-grey-800 w-[100%] flex flex-col rounded-sm">
          {doc.children.map((child, j) => {
            return (
              <li key={j} className="">
                <Link href={'/docs/' + child.slug}>
                  <a
                    href={'/docs/' + child.slug}
                    className={clsx(
                      'hover:text-red-200 text-grey-100 text-[14px] px-8 py-4 hover:cursor-pointer leading-6 h-[40px] flex items-center',
                      {
                        ['text-red-200']: router.asPath == '/docs/' + child.slug,
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
