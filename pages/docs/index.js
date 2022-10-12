import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '../../components/navigation/header/Header';
import { fetchDocContent } from '../../lib/docs';
import clsx from 'clsx';

export default function Index({ docs }) {
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
          <div className="hidden lg:flex max-w-[300px] 2xl:max-w-[30%] flex-col items-center 2xl:items-end w-[100%] h-[100%] bg-grey-900 py-8 px-8 2xl:px-16 overflow-auto 2xl:flex-grow">
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
                        className={clsx(
                          'text-grey-200 hover:text-white-500 hover:cursor-pointer',
                          {}
                        )}
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
              <div className="text-grey-50 doc-content min-h-[calc(100vh-280px)]">ALTRO Solver</div>
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

export const getStaticProps = async () => {
  const docs = fetchDocContent();
  return {
    props: {
      docs,
    },
  };
};
