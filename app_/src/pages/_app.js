import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        {/* responsividade */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}