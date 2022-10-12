import Head from 'next/head';
// import Image from 'next/image';
import { Footer } from '../components/navigation/footer/Footer';
import { Header } from '../components/navigation/header/Header';
import animationData from '../public/wave.json';
import Lottie from 'react-lottie';
import { BasicButton } from '../components/data-display/button/basic-button/BasicButton';
import Image from 'next/image';
import { fetchDocContent } from '../lib/docs';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';
import { fetchHomeContent } from '../lib/home';

export default function Home({ docs, content }) {
  console.log(content);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const features = content.features;

  const contributors = content.contributors;

  return (
    <>
      <Head>
        <title>ALTRO</title>
        <meta name="description" content="ALTRO is an open source tool for robotics..." />
        <link rel="icon" href="/robot.svg" />
      </Head>

      <main className="w-[100%] flex flex-col items-center">
        <Header stickyHeader={true} docs={docs} />
        <div className="w-[100%] h-[70vh] md:h-[90vh] mt-8 relative flex justify-center items-center">
          <div className="z-[20] flex flex-col justify-center mb-12 px-4">
            <h1 className="text-heading-md lg:text-heading-lg font-logo text-grey-50 text-center">
              ALTRO
            </h1>

            <div class="text-center text-body-md lg:text-body-lg typewrite leading-6 my-4 text-grey-50 scrollable-div">
              <Typewriter
                options={{
                  strings: content.typewriter,
                  delay: 50,
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/docs/getting-started/index">
                <BasicButton label="Get Started" boxShadow={4}></BasicButton>
              </Link>
            </div>
          </div>
          <div className="absolute opacity-50 w-[100%] h-[100%]">
            <Lottie options={defaultOptions} height="100%" width="100%" />
          </div>
        </div>
        <div className="w-[100%] max-w-[1440px] flex flex-col items-center justify-center px-8 py-16">
          <h2 className="text-heading-md text-grey-50 font-semibold">Features</h2>
          <div className="flex flex-wrap justify-start py-4">
            {features.map((feature, i) => {
              return (
                <div
                  className="w-[100%] md:w-[49%] xl:w-[33%] flex flex-col items-center my-12"
                  key={i}
                >
                  {/* <div className="text-heading-md">{feature.icon}</div> */}
                  <p className="text-body-lg font-bold text-grey-50 font-heading mt-4">
                    {feature.title}
                  </p>
                  <p className="text-center max-w-[300px] text-body-md text-grey-50 mt-2">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[100%] max-w-[1440px] flex flex-col lg:space-y-0 lg:flex-row items-center lg:justify-around p-8 py-20 lg:py-32">
          <div>
            {content.graphContent && (
              <h3 className="text-heading-md max-w-[380px] leading-10 mb-4 font-heading text-center lg:text-left text-grey-50">
                {content.graphContent.title}
              </h3>
            )}
            {content.graphContent && (
              <p className="text-body-md max-w-[400px] font-body text-center lg:text-left text-grey-50">
                {content.graphContent.description}
              </p>
            )}
          </div>
          <div className="mt-16 lg:mt-0 w-[320px] h-[200px] sm:w-[480px] sm:h-[280px] md:w-[589px] md:h-[314px] relative">
            <Image src={content.graph} alt="line graph" layout="fill" />
          </div>
        </div>
        <div className="w-[100%] max-w-[1440px] flex flex-col items-center justify-center px-8 py-16">
          <h2 className="text-heading-md text-grey-50 font-semibold">Credits</h2>
          <div className="flex flex-wrap w-[100%] justify-around py-2">
            {contributors.map((contributor, i) => {
              return (
                <Link href={contributor.website} passHref key={i}>
                  <a
                    href={contributor.website}
                    target="_blank"
                    rel="noreferrer"
                    className="w-[100%] lg:w-[30%] flex flex-col items-center my-12"
                  >
                    <div className="rounded-full overflow-hidden w-[134px] h-[134px] relative">
                      <Image src={contributor.profile} alt="profile headshot" layout="fill" />
                    </div>
                    <p className="text-body-lg font-bold text-grey-50 font-heading mt-4">
                      {contributor.name}
                    </p>
                    <p className="text-center max-w-[300px] text-body-md text-grey-50 mt-2">
                      {contributor.description}
                    </p>
                    <p className="text-center max-w-[300px] text-body-md text-grey-200 mt-2">
                      {contributor.affiliation}
                    </p>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const docs = fetchDocContent();
  const content = fetchHomeContent();
  return {
    props: {
      docs,
      content,
    },
  };
};
