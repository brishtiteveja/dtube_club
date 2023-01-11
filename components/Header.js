/* eslint-disable @next/next/no-img-element */
import { useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Image from "next/image";
import HeaderIcon from "./HeaderIcon";

import {
  SearchIcon,
  UploadIcon,
} from "@heroicons/react/outline";

import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data:session, status } = useSession();

  const [loginButtonClickState, setLoginButtonClickState] = useState(true)
  const [isOpen, setIsOpen] = useState(false);

  const processBalance = (b) => {
    var bl = b/(1000 *100)
    bl = bl.toFixed(1)
    return bl
  }

  const processVotingPower = (v) => {
    var vp = v/1000000
    vp = vp.toFixed(1)

    return vp
  }

  const handleLoginButtonClick = () => {
      setIsOpen(true)
      setLoginButtonClickState(!loginButtonClickState)
  }

  const handleSignIn = async (e) => {
    e.preventDefault();

    console.log('submitted!');
    signIn('credentials', {
      username: e.target.username,
      privatekey: e.target.privatekey,
      //   email: 'test@test.com',
      //   password: '1234',
      callbackUrl: 'http://localhost:3000',
      redirect: false,
    })

    toast.success("Successfully logged in")
    // https://stackoverflow.com/questions/67901907/nextauth-authorizes-user-but-user-info-is-null
  }

  const handleSignOut = async (e) => {
    e.preventDefault();

    console.log('submitted!');
    signOut({
      callbackUrl: 'http://localhost:3000',
      redirect: false,
    })

    toast.success("Successfully logged out")
  }

  const handleLogin = () => { }

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setLoginButtonClickState(false)
  })

  return (
    <header className="sticky top-0 z-50 bg-green-600 flex items-center p-2 lg:px-5 shadow-md">
      <div className="flex m-1 justify-center">
            {/* Left */}
            <div className="flex">
              <a href="#" className="flex rounded-2xl bg-cyan-50 p-2 hover:animate-ping hover:bg-emerald-100">
                    <Image
                        className="flex"
                        src="/assets/DTube_files/images/DTube_Black.svg"
                        alt="dtube" 
                        width={100} 
                        height={50}
                    /> 
              </a>
            </div>

            {/* center  */}
            <div className="flex">
              <SearchIcon className="hidden h-6 text-gray-600" />
              <input className="flex p-5 m-3 ml-60 h-10 w-96 bg-white outline-none placeholder-gray-500"
            placeholder="Search Dtube"/>
            </div>

            {/* right */}
            <div className="flex flex-grow float-right">
              <button className="flex btn btn-upload">
                {/* <UploadIcon className="flex w-10 h-10 mt-3 ml-10 text-black bg-gray-400" /> */}
                <HeaderIcon Icon={UploadIcon} className="bg-gray-400"/>
              </button>

              {
                !session && 
                    <div className="flex">
                      <button className="flex btn p-2 m-3 ml-32 bg-blue-300 rounded-xl w-30 font-bold" 
                        onClick={handleSignIn}
                        // onClick={handleLoginButtonClick}
                      > 
                        Login
                      </button>
                      <a href="https://signup.dtube.fso.ovh/" target="_blank" rel="noreferrer">
                        <button className="flex btn p-2 m-3 bg-blue-300 rounded-2xl w-30 font-bold">
                          Signup
                        </button>
                      </a>
                    </div>
              }

              {
                session && session.user && session.user.json && session.user.json.profile &&
                    <div className="flex">
                        <div className="flex ml-5">
                          <p className="flex ml-5 mt-5 font-bold"> {processBalance(session.user.balance)}K</p>
                          <p className="flex ml-5 mt-5 font-bold"> {processVotingPower(session.user.vt.v)}M</p>
                        </div>
                        <div className="flex ml-5 bg-slate-300 rounded-2xl p-0.5 hover:bg-red-200">
                          <button className="flex "
                            onClick={handleSignOut} 
                          >
                            <img
                              className="flex rounded-full p-1 mt-2 h-12"
                              src={session.user.json.profile.avatar}
                              alt="profile"
                            /> 
                            <p className = "flex p-1 mt-3">
                              {session.user.username}
                            </p>
                          </button>
                          
                        </div>
                    </div>
              }
                    
            </div>

            <div className="flex">
              <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                      as="div"
                      className="fixed -inset-y-40 inset-x-10 right-0 z-10"
                      onClose={closeModal}
                  >
                      <div className="min-h-screen px-4 text-center">
                          <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                          >
                              <Dialog.Overlay className="fixed inset-0" />
                          </Transition.Child>

                          <span
                              className="inline-block h-screen align-middle"
                              aria-hidden="true"
                          >
                              &#8203;
                          </span>
                          <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                          >
                              <div className="inline-block w-1/4 max-w-md p-3 my-6 overflow-hidden text-left align-middle transform bg-[#b5d3df] shadow-xl rounded-xl">
                                  <Dialog.Title
                                      className="flex flex-grow justify-center text-xl font-bold p-5 text-gray-900 py-1 rounded-t-2xl"
                                  >
                                          Login to Dtube
                                  </Dialog.Title>

                                  <div className="flex flex-grow justify-center">
                                      <form className="flex-col" onSubmit={handleLogin}>
                                          <input
                                              className="flex rounded-full h-12 bg-gray-100 px-5 my-2 focus:outline-none"
                                              type="text"
                                              name="username"
                                              placeholder="username"
                                          />
                                          <input
                                              className="flex rounded-full h-12 bg-gray-100 px-5 my-2 focus:outline-none"
                                              type="text"
                                              name="privatekey"
                                              placeholder="password/private key"
                                          />
                                          <div className="">
                                            <button className="flex-col text-black m-2 bg-blue-300 items-center rounded-2xl p-3" type="submit">
                                                Login
                                            </button>
                                            <button className="flex-col text-black m-2 bg-blue-300 items-center rounded-2xl p-3" onClick={closeModal}>
                                                Cancel 
                                            </button>
                                          </div>
                                      </form>
                                  </div>

                                  <div className="mt-4">
                                      {/* divider */}
                                      <div class="relative flex py-1 items-center">
                                          <div class="flex-grow border-t border-gray-500"></div>
                                          {/* <span class="flex-shrink mx-4 text-gray-500">
                                          
                                          </span> */}
                                          <div class="flex-grow border-t border-gray-500"></div>
                                      </div>
                                  </div>
                              </div>
                          </Transition.Child>
                      </div>
                  </Dialog>
              </Transition>
              <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </div>
      </div>
    </header>
  );
}

export default Header;
