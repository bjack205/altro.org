import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { fetchDocBySlug, fetchDocContent } from '../../../../lib/docs';
import Head from 'next/head';
// import { Footer } from '../../components/navigation/footer/Footer';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import Document from '../../../../components/Document';

const components = { MathJax, MathJaxContext };

export default function Doc({ slug, source, docs }) {
  const content = hydrate(source, { components });

  let nextSlug = 0;

  let previousSlug = 0;

  for (let i = 0; i < docs.length; i++) {
    if (docs[i].children) {
      for (let j = 0; j < docs[i].children.length; j++) {
        if (docs[i].children[j].slug == slug) {
          if (j > 0) {
            previousSlug = docs[i].children[j - 1].slug;
          } else {
            if (i > 0) {
              if (docs[i - 1].children) {
                previousSlug = docs[i - 1].children[docs[i - 1].children.length - 1].slug;
              } else {
                previousSlug = docs[i - 1].slug;
              }
            } else {
              previousSlug = docs[i].slug;
            }
          }
          if (j < docs[i].children.length - 1) {
            nextSlug = docs[i].children[j + 1].slug;
          } else {
            if (docs[i + 1].children) {
              nextSlug = docs[i + 1].children[0].slug;
            } else {
              nextSlug = docs[i + 1].slug;
            }
          }
          break;
        }
      }
      if (nextSlug) {
        break;
      }
    } else {
      if (docs[i].slug == slug) {
        if (i > 0) {
          if (docs[i - 1].children) {
            previousSlug = docs[i - 1].children[docs[i - 1].children.length - 1].slug;
          } else {
            previousSlug = docs[i - 1].slug;
          }
        } else {
          previousSlug = docs[i].slug;
        }
        if (i < docs.length - 1) {
          if (docs[i + 1].children) {
            nextSlug = docs[i + 1].children[0].slug;
          } else {
            nextSlug = docs[i + 1].slug;
          }
        } else {
          nextSlug = docs[i].slug;
        }
        break;
      }
    }
  }

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
        nextSlug={nextSlug}
        previousSlug={previousSlug}
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
  const docs = fetchDocContent();

  const details = fetchDocBySlug(slug);

  const mdxSource = await renderToString(details.content, { components, scope: details.data });
  return {
    props: {
      docs: docs,
      title: details.data.title,
      slug: details.data.slug,
      source: mdxSource,
    },
  };
};
