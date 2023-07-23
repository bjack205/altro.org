import Link from 'next/link';
import clsx from 'clsx';
import { Header } from './navigation/header/Header';
import { DocDropdown } from './navigation/doc-dropdown/DocDropdown';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.css';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import RemarkMathPlugin from 'remark-math';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import xonokai from '../node_modules/react-syntax-highlighter/src/styles/prism/xonokai';
import vs from '../node_modules/react-syntax-highlighter/src/styles/prism/vs';

export default function Document({ docs, slug, content, previousDoc, nextDoc }) {
  const [query, setQuery] = useState('');
  // const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const [theme, setTheme] = useState('light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const searchRef = useRef(null);

  const copyToClipboard = (id) => {
    const url = window.location.href.split('#')[0] + '#' + id;
    navigator.clipboard.writeText(url);
    toast('Copied to clipboard');
  };

  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onSearchChange = (event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  };

  // const onClick = (event) => {
  //   if (searchRef.current && !searchRef.current.contains(event.target)) {
  //     setActive(false);
  //     window.removeEventListener('click', onClick);
  //   }
  // };

  // const onFocus = () => {
  //   setActive(true);
  //   window.addEventListener('click', onClick);
  // };

  useEffect(() => {
    setQuery('');
    localStorage.getItem('theme') ? setTheme(localStorage.getItem('theme')) : setTheme('light');
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (let header of headers) {
      let id = header.innerText.replaceAll(' ', '-').toLowerCase();
      header.setAttribute('id', id);
      header.classList.add('flex', 'items-center');
      if (header.childNodes.length < 2) {
        const link = document.createElement('span');
        link.classList.add('hidden', 'mx-4', 'hover:cursor-pointer');
        link.innerHTML = `<img src="/bs-link.svg" alt="link" />`;
        header.appendChild(link);
        header.addEventListener('mouseover', () => {
          link.classList.remove('hidden');
        });
        header.addEventListener('mouseleave', () => {
          link.classList.add('hidden');
        });
        link.addEventListener('click', () => copyToClipboard(header.id));
      }
    }
  }, [content, theme]);

  return (
    <main className="w-[100%] flex flex-col items-center" data-theme={theme}>
      <Header stickyHeader={true} docs={docs} />
      <div className="w-[100%] flex min-h-[calc(100vh-55px)] relative bg-doc-grey-900 text-doc-grey-200">
        <div className="relative hidden lg:block max-w-[300px] w-[100%] bg-doc-grey-900 py-2">
          <div className="w-[100%] sticky top-[65px] left-0 overflow-auto">
            <p className="font-logo px-5 mt-2">User Documentation</p>
            <div className="mb-6 mt-4 mx-4 pl-4 pr-3 flex items-center bg-grey-700 box-shadow--4 rounded-lg text-grey-100">
              <AiOutlineSearch />
              <input
                type="search"
                className="w-[100%] pl-3 h-[35px] flex items-center text-[14px] bg-transparent leading-6 text-grey-100 placeholder:text-grey-100"
                onChange={onSearchChange}
                placeholder="Search docs"
                value={query}
                ref={searchRef}
              />
            </div>
            <ul className="flex flex-col space-y-0 w-[100%]">
              {docs.map((doc, i) => {
                if (!doc.children) {
                  return (
                    <li
                      key={i}
                      className={clsx(
                        'py-2 border-t-[.5px] border-doc-grey-600 border-solid w-[100%] flex items-center',
                        {
                          ['border-b-[.5px]']: i == docs.length - 1,
                        }
                      )}
                    >
                      <Link href={'/docs/' + doc.slug} className="w-[100%]">
                        <span
                          className={clsx(
                            'hover:bg-hover-effect text-doc-grey-100 w-[95%] py-1 text-[14px] px-8 hover:cursor-pointer leading-6 flex items-center rounded-r-xl w-[100%]',
                            {
                              ['bg-active-effect text-doc-red-200']: doc.slug == slug,
                            }
                          )}
                        >
                          {doc.title}
                        </span>
                      </Link>
                    </li>
                  );
                } else {
                  return <DocDropdown key={i} index={i} doc={doc} length={docs.length} />;
                }
              })}
            </ul>
          </div>
        </div>
        <div className="w-[100%] lg:flex-grow flex justify-center bg-doc-grey-800 lg:overflow-auto">
          <article
            className={clsx(
              'p-8 lg:p-10  w-[100%] max-w-[930px] border-doc-grey-900 my-4 lg:m-4 2xl:m-8 bg-doc-grey-900 flex flex-col h-auto rounded-sm border-[1px] border-solid relative',
              {
                ['justify-start']: query,
                ['justify-between']: !query,
              }
            )}
          >
            <div
              className="absolute right-4 top-4 text-[21px] hover:cursor-pointer"
              onClick={switchTheme}
            >
              {theme == 'dark' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
            </div>
            {query ? (
              <>
                <div className="text-heading-sm">Results:</div>
                {results.length > 0 ? (
                  <ul className="flex flex-col space-y-2 list-[circle] pl-8 pt-4">
                    {results.map((result, i) => {
                      if (result.children) {
                        return (
                          <div key={i} className="flex flex-col space-y-2 list-[circle]">
                            {result.children.map((child, j) => {
                              return (
                                <li key={i + j}>
                                  <Link href={'/docs/' + child.slug} className="w-[100%]">
                                    <span className="text-doc-red-200 hover:underline w-[100%]">
                                      {child.title}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </div>
                        );
                      } else {
                        return (
                          <li key={i}>
                            <Link href={'/docs/' + result.slug} className="w-[100%]">
                              <span className="text-doc-red-200 hover:underline w-[100%]">
                                {result.title}
                              </span>
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                ) : (
                  <span className="text-body-md mt-2 px-1">No results found</span>
                )}
              </>
            ) : (
              <>
                <div className="text-doc-grey-100 markdown-content min-h-[calc(100vh-280px)]">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeKatex]}
                    remarkPlugins={[remarkGfm, RemarkMathPlugin]}
                    // eslint-disable-next-line react/no-children-prop
                    children={content}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            language={match[1]}
                            // eslint-disable-next-line react/no-children-prop
                            children={String(children).replace(/\n$/, '')}
                            style={theme === 'dark' ? xonokai : vs}
                            PreTag="section" // parent tag
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  ></ReactMarkdown>
                </div>
                <div className="flex justify-between">
                  {previousDoc.slug !== slug ? (
                    <Link href={'/docs/' + previousDoc.slug} className="w-[100%]">
                      <span className="mt-8 flex items-center w-[100%]">
                        <span className="text-body-lg">
                          <MdKeyboardArrowLeft />
                        </span>
                        <span className="flex flex-col text-body-[14px] text-doc-red-200 ml-2">
                          <span className="text-doc-grey-200 text-body-sm">Previous</span>
                          {previousDoc.title}
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  {nextDoc.slug !== slug && (
                    <Link href={'/docs/' + nextDoc.slug} className="w-[100%]">
                      <span className="mt-8 flex items-center w-[100%]">
                        <span className="flex flex-col items-end text-body-[14px] text-doc-red-200 mr-2">
                          <span className="text-doc-grey-200 text-body-sm">Next</span>
                          {nextDoc.title}
                        </span>
                        <span className="text-body-lg">
                          <MdKeyboardArrowRight />
                        </span>
                      </span>
                    </Link>
                  )}
                </div>
              </>
            )}
            {/* <div className="my-8 pb-8 text-body-sm text-grey-50 flex justify-end">
              &copy; 2022 ALTRO
            </div> */}
          </article>
        </div>
      </div>
      <ToastContainer theme="colored" enableMultiContainer={false} />
    </main>
  );
}
