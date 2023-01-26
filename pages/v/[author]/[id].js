import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import axios from 'axios';

import Head from "next/head";
import FeedController from "../../../components/FeedController";
import Header from "../../../components/Header";
import { getSession, SessionProvider } from "next-auth/react";
import { Box, Center, Heading,SimpleGrid } from '@chakra-ui/layout';

import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";


import ReactPlayer from "react-player"
import { CONTEXT } from 'player.js';
import { UploadIcon } from '@heroicons/react/solid';
import PanToolRoundedIcon from '@mui/icons-material/PanToolRounded';

const Video = ({ videos, session }) => {
  const router = useRouter();
  const { id, author, link } = router.query;
  const [video, setVideo] = useState(null);


  useEffect(() => {
    // axios.get(`/api/videos/${id}`).then(response => {
    //   setVideo(response.data);
    // });
  }, [id]);

//   if (!video) {
//     return <div>Loading...</div>;
//   }

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
            
            <div className="flex">

                {/* <ReactPlayer 
                    url="https://youtu.be/v0498f77Kng"
                    playing={true}
                    controls={true}
                /> */}

                {/* Left */}

                {/* center */}
                {/* <Box maxWidth="720px" mx="auto" p={4} borderRadius="lg" boxShadow="2xl" my={8}> */}
                    {/* <ReactPlayer 
                    url="https://emb.d.tube/#!/yann0975/apgf7d6wxw1"
                    playing={true}
                    controls={true}
                    /> */}
                    <div className="flex justify-center ml-96 mt-16">
                <Draggable handle=".handle">
                        <ResizableBox>
                            {/* video player */}
                            <div>
                                {/* <ReactPlayer 
                                url="https://emb.d.tube/#!/yann0975/apgf7d6wxw1"
                                playing={true}
                                controls={true}
                                /> */}

                                <div className="flex float-right">
                                    <div
                                        className="close d-flex justify-content-center"
                                        onClick={() => dispatch(stopVideoPlayer())}
                                    >
                                        {/* <UploadIcon className="h-10 w-10" /> */}
                                    </div>
                                    <div className="handle d-flex justify-content-center">
                                        <PanToolRoundedIcon className="h-10 w-10" />
                                    </div>
                                </div>

                                {/* video player */}
                                <iframe 
                                        type="text/html"
                                        width={750}
                                        height={350}
                                        // style={{ width: "100%", height: "100%" }}
                                        src={`https://emb.d.tube/#!/${author}/${link}`} 
                                        frameborder="2" allowFullScreen>
                                </iframe>
                            </div>
                {/* </Box> */}
                        </ResizableBox>
                </Draggable>
                </div>

                {/* <FeedController videos={videos}/> */}

                {/* right */}
            
            </div>     
        </main> 
      </SessionProvider>

      {/* right sidebar */}

      {/* bottom pane */}
    </div>
  );
}


export default Video; 

// export async function getStaticProps(context) {
//     console.log(context.params); // return { title: 'Mortal Kombat' }
//     return {
//       props: {}, // will be passed to the page component as props
//     }
//   }