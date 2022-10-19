import Link from 'next/link';
// import fs from 'fs';
import clsx from 'clsx';
import { Header } from './navigation/header/Header';
// import { Footer } from '../../components/navigation/footer/Footer';
import { DocDropdown } from './navigation/doc-dropdown/DocDropdown';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import { AiOutlineSearch } from 'react-icons/ai';
import { MathJax } from 'better-react-mathjax';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

export default function Document({ docs, slug, content, previousDoc, nextDoc }) {
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const [theme, setTheme] = useState('dark');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

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
    localStorage.getItem('theme') ? setTheme(localStorage.getItem('theme')) : setTheme('dark');
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (let header of headers) {
      let id = header.innerText.replaceAll(' ', '-').toLowerCase();
      header.setAttribute('id', id);
      header.classList.add('flex', 'items-center');
      if (header.childNodes.length < 2) {
        const link = document.createElement('span');
        link.classList.add('hidden', 'mx-4', 'hover:cursor-pointer');
        link.innerHTML = '<img src="/bs-link.svg" className="text-doc-grey-100 bg-doc-grey-100" />';
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
  }, [content]);

  return (
    <main className="w-[100%] flex flex-col items-center" data-theme={theme}>
      <Header stickyHeader={true} docs={docs} />
      <div className="w-[100%] flex min-h-[calc(100vh-55px)] relative bg-doc-grey-900 text-doc-grey-200">
        <div className="relative hidden lg:block h-[calc(100vh-55px)] max-w-[300px] w-[100%] bg-doc-grey-900 py-2">
          <div className="w-[100%] sticky top-[60px] left-0 overflow-auto">
            <div className="mb-6 mt-4 mx-4 pl-4 pr-3 flex items-center bg-doc-grey-700 box-shadow--4 rounded-lg">
              <AiOutlineSearch />
              <input
                type="search"
                className="w-[100%] pl-3 h-[35px] flex items-center text-[14px] bg-transparent leading-6 text-doc-grey-100 placeholder:text-doc-grey-100"
                onChange={onSearchChange}
                placeholder="Search docs"
                value={query}
                onFocus={onFocus}
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
                      <Link href={'/docs/' + doc.slug}>
                        <a
                          href={'/docs/' + doc.slug}
                          className={clsx(
                            'hover:bg-hover-effect text-doc-grey-100 w-[95%] py-1 text-[14px] px-8 hover:cursor-pointer leading-6 flex items-center rounded-r-xl',
                            {
                              ['bg-active-effect text-doc-red-200']: doc.slug == slug,
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
        <div className="w-[100%] lg:flex-grow flex justify-center bg-doc-grey-800 lg:overflow-auto">
          <article
            className={clsx(
              'p-8 lg:p-10  w-[100%] max-w-[930px] border-doc-grey-900 my-4 lg:m-4 2xl:m-8 bg-doc-grey-900 flex flex-col h-auto rounded-sm border-[1px] border-solid relative',
              {
                ['justify-start']: active && results.length > 0,
                ['justify-between']: !active || results.length == 0,
              }
            )}
          >
            <div
              className="absolute right-4 top-4 text-[21px] hover:cursor-pointer"
              onClick={switchTheme}
            >
              {theme == 'dark' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
            </div>
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
                                    className="text-doc-red-200 hover:underline"
                                  >
                                    {child.data.title}
                                  </a>
                                </Link>
                              </li>
                            );
                          })}
                        </div>
                      );
                    } else {
                      return (
                        <li key={i}>
                          <Link href={'/docs/' + result.data.slug}>
                            <a
                              href={'/docs/' + result.data.slug}
                              className="text-doc-red-200 hover:underline"
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
                <div className="text-doc-grey-100 markdown-content min-h-[calc(100vh-280px)]">
                  <MathJax>{content}</MathJax>
                </div>
                <div className="flex justify-between">
                  {previousDoc.slug !== slug ? (
                    <Link href={'/docs/' + previousDoc.slug}>
                      <a href={'/docs/' + previousDoc.slug} className="mt-8 flex items-center">
                        <span className="text-body-lg">
                          <MdKeyboardArrowLeft />
                        </span>
                        <span className="flex flex-col text-body-[14px] text-doc-red-200 ml-2">
                          <span className="text-doc-grey-200 text-body-sm">Previous</span>
                          {previousDoc.title}
                        </span>
                      </a>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  {nextDoc.slug !== slug && (
                    <Link href={'/docs/' + nextDoc.slug}>
                      <a href={'/docs/' + nextDoc.slug} className="mt-8 flex items-center">
                        <span className="flex flex-col items-end text-body-[14px] text-doc-red-200 mr-2">
                          <span className="text-doc-grey-200 text-body-sm">Next</span>
                          {nextDoc.title}
                        </span>
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
