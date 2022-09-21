import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <section className="relative bg-center bg-no-repeat bg-cover bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)]">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>

      <div className="relative max-w-screen-xl px-4 py-32 mx-auto sm:px-6 lg:px-8 lg:h-screen lg:items-center lg:flex">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Let us get you on the road -
            <strong className="p-3 font-extrabold text-rose-700">Reserve a bike today</strong>
          </h1>

          <div className="flex flex-wrap gap-4 mt-8 text-center">
            <a
              href="/login"
              className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-rose-600 sm:w-auto active:bg-rose-500 hover:bg-rose-700 focus:outline-none focus:ring"
            >
              Get Started 
            </a>

            <a
              href="#"
              className="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-rose-600 sm:w-auto hover:text-rose-700 active:text-rose-500 focus:outline-none focus:ring"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
