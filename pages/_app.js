import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import Head from "next/head";
import Notification from "@/components/ui/notification";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="description" content="BCL Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <Notification />
    </Layout>
  );
}
