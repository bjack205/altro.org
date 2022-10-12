import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import { Footer } from '../components/navigation/footer/Footer';
import { Header } from '../components/navigation/header/Header';
import { fetchCitingContent } from '../lib/citing';
import { fetchDocContent } from '../lib/docs';

export default function Citing({ docs, source }) {
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

      <Footer />
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
