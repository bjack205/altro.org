import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '../../components/navigation/header/Header';
import { listDocContent } from '../../lib/docs';
import clsx from 'clsx';

export default function Index({ docs }) {
  console.log('docs', docs);
  return (
    <>
      <Head>
        <title>ALTRO</title>
        <meta name="description" content="ALTRO is an open source tool for robotics..." />
        <link rel="icon" href="/robot.svg" />
      </Head>

      <main className="w-[100%] flex flex-col items-center">
        <Header stickyHeader={true} docs={docs} />
        <div className="w-[100%] flex justify-center relative h-[calc(100vh-55px)] bg-grey-800">
          <div className="absolute top-0 right-0 w-[50%] bg-grey-900 h-[100%] z-1"></div>
          <div className="flex w-[100%] justify-start max-w-[1440px] box-shadow--8">
            <div className="hidden lg:flex max-w-[350px] flex-col items-end w-[100%] h-[100%] bg-grey-800 py-12 px-8 overflow-auto">
              <div>
                <h2 className="pb-6 font-logo font-semibold text-heading-lg leading-8">ALTRO</h2>
                <Image
                  src="/robotic-exploration.png"
                  alt="Robotic Exploration Lab"
                  width="200px"
                  height="200px"
                />
                <p className="my-4 text-body-lg font-semibold">User Documentation</p>
                <ul className="flex flex-col space-y-2 pr-4">
                  {docs.map((doc, i) => (
                    <li key={i}>
                      <Link href={'/docs/' + doc.slug}>
                        <span
                          className={clsx(
                            'text-grey-200 hover:text-red-400 hover:cursor-pointer',
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
            <div className="w-[100%] max-w-[1220px] overflow-auto bg-grey-900 z-[10]">
              <article className="p-16">
                <header>
                  <h1 className="font-heading font-semibold text-heading-md">ALTRO Solver</h1>
                </header>
                {/* <div className="text-grey-50 doc-content">{content}</div> */}
              </article>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const docs = listDocContent();
  return {
    props: {
      docs,
    },
  };
};
