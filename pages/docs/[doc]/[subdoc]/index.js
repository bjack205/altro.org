import { fetchDocBySlug, fetchDocContent } from '../../../../lib/docs';
import Head from 'next/head';
import Document from '../../../../components/Document';
// import rehypeKatex from 'rehype-katex';
// import remarkMath from 'remark-math';
// import katex from 'katex';

export default function Doc({ slug, docs, nextDoc, previousDoc, content }) {
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
        nextDoc={nextDoc}
        previousDoc={previousDoc}
      />
    </>
  );
}

export const getStaticPaths = async () => {
  const paths = [];
  fetchDocContent().forEach((doc) => {
    if (doc.children) {
      for (let child of doc.children) {
        paths.push('/docs/' + child.slug);
      }
    }
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  let slug = params.doc + '/' + params.subdoc;

  const details = fetchDocBySlug(slug);

  return {
    props: {
      docs: details.docs,
      slug: details.slug,
      nextDoc: details.nextDoc,
      previousDoc: details.previousDoc,
      content: details.content,
    },
  };
};
