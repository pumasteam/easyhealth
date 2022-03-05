import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Router, useRouter } from "next/router";

const Hero = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 items-center lg:flex md:px-8">
      <div className="space-y-4 flex-1 sm:text-center lg:text-left">
        <h1 className="text-gray-800 font-bold text-4xl xl:text-5xl">
          Optimize your consultations up to
          <span className="text-indigo-600"> 4x times faster</span>
        </h1>
        <p className="text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
          We make it easy to manage your patients&apos; medical records,
          synchronizing the data with your colleagues and generating artificial
          intelligence based diagnoses.
        </p>
        <div>
          <div className="items-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start">
            <button
              onClick={() => (session ? router.push("/home") : signIn())}
              className="outline-none bg-gray-700 text-white text-center px-4 py-3 rounded-md shadow w-full ring-offset-2 ring-gray-700 focus:ring-2  sm:w-auto"
            >
              {session ? "Let's start" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
        <Image
          src="/hero.svg"
          className="w-full mx-auto sm:w-10/12  lg:w-full"
          alt="hero"
          width={800}
          height={600}
        />
      </div>
    </section>
  );
};

export default Hero;
