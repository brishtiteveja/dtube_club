
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";

import { signIn, signOut, useSession } from "next-auth/react";



import { useState } from "react";

function Upload( { session } ) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = () => {
        // implement upload logic here
    }
    const responseGoogle = (response) => {
        console.log("hello")
    }

    const handleLoginWithYoutube = async () => {
        try {
            //await popupCenter("/google-signin", "Youtube Sign In");
            await signIn("google")
            console.log(session)
            console.log(session.user)

          } catch(error) {
            console.log(error);
          }
    }

    const popupCenter = (url, title) => {
        const dualScreenLeft = window.screenLeft ?? window.screenX;
        const dualScreenTop = window.screenTop ?? window.screenY;
        const width =
          window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
    
        const height =
          window.innerHeight ??
          document.documentElement.clientHeight ??
          screen.height;
    
        const systemZoom = width / window.screen.availWidth;
    
        const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
        const top = (height - 550) / 2 / systemZoom + dualScreenTop;
    
        const newWindow = window.open(
          url,
          title,
          `width=${500 / systemZoom},height=${550 / systemZoom
          },top=${top},left=${left}`
        );
    
        newWindow?.focus();
      };

    return(
        <div className="h-screen bg-gray-100 overflow-hidden">
            <Head>
                <link rel="shortcut icon" href="assets/DTube_files/images/logos/dtube.png" />
                <title>DTube</title>
            </Head>

            <SessionProvider session={session} refetchInterval={60}>
                {/* header */}
                <Header />

                {/* left sidebar */}
            
                {/* feed */}
                <main className="flex justify-center">
                    <div className="flex flex-col m-3">
                        <div className="flex flex-col">
                            <p className="m-2 p-2 bg-amber-200 rounded-xl text-center font-bold"> 1. Peer 2 Peer - The decentralized way </p>
                            <div className="flex flex-col m-5 p-3">
                                <input className="m-2 ml-32 p-2" 
                                    type="file" 
                                    onChange={handleFileSelect} 
                                    accept=""
                                />
                                <button 
                                    className="p-2 ml-32 w-64 bg-slate-400 rounded-xl" 
                                    onClick={handleUpload}>
                                        Upload Video to P2P Network
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <p className="m-2 p-2 bg-orange-300 rounded-xl text-center font-bold"> 2. 3rd Party (Youtube) </p>
                            <button 
                                onClick={handleLoginWithYoutube}
                                className="ml-32 w-[200px] h-[100px] bg-red-200 p-2 m-2 bg-[url('https://www.youtube.com/yts/img/favicon_144-vflWmzoXw.png')] bg-no-repeat bg-center rounded-full"
                            >
                                
                            </button>
                        </div>

                    </div>
                    
                </main>
            </SessionProvider>

        {/* right sidebar */}

        {/* bottom pane */}
        </div>
    )
}

export default Upload;