import Head from 'next/head';
import { Footer } from '../components/navigation/footer/Footer';
import { Header } from '../components/navigation/header/Header';
import { listDocContent } from '../lib/docs';

export default function Citing({ docs }) {
  return (
    <>
      <Head>
        <title>ALTRO - Citing</title>
        <meta name="description" content="ALTRO is an open source tool for robotics..." />
        <link rel="icon" href="/robot.svg" />
      </Head>

      <main className="w-[100%] flex flex-col items-center">
        <Header stickyHeader={true} docs={docs} />
        <div className="w-[100%] max-w-[1440px] mt-8 relative min-h-[100vh] px-8 lg:px-20">
          <h1 className="text-grey-50 font-heading text-heading-md font-semibold mb-8">
            Citing ALTRO
          </h1>
          <p>Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed:</p>

          <ul className="list-disc ml-8 mt-2">
            <li>Vestibulum ac diam</li>
            <li>Vestibulum ac diam</li>
            <li>Vestibulum ac diam</li>
          </ul>

          <p className="py-8">
            Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit
            amet dui. Sed porttitor lectus nibh. Quisque velit nisi, pretium ut lacinia in,
            elementum id enim. Nulla quis lorem ut libero malesuada feugiat. Vivamus suscipit tortor
            eget felis porttitor volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec rutrum congue leo eget malesuada. Vestibulum ac diam sit amet quam vehicula
            elementum sed sit amet dui. Donec sollicitudin molestie malesuada. Nulla quis lorem ut
            libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
            Proin eget tortor risus. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor
            accumsan tincidunt. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
            Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget
            tortor risus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh
            pulvinar a. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Praesent
            sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed
            magna dictum porta. Vivamus magna justo, lacinia eget consectetur sed, convallis at
            tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non
            nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget
            tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
            Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Donec
            sollicitudin molestie malesuada.
          </p>
          <p>
            Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit
            amet dui. Sed porttitor lectus nibh. Quisque velit nisi, pretium ut lacinia in,
            elementum id enim. Nulla quis lorem ut libero malesuada feugiat. Vivamus suscipit tortor
            eget felis porttitor volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec rutrum congue leo eget malesuada. Vestibulum ac diam sit amet quam vehicula
            elementum sed sit amet dui. Donec sollicitudin molestie malesuada. Nulla quis lorem ut
            libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
            Proin eget tortor risus. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor
            accumsan tincidunt. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
            Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget
            tortor risus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh
            pulvinar a. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Praesent
            sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed
            magna dictum porta. Vivamus magna justo, lacinia eget consectetur sed, convallis at
            tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non
            nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget
            tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
            Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Donec
            sollicitudin molestie malesuada.
          </p>
        </div>
      </main>

      <Footer />
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
