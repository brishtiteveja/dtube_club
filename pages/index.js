import { getSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";

export default function Home({ videos }) {
  
  // if (!session) return <Login />;

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <link rel="shortcut icon" href="assets/DTube_files/images/logos/dtube.png" />
        <title>DTube</title>
      </Head>

      <Header />

      <main className="flex-col">
        {/* <Feed /> */}
          { 
            videos && videos.map( (video) => {
              return(
                <h1 className="p-1">
                  {video.author}
                </h1> 
                
              )
            })
          }
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const session = await getSession(context);

  const AVALON_API_URL =  "https://avalon.d.tube/"

  const contentType = "trending"

  const REQUEST_URL = `${AVALON_API_URL}${contentType}`
  console.log("Content type url to be loaded in server side: " + REQUEST_URL);

  const response = await fetch(REQUEST_URL);
  const results = await response.json();

  let videoItems = results
  return {
    props: { videos: videoItems },
  };
}
