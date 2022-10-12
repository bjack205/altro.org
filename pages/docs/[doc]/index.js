import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { fetchDocBySlug, fetchDocContent } from '../../../lib/docs';
import Head from 'next/head';
// import { Footer } from '../../components/navigation/footer/Footer';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import Document from '../../../components/Document';

const components = { MathJax, MathJaxContext };

export default function Doc({ slug, source, docs, nextDoc, previousDoc }) {
  const content = hydrate(source, { components });

  const config = {
    loader: { load: ['input/asciimath'] },
  };

  return (
    <>
      <Head>
        <title>ALTRO - Docs</title>
        <meta name="description" content="ALTRO is an open source tool for robotics..." />
        <link rel="icon" href="/robot.svg" />
      </Head>

      <Document
        docs={docs}
        slug={slug}
        content={content}
        config={config}
        nextDoc={nextDoc}
        previousDoc={previousDoc}
      />
    </>
  );
}

export const getStaticPaths = async () => {
  const paths = [];
  fetchDocContent().forEach((doc) => {
    if (!doc.children) {
      paths.push('/docs/' + doc.slug);
    }
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const slug = params.doc;

  const details = fetchDocBySlug(slug);

  const mdxSource = await renderToString(details.content, { components, scope: details.data });
  return {
    props: {
      docs: details.docs,
      title: details.data.title,
      slug: details.data.slug,
      source: mdxSource,
      nextDoc: details.nextDoc,
      previousDoc: details.previousDoc,
    },
  };
};
