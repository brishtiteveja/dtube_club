/* eslint-disable @next/next/no-img-element */

import { toast } from 'react-toastify'
//import {keychain, isKeychainInstalled, hasKeychainBeenUsed} from '@hiveio/keychain'
import { useSession } from 'next-auth/react'


function NetworkLoginManager() {
    const { data:session, status } = useSession()

    console.log(session)

    const handleHiveLogin = async (event) => {
        event.preventDefault() 

        if (!session) {
            toast.error("Login with dtube username before you link other social accounts.")
            return
        }

        let username = document.getElementById('hive-login-username').value
        if (username == "")
            toast.error("Please enter a valid Hive username")

        if(!window.hive_keychain) {
            // Hive Keychain extension not installed...
            toast.error(translate('LOGIN_ERROR_HIVE_KEYCHAIN_NOT_INSTALLED'), translate('ERROR_TITLE'))
            return
        }
        hive_keychain.requestHandshake(function() {
            console.log('Handshake received!')
        })

        hive_keychain.requestSignBuffer(username, "dtube_login-" + Math.round(99999999999*Math.random()), "Posting", function(response) {
            if(response.success === true) {

                let currentUser = "" //Session.get('activeUsernameHive')
                if (!session) {
                    toast.error("Login with dtube username before you link other social accounts.")
                    return
                }
                if (session && session.user && session.user.LinkedAccounts && session.user.LinkedAccounts["Hive"]) {
                    currentUser = session.user.LinkedAccounts["Hive"][0].username
                    toast.error("You are already logged in with Hive")
                    return
                }
                let username = response.data.username
                if (currentUser == username)
                {
                    toast.error("You are already logged in as " + username + " in Hive network.")
                    return
                }
                let user = {
                    username: response.data.username,
                    type: "keychain",
                    network: "hive"
                }

                sessionStorage.setItem('hiveLogin', user.username)

                session.user.LinkedAccounts = {}
                user._id = user.network+'/'+user.username  
                if (!session.user.LinkedAccounts['Hive']) {
                    session.user.LinkedAccounts['Hive'] = []
                }
                session.user.LinkedAccounts['Hive'].push(user)
                console.log(session)
                toast.success("Hive login success for " + username )

            } else {
                toast.error('Hive login failed. Check whether the username is valid.')
            }
        })
    }

    return (
        <div className="flex">
            <div className="flex flex-col">
                <span className="mt-10 ml-24 font-bold text-2xl text-sky-800">Connect to other social networks</span>
                <span className="-ml-24 text-sky-600">DTube supports authentication with multiple networks at the same time. Please select a network: </span>
                <div className="flex justify-center">
                    <div className="flex">
                        {/* {
                            sessionStorage && sessionStorage['hiveLogin'] &&
                            (
                                <div>
                                    <p>{ sessionStorage['hiveLogin'] }</p>
                                </div>
                            )
                        } */}
                        {/* {
                            session && session.user && session.user.LinkedAccounts && session.user.LinkedAccounts["Hive"] && session.user.LinkedAccounts["Hive"].length > 0 &&
                             (
                                <div>
                                    { session.user.LinkedAccounts['Hive'][0].username }
                                </div>
                             )
                        }
                    */}
                        {/* {
                            sessionStorage && !sessionStorage['hiveLogin'] &&
                            (
                                <div className="flex">
                                    <img src="/assets/DTube_files/images/logos/hive.png" alt="hive"
                                        className="h-64 w-64 rounded-full cursor-pointer hover:opacity-90 hover:border-2 border-red-400" 
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-3xl">Hive</span>
                                        <input id="hive-login-username" type="text" placeholder='username'></input>
                                        <button className="m-2 p-2 bg-red-300 rounded-xl" onClick={handleHiveLogin}>
                                            Login with Hive Keychain
                                        </button>
                                    </div>
                                </div>
                            )
                        } */}
                        
                    </div>
                    {/* <div className="flex flex-col">
                        <img src="/assets/DTube_files/images/logos/steem.png" alt="hive"
                            className="h-64 w-64 rounded-full cursor-pointer hover:opacity-80" 
                        />
                        <span className="font-bold ml-24">Steem</span>
                    </div> */}
                </div>
            </div>
        </div>
    )

}

export default NetworkLoginManager;