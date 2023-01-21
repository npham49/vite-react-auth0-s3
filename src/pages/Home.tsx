import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const {loginWithRedirect} = useAuth0()
  return (
    <>
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leading-none sm:text-5xl">
            Welcome to a file system created with
            <span className="dark:text-gray-400"> React, TailwindCSS, and AWS</span>
          </h1>
          <p className="px-8 mt-8 text-lg">
            You will find a quick demo on the file storage tab. All of our files are storaged un AWS S3 and the backend is hosted on an EC2 instance.
          </p>
          <p className="px-8 mb-12 text-lg">
            If you want a temporary demo account, you can send me a message on the contact tab and I will send you a one.
          </p>
          <div className="flex flex-wrap justify-center">
            <button className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-400 dark:text-gray-900" onClick={() => loginWithRedirect()}>
              Login
            </button>
            <button className="px-8 py-3 m-2 text-lg border rounded dark:text-gray-50 dark:border-gray-700">
              Contact
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
