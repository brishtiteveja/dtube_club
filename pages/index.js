import { getSession, SessionProvider } from "next-auth/react";
import Head from "next/head";
import FeedController from "../components/FeedController";
import Header from "../components/Header";

export default function Home({ videos, session }) {
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      {/* head */}
      <Head>
        <link rel="shortcut icon" href="assets/DTube_files/images/logos/dtube.png" />
        <title>DTube</title>
      </Head>

      <SessionProvider session={session} refetchInterval={60}>
        {/* header */}
        <Header />

        {/* left sidebar */}
      
        {/* feed */}
        <main>
          <FeedController videos={videos}/>
        </main>
      </SessionProvider>

      {/* right sidebar */}

      {/* bottom pane */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const AVALON_API_URL =  "https://avalon.d.tube/"

  const contentType = "trending"

  const REQUEST_URL = `${AVALON_API_URL}${contentType}`
  console.log("Content type url to be loaded in server side: " + REQUEST_URL);

  const response = await fetch(REQUEST_URL);
  const results = await response.json();

  let videoItems = results
  return {
    props: { videos: videoItems, session: session } 
  };
}
