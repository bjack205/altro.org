import Head from 'next/head';
import { Footer } from '../components/navigation/footer/Footer';
import { Header } from '../components/navigation/header/Header';
import { fetchCitingContent } from '../lib/citing';
import { fetchDocContent } from '../lib/docs';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.css';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import RemarkMathPlugin from 'remark-math';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import xonokai from '../node_modules/react-syntax-highlighter/src/styles/prism/xonokai';

export default function Citing({ docs, content }) {
  const [docsUrl, setDocsUrl] = useState('/docs/getting-started');

  useEffect(() => {
    if (docs[0].children) {
      setDocsUrl('/docs/' + docs[0].children[0].slug);
    } else {
      setDocsUrl('/docs/' + docs[0].slug);
    }
  }, [docs]);
  return (
    <>
      <Head>
        <title>ALTRO - Citing</title>
        <meta name="description" content="ALTRO is an open source tool for robotics..." />
        <link rel="icon" href="/robot.svg" />
      </Head>

      <main className="w-[100%] flex flex-col items-center">
        <Header stickyHeader={true} docs={docs} />
        <div className="w-[100%] max-w-[1440px] mt-8 relative min-h-[100vh] px-8 lg:px-20 markdown-content">
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
                    style={xonokai}
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
      </main>

      <Footer docsUrl={docsUrl} />
    </>
  );
}

export const getStaticProps = async () => {
  const docs = fetchDocContent();
  const content = fetchCitingContent();
  return {
    props: {
      docs,
      content: content.content,
    },
  };
};
