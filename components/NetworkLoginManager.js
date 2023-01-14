/* eslint-disable @next/next/no-img-element */

import { toast } from 'react-toastify'

import {keychain, isKeychainInstalled, hasKeychainBeenUsed} from '@hiveio/keychain'


function NetworkLoginManager() {
    const handleHiveLogin = async () => {

        let username = "brishtiteveja"
        const {success, msg, cancel, notInstalled, notActive} = await keychain(window, 'requestHandshake', function (req, res) {
            console.log("cb")
        })

        if (success) {
            toast.success("Handshake received!")
        } else {
            console.log("Handshake failed!")
        }

        // if(!window.hive_keychain) {
        //     // Hive Keychain extension not installed...
        //     toast.error(translate('LOGIN_ERROR_HIVE_KEYCHAIN_NOT_INSTALLED'), translate('ERROR_TITLE'))
        //     return
        // }
        // hive_keychain.requestHandshake(function() {
        //     console.log('Handshake received!')
        // })
        // let username = "brishtiteveja0595" //document.getElementById("keychain_username").value.toLowerCase().replace('@','')
        // hive_keychain.requestSignBuffer(username, "dtube_login-" + Math.round(99999999999*Math.random()), "Posting", function(response) {
        //     if(response.success === true) {
        //       let currentUser = "" //Session.get('activeUsernameHive')
        //       let username = response.data.username
        //       if (currentUser == username)
        //       {
        //         toast.error(translate('LOGIN_ERROR_ALREADY_LOGGED'), translate('ERROR_TITLE'))
        //         return
        //       }
        //       let user = {
        //           username: response.data.username,
        //           type: "keychain",
        //           network: "hive"
        //       }
        //       user._id = user.network+'/'+user.username  
        //     //   Users.upsert({_id: user._id}, user, function() {
        //     //     Template.loginhive.success(user.username)
        //     //   })
        //         console.log(user)
        //         toast.success("Hive login success")
        //     } else {
        //       toast.error(translate('LOGIN_ERROR_AUTHENTIFICATION_FAILED'), translate('ERROR_TITLE'))
        //     }
        // })
    }

    return (
        <div className="flex">
            <div className="flex flex-col">
                <span className="mt-10 ml-24 font-bold text-2xl text-sky-800">Connect to other social networks</span>
                <span className="-ml-24 text-sky-600">DTube supports authentication with multiple networks at the same time. Please select a network: </span>
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <button className="" onClick={handleHiveLogin}>
                            <img src="/assets/DTube_files/images/logos/hive.png" alt="hive"
                                className="h-64 w-64 rounded-full cursor-pointer hover:opacity-90 hover:border-2 border-red-400" 
                            />
                            <span className="font-bold text-3xl">Hive</span>
                        </button>
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