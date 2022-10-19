import Link from 'next/link';
// import fs from 'fs';
import clsx from 'clsx';
import { Header } from './navigation/header/Header';
// import { Footer } from '../../components/navigation/footer/Footer';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { DocDropdown } from './navigation/doc-dropdown/DocDropdown';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Document({ docs, slug, content, config, previousDoc, nextDoc }) {
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchRef = useRef(null);

  const copyToClipboard = (id) => {
    const url = window.location.href.split('#')[0] + '#' + id;
    navigator.clipboard.writeText(url);
    openSnackbar('Copied to clipboard');
    setTimeout(() => {
      closeSnackbar();
    }, 3000);
  };

  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onSearchChange = (event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          console.log('res', res);
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  };

  const onClick = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener('click', onClick);
    }
  };

  const onFocus = () => {
    setActive(true);
    window.addEventListener('click', onClick);
  };

  useEffect(() => {
    console.log('effect');
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (let header of headers) {
      let id = header.innerText.replaceAll(' ', '-').toLowerCase();
      header.setAttribute('id', id);
      header.classList.add('flex', 'items-center');
      const link = document.createElement('span');
      link.classList.add('hidden', 'mx-4', 'hover:cursor-pointer');
      link.innerHTML = '<img src="/bs-link.svg"/>';
      header.appendChild(link);
      header.addEventListener('mouseover', () => {
        link.classList.remove('hidden');
      });
      header.addEventListener('mouseleave', () => {
        link.classList.add('hidden');
      });
      link.addEventListener('click', () => copyToClipboard(header.id));
    }
  }, [content]);

  return (
    <main className="w-[100%] flex flex-col items-center">
      <Header stickyHeader={true} docs={docs} />
      <div className="w-[100%] flex justify-center relative lg:h-[calc(100vh-55px)] bg-grey-900 overflow-auto">
        <div className="hidden lg:flex max-w-[300px] flex-col items-center 2xl:items-end w-[100%] h-[100%] bg-grey-900 py-2 overflow-auto">
          <div className="w-[100%]">
            <div className="mb-6 mt-4 mx-4 pl-4 pr-3 flex items-center bg-grey-800 box-shadow--4 rounded-lg">
              <AiOutlineSearch />
              <input
                type="search"
                className="w-[100%] pl-3 h-[35px] flex items-center text-[14px] bg-transparent leading-6"
                onChange={onSearchChange}
                placeholder="Search docs"
                value={query}
                onFocus={onFocus}
                ref={searchRef}
              />
            </div>
            {/* <p className="my-4 text-body-lg font-semibold px-8">User Documentation</p> */}
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
                  return <DocDropdown key={i} index={i} doc={doc} length={docs.length} />;
                }
              })}
            </ul>
          </div>
        </div>
        <div className="w-[100%] lg:flex-grow flex justify-center bg-grey-700 lg:overflow-auto">
          <article
            className={clsx(
              'p-8 lg:p-10  w-[100%] max-w-[930px] border-grey-900 m-4 2xl:m-8 bg-grey-800 flex flex-col rounded-sm border-[1px] border-solid',
              {
                ['justify-start']: active && results.length > 0,
                ['justify-between']: !active || results.length == 0,
              }
            )}
          >
            {active && results.length > 0 ? (
              <>
                <div className="text-heading-sm">Results:</div>
                <ul className="flex flex-col space-y-2 list-[circle] pl-8 pt-4">
                  {results.map((result, i) => {
                    if (result.children) {
                      return (
                        <div key={i} className="flex flex-col space-y-2 list-[circle]">
                          {result.children.map((child, j) => {
                            return (
                              <li key={i + j}>
                                <Link href={'/docs/' + child.data.slug}>
                                  <a
                                    href={'/docs/' + child.data.slug}
                                    className="text-red-200 hover:underline"
                                  >
                                    {child.data.title}
                                  </a>
                                </Link>
                              </li>
                            );
                          })}
                        </div>
                      );
                      // return children;
                    } else {
                      return (
                        <li key={i}>
                          <Link href={'/docs/' + result.data.slug}>
                            <a
                              href={'/docs/' + result.data.slug}
                              className="text-red-200 hover:underline"
                            >
                              {result.data.title}
                            </a>
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </>
            ) : (
              <>
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
              </>
            )}
            {/* <div className="my-8 pb-8 text-body-sm text-grey-50 flex justify-end">
              &copy; 2022 ALTRO
            </div> */}
          </article>
        </div>
      </div>
    </main>
  );
}
