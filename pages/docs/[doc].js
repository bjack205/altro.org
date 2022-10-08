import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import { fetchDocContent } from '../../lib/docs';
import fs from 'fs';
import yaml from 'js-yaml';
import { listDocContent } from '../../lib/docs';
import Link from 'next/link';
import clsx from 'clsx';
import Head from 'next/head';
import { Header } from '../../components/navigation/header/Header';
import Image from 'next/image';
// import { Footer } from '../../components/navigation/footer/Footer';
import { BasicButton } from '../../components/data-display/button/basic-button/BasicButton';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const slugToDocContent = ((docContents) => {
  let hash = {};
  docContents.forEach((it) => (hash[it.slug] = it));
  return hash;
})(fetchDocContent());

const components = { MathJax, MathJaxContext };

export default function Doc({ slug, source, docs }) {
  const content = hydrate(source, { components });

  let nextSlug = 0;

  let previousSlug = 0;

  for (let i = 0; i < docs.length; i++) {
    console.log(i);
    if (docs[i].slug == slug) {
      if (i > 0) {
        previousSlug = docs[i - 1].slug;
      } else {
        previousSlug = docs[i].slug;
      }
      if (i < docs.length - 1) {
        nextSlug = docs[i + 1].slug;
      } else {
        nextSlug = docs[i].slug;
      }
      break;
    }
  }

  const config = {
    loader: { load: ['input/asciimath'] },
  };

  return (
    <>
      <Head>
        <title>ALTRO</title>
        <meta name="description" content="ALTRO is an open source tool for robotics..." />
        <link rel="icon" href="/robot.svg" />
      </Head>

      <main className="w-[100%] flex flex-col items-center">
        <Header stickyHeader={true} docs={docs} />
        <div className="w-[100%] flex justify-center relative lg:h-[calc(100vh-55px)] bg-grey-900 overflow-auto">
          <div className="hidden lg:flex max-w-[350px] 2xl:max-w-[30%] flex-col items-center 2xl:items-end w-[100%] h-[100%] bg-grey-900 py-8 px-8 overflow-auto flex-grow">
            <div>
              <Image
                src="/robotic-exploration.png"
                alt="Robotic Exploration Lab"
                width="200px"
                height="200px"
              />
              <h2 className="pb-6 font-logo font-semibold text-heading-sm leading-8">ALTRO</h2>
              <p className="my-4 text-body-lg font-semibold">User Documentation</p>
              <ul className="flex flex-col space-y-2 pr-4">
                {docs.map((doc, i) => (
                  <li key={i}>
                    <Link href={'/docs/' + doc.slug}>
                      <span
                        className={clsx('text-grey-200 hover:text-white-500 hover:cursor-pointer', {
                          ['text-white-500']: doc.slug == slug,
                        })}
                      >
                        {doc.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-[100%] lg:flex-grow flex justify-start bg-grey-800 lg:overflow-auto">
            <article className="p-8 lg:p-16 lg:py-20 w-[100%] max-w-[900px]">
              <div className="text-grey-50 doc-content min-h-[calc(100vh-280px)]">
                <MathJaxContext config={config}>
                  <MathJax>{content}</MathJax>
                </MathJaxContext>
              </div>
              <div className="flex justify-between">
                {previousSlug !== slug ? (
                  <a href={'/docs/' + previousSlug} className="flex justify- mt-8">
                    <BasicButton label="Previous"></BasicButton>
                  </a>
                ) : (
                  <div></div>
                )}
                {nextSlug !== slug && (
                  <a href={'/docs/' + nextSlug} className="mt-8">
                    <BasicButton label="Next"></BasicButton>
                  </a>
                )}
              </div>
              <div className="my-8 pb-8 text-body-sm text-grey-50 flex justify-end">
                &copy; 2022 ALTRO
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths = async () => {
  const paths = fetchDocContent().map((it) => '/docs/' + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const slug = params.doc;
  const source = fs.readFileSync(slugToDocContent[slug].fullPath, 'utf8');
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
  });
  const mdxSource = await renderToString(content, { components, scope: data });
  const docs = listDocContent();
  return {
    props: {
      docs: docs,
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      description: '',
      tags: data.tags,
      author: data.author,
      source: mdxSource,
    },
  };
};
