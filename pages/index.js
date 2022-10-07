import Head from 'next/head';
// import Image from 'next/image';
import { Footer } from '../components/navigation/footer/Footer';
import { Header } from '../components/navigation/header/Header';
import animationData from '../public/wave.json';
import Lottie from 'react-lottie';
import { BasicButton } from '../components/data-display/button/basic-button/BasicButton';
import { BsSpeedometer2 } from 'react-icons/bs';
import Image from 'next/image';
import { listDocContent } from '../lib/docs';

export default function Home({ docs }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const features = [
    {
      icon: <BsSpeedometer2 />,
      title: 'Lorem Ipsum',
      description:
        'Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta.',
    },
    {
      icon: <BsSpeedometer2 />,
      title: 'Lorem Ipsum',
      description:
        'Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta.',
    },
    {
      icon: <BsSpeedometer2 />,
      title: 'Lorem Ipsum',
      description:
        'Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta.',
    },
    {
      icon: <BsSpeedometer2 />,
      title: 'Lorem Ipsum',
      description:
        'Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta.',
    },
    {
      icon: <BsSpeedometer2 />,
      title: 'Lorem Ipsum',
      description:
        'Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta.',
    },
    {
      icon: <BsSpeedometer2 />,
      title: 'Lorem Ipsum',
      description:
        'Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta.',
    },
  ];

  const contributors = [
    {
      profile: '/user.png',
      name: 'Zac Manchester',
      role: 'Professor',
      affiliation: 'Carnegie Mellon University',
    },
    {
      profile: '/user.png',
      name: 'Brian Jackson',
      role: 'PhD Candidate',
      affiliation: 'Carnegie Mellon University',
    },
    {
      profile: '/user.png',
      name: 'Taylor Howell',
      role: 'PhD Candidate',
      affiliation: 'Carnegie Mellon University',
    },
  ];

  return (
    <>
      <Head>
        <title>ALTRO</title>
        <meta name="description" content="ALTRO is an open source tool for robotics..." />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Robotics_Institute_logo.svg/1200px-Robotics_Institute_logo.svg.png"
        />
      </Head>

      <main className="w-[100%] flex flex-col items-center">
        <Header stickyHeader={true} docs={docs} />
        <div className="w-[100%] h-[70vh] md:h-[90vh] mt-8 relative flex justify-center items-center">
          <div className="z-[20] flex flex-col justify-center mb-12 px-4">
            <h1 className="text-heading-md lg:text-heading-lg font-logo text-grey-50 text-center">
              ALTRO
            </h1>
            <p className="text-center text-body-md lg:text-body-lg mt-1">
              Open-source, with many interfaces
            </p>
            <div className="flex justify-center mt-8">
              <BasicButton label="Get Started" boxShadow={4}></BasicButton>
            </div>
          </div>
          <div className="absolute opacity-50 w-[100%] h-[100%]">
            <Lottie options={defaultOptions} height="100%" width="100%" />
          </div>
        </div>
        <div className="w-[100%] max-w-[1440px] flex flex-col items-center justify-center px-8 py-16">
          <h2 className="text-heading-md text-grey-50 font-semibold">Features</h2>
          <div className="flex flex-wrap w-[100%] justify-around py-4">
            {features.map((feature, i) => {
              return (
                <div
                  className="w-[100%] md:w-[45%] xl:w-[30%] flex flex-col items-center my-12"
                  key={i}
                >
                  <div className="text-heading-md">{feature.icon}</div>
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
            <h3 className="text-heading-md max-w-[380px] leading-10 mb-4 font-heading text-center lg:text-left text-grey-50">
              ALTRO beats most solvers.
            </h3>
            <p className="text-body-md max-w-[400px] font-body text-center lg:text-left text-grey-50">
              Sed porttitor lectus nibh. Curabitur aliquet quam id dui posuere blandit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus
              orci luctus et ultrices posuere cubilia Curae.
            </p>
          </div>
          <div className="mt-16 lg:mt-0 w-[320px] h-[200px] sm:w-[480px] sm:h-[280px] md:w-[589px] md:h-[314px] relative">
            <Image src="/graph.png" alt="line graph" layout="fill" />
          </div>
        </div>
        <div className="w-[100%] max-w-[1440px] flex flex-col items-center justify-center px-8 py-16">
          <h2 className="text-heading-md text-grey-50 font-semibold">Credits</h2>
          <div className="flex flex-wrap w-[100%] justify-around py-2">
            {contributors.map((contributor, i) => {
              return (
                <div className="w-[100%] lg:w-[30%] flex flex-col items-center my-12" key={i}>
                  <div className="rounded-full overflow-hidden w-[134px] h-[134px] relative">
                    <Image src={contributor.profile} alt="profile headshot" layout="fill" />
                  </div>
                  <p className="text-body-lg font-bold text-grey-50 font-heading mt-4">
                    {contributor.name}
                  </p>
                  <p className="text-center max-w-[300px] text-body-md text-grey-50 mt-2">
                    {contributor.role}
                  </p>
                  <p className="text-center max-w-[300px] text-body-md text-grey-50">
                    {contributor.affiliation}
                  </p>
                </div>
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
  const docs = listDocContent();
  return {
    props: {
      docs,
    },
  };
};
