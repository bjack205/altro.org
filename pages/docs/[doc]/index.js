import { fetchDocBySlug, fetchDocContent } from '../../../lib/docs';
import Head from 'next/head';
import Document from '../../../components/Document';

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
  return {
    props: {
      title: details.title,
      slug: details.slug,
      docs: details.docs,
      nextDoc: details.nextDoc,
      previousDoc: details.previousDoc,
      content: details.content,
    },
  };
};
