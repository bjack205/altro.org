import Link from 'next/link';
// import fs from 'fs';
import clsx from 'clsx';
import { Header } from './navigation/header/Header';
// import { Footer } from '../../components/navigation/footer/Footer';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { DocDropdown } from './navigation/doc-dropdown/DocDropdown';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default function Document({ docs, slug, content, config, previousDoc, nextDoc }) {
  return (
    <main className="w-[100%] flex flex-col items-center">
      <Header stickyHeader={true} docs={docs} />
      <div className="w-[100%] flex justify-center relative lg:h-[calc(100vh-55px)] bg-grey-900 overflow-auto">
        <div className="hidden lg:flex max-w-[300px] flex-col items-center 2xl:items-end w-[100%] h-[100%] bg-grey-900 py-2 overflow-auto">
          <div className="w-[100%]">
            <div className="px-8">
              {/* <Image
                src="/robotic-exploration.png"
                alt="Robotic Exploration Lab"
                width="80px"
                height="80px"
              /> */}
            </div>
            <p className="my-4 text-body-lg font-semibold px-8">User Documentation</p>
            <ul className="flex flex-col space-y-0 w-[100%]">
              {docs.map((doc, i) => {
                if (!doc.children) {
                  return (
                    <li
                      key={i}
                      className={clsx(
                        'py-2 border-t-[.5px] border-grey-600 border-solid w-[100%] flex items-center',
                        {
                          ['border-b-[.5px]']: i == docs.length - 1,
                        }
                      )}
                    >
                      <Link href={'/docs/' + doc.slug}>
                        <a
                          href={'/docs/' + doc.slug}
                          className={clsx(
                            'hover:bg-hover-effect text-grey-100 w-[95%] py-1 text-[14px] px-8 hover:cursor-pointer leading-6 flex items-center rounded-r-xl',
                            {
                              ['bg-active-effect text-red-200']: doc.slug == slug,
                            }
                          )}
                        >
                          {doc.title}
                        </a>
                      </Link>
                    </li>
                  );
                } else {
                  return <DocDropdown key={i} doc={doc} length={docs.length} />;
                }
              })}
            </ul>
          </div>
        </div>
        <div className="w-[100%] lg:flex-grow flex justify-center bg-grey-700 lg:overflow-auto">
          <article className="p-8 lg:p-10  w-[100%] max-w-[930px] border-grey-900 m-4 2xl:m-8 bg-grey-800 flex flex-col justify-between rounded-sm border-[1px] border-solid">
            <div className="text-grey-50 markdown-content min-h-[calc(100vh-280px)]">
              <MathJaxContext config={config}>
                <MathJax>{content}</MathJax>
              </MathJaxContext>
            </div>
            <div className="flex justify-between">
              {previousDoc.slug !== slug ? (
                <Link href={'/docs/' + previousDoc.slug}>
                  <a
                    href={'/docs/' + previousDoc.slug}
                    className="mt-8 flex items-center hover:text-red-300"
                  >
                    <span className="text-body-lg">
                      <MdKeyboardArrowLeft />
                    </span>
                    {previousDoc.title}
                  </a>
                </Link>
              ) : (
                <div></div>
              )}
              {nextDoc.slug !== slug && (
                <Link href={'/docs/' + nextDoc.slug}>
                  <a
                    href={'/docs/' + nextDoc.slug}
                    className="mt-8 flex items-center hover:text-red-300"
                  >
                    {nextDoc.title}
                    <span className="text-body-lg">
                      <MdKeyboardArrowRight />
                    </span>
                  </a>
                </Link>
              )}
            </div>
            {/* <div className="my-8 pb-8 text-body-sm text-grey-50 flex justify-end">
              &copy; 2022 ALTRO
            </div> */}
          </article>
        </div>
      </div>
    </main>
  );
}
