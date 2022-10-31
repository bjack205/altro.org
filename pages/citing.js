import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import { Footer } from '../components/navigation/footer/Footer';
import { Header } from '../components/navigation/header/Header';
import { fetchCitingContent } from '../lib/citing';
import { fetchDocContent } from '../lib/docs';
import { useEffect, useState } from 'react';

export default function Citing({ docs, source }) {
  const [docsUrl, setDocsUrl] = useState('/docs/getting-started');

  useEffect(() => {
    if (docs[0].children) {
      setDocsUrl('/docs/' + docs[0].children[0].slug);
    } else {
      setDocsUrl('/docs/' + docs[0].slug);
    }
  }, []);
  const content = hydrate(source);
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
          {content}
        </div>
      </main>

      <Footer docsUrl={docsUrl} />
    </>
  );
}

export const getStaticProps = async () => {
  const docs = fetchDocContent();
  const content = fetchCitingContent();
  const mdxSource = await renderToString(content.content);
  return {
    props: {
      docs,
      source: mdxSource,
    },
  };
};
