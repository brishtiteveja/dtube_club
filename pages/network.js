
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import NetworkLoginManager from "../components/NetworkLoginManager";

function Network( { session } ) {
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
                    <NetworkLoginManager /> 
                </main>
            </SessionProvider>

        {/* right sidebar */}

        {/* bottom pane */}
        </div>
    )
}

export default Network;