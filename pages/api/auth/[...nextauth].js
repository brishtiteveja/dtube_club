import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import avalon from 'javalon';
avalon.init({api: 'https://avalon.d.tube'})

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            id: "username-login", // <- add this line
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                privatekey: {  label: "Private Key", type: "password" }
            },
            async authorize(credentials, req) {
                var username = credentials.username
                var privatekey = credentials.privatekey

                var user = {
                    username: username,
                    network: 'avalon',
                    publickey: avalon.privToPub(privatekey)
                }

                const getUser  = () => {
                    return new Promise(function(resolve, reject) {
                        avalon.getAccount(username, function(err, chainuser) {
                            if (err) {
                                return err
                            }
        
                            var allowedTxTypes = []
                            for (let i = 0; i < chainuser.keys.length; i++) {
                                if (chainuser.keys[i].pub == user.publickey) {
                                    allowedTxTypes = chainuser.keys[i].types
                                }
                            }

                            if (allowedTxTypes.length > 0) {
                                user._id = user.network+'/'+ user.username
                                user.allowedTxTypes = allowedTxTypes
                                // merge with chain user
                                user = {...user, ...chainuser}
                            } 

                            if (user) {
                                resolve(user)
                            } else {
                                reject(null)
                            }
                        })
                    })
                }
                
                user = await getUser()

                if (user) {
                    // throw new Error("username = " + user.username + " and publickey = " + user.publickey +  " userid = " + user._id + " msg = " + user.msg)
                    return user
                } else {
                    return null
                }
              },
        }),
    ],
    secret: process.env.JWT_SECRET,
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        signingKey: process.env.JWT_SECRET,
    },
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
})

