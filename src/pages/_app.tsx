import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Welcome to BikeRentals</title>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}

export default MyApp;
