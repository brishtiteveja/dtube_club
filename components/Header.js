/* eslint-disable @next/next/no-img-element */
import { useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Image from "next/image";
import LanguageIcon from '@mui/icons-material/Language';
import { Dropdown, Avatar } from 'flowbite-react'

import Link from 'next/link'

import {
  SearchIcon,
} from "@heroicons/react/outline";


import {
  BellIcon,
} from '@heroicons/react/solid'

import { UploadIcon } from "@heroicons/react/solid"

import { signIn, signOut, useSession } from "next-auth/react";
import axios from 'axios'

function Header() {
  const router = useRouter()
  const [popupOpen, setPopupOpen] = useState(false)
  const { data:session, status } = useSession()

  const [notifications, setNotifications] = useState([])

  const [loginButtonClickState, setLoginButtonClickState] = useState(true)
  const [isOpen, setIsOpen] = useState(false);

  if (session && status === 'authenticated') {
    setTimeout(() => {
        const NOTIF_URL = "https://avalon.d.tube/notifications/" + session.user.username
        axios.get(NOTIF_URL).then(function (response) {
            setNotifications(response.data)
        }
    )}, 30000)
  }

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
      callbackUrl: process.env.NEXTAUTH_URL,
      redirect: false,
    })

    toast.success("Successfully logged in")
    // https://stackoverflow.com/questions/67901907/nextauth-authorizes-user-but-user-info-is-null
  }

  const handleSignOut = async (e) => {
    signOut({
      callbackUrl: process.env.NEXTAUTH_URL,
      redirect: false,
    })

    toast.success("Successfully logged out")
  }

  const handleLogin = () => { }

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setLoginButtonClickState(false)
  })

  const handleConnectHive = () => {
    router.push('network')
  }

  return (
    <header className="sticky top-0 z-50 bg-green-300 flex items-center p-2 lg:px-5 shadow-md">
      <div className="flex flex-wrap md:flex-grow m-1 justify-left md:justify-evenly">
            {/* Left */}
            <div className="flex flex-wrap">
              <Link href="/" className="flex rounded-md bg-cyan-50 p-2 hover:scale-125 hover:bg-emerald-100">
                    <img
                        className="flex w-[150px] h-[50px]"
                        src="/assets/DTube_files/images/DTube_Black.svg"
                        alt="dtube" 
                    /> 
              </Link>
            </div>

            {/* center  */}
            <div className="flex flex-wrap">
              {/* search bar */}
              <div>
                <SearchIcon className="hidden h-6 text-gray-600" />
                <input className="flex mt-5 mb-2 p-2 md:p-5 md:m-3 md:ml-60 h-10 w-64 md:w-96 bg-white outline-none placeholder-gray-500"
              placeholder="Search Dtube"/>
              </div>
              <div className="flex relative" onMouseEnter={() => setPopupOpen(true)} onMouseLeave={() => setPopupOpen(false)}>
                <button className="flex">
                  {/* <UploadIcon className="flex w-10 h-10 mt-3 ml-10 text-black bg-gray-400" /> */}
                  <UploadIcon className="flex group-hover:opacity-0 w-16 h-12 mt-2 ml-5 bg-lime-400 rounded-md hover:animate-bounce" />
                </button>
                {/* {
                  ({ popupOpen }) => 
                  (
                    <>
                    <span class="flex opacity-100 w-32 h-30 m-4 p-2 transition-opacity bg-emerald-200 px-1 text-black 
                          font-medium rounded-xl absolute left-1/2 -translate-x-1/2 translate-y-10">
                            Upload your content
                    </span>
                    </>
                  )
                } */}
              </div>
            </div>

            {/* right */}
            <div className="flex flex-wrap">
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
                        {/* balance and voting power */}
                        <div className="flex">
                          {/* balance */}
                          <div className="group relative flex p-2 m-1 mt-3 h-10 rounded bg-orange-100 hover:bg-orange-400">
                            <span className="font-bold text-rose-700"> 
                              {processBalance(session.user.balance)}K 
                            </span>
                            <span className="ml-1">
                              DTC
                            </span>
                            {/* <span class="flex group-hover:opacity-100 w-80 h-30 m-4 p-2 transition-opacity bg-emerald-200 px-1 text-black 
                            font-medium rounded-xl absolute left-1/2 -translate-x-1/2 translate-y-5 opacity-0">
                              DTUBE Coin balance - Hold more of it to generate more Voting Power. You can burn it to promote your videos and comments.
                            </span> */}
                          </div>

                          {/* voting power */}
                          <div className="hidden md:block group relative flex p-2 m-1 mt-3 h-10 rounded bg-orange-100 hover:bg-orange-400">
                            <span className="font-bold text-blue-900"> {processVotingPower(session.user.vt.v)}M VP</span>
                            {/* <span class="flex group-hover:opacity-100 w-80 h-35 m-4 p-2 transition-opacity bg-emerald-200 px-1 text-black 
                            font-medium rounded-xl absolute left-1/2 -translate-x-1/2 translate-y-5 opacity-0">
                              Voting Power - Bound to your account, you need to use it when you vote or add new content. Hold on to your DTCs to become more powerful and influent in the network!
                            </span> */}

                          </div>
                        </div>

                        <div className="flex ml-5 bg-slate-300 rounded-2xl p-0.5 hover:bg-red-200">
                          {/* <button className="flex ">
                            <img
                              className="flex rounded-full p-1 mt-2 h-12"
                              src={session.user.json.profile.avatar}
                              alt="profile" 
                            /> 
                            
                          </button>  */}

                        <div className="">
                          <Dropdown
                            className=""
                            arrowIcon={true}
                            inline={true}
                            label={
                              <div className="flex">
                                <img
                                  className="flex rounded-full p-1 mt-2 h-12"
                                  src={session.user.json.profile.avatar}
                                  alt="profile" 
                                /> 
                                <span className = "flex p-1 mt-3 truncate">
                                  {session.user.username}
                                </span>
                              </div>
                            }>
                              <div className="bg-red-100">
                                <a href={`https://d.tube/#!/c/${session.user.username}`} target="_blank" rel="noreferrer">
                                  <Dropdown.Item className="w-56 font-medium">
                                      <span className="flex"> 
                                        Profile
                                      </span>
                                  </Dropdown.Item>
                                </a>
                                {/* <Dropdown.Item className="w-56 font-medium" onClick={handleConnectNetwork}>
                                  Connect Socials
                                </Dropdown.Item> */}

                                <Dropdown.Item className="w-56 font-medium">
                                  Settings
                                </Dropdown.Item>
                                <Dropdown.Item className="w-56 font-medium" onClick={handleSignOut}>
                                  Sign out
                                </Dropdown.Item>
                              </div>
                            </Dropdown>
                          </div>
                        </div>

                        {/* Add socials and accounts */}
                        <div className="flex hidden md:block">
                          <Dropdown
                            className="flex"
                            arrowIcon={true}
                            inline={true}
                            label={
                              <div className="flex">
                                <LanguageIcon className="flex w-10 h-10 mt-3 ml-5 bg-gray-400 rounded-xl hover:cursor-pointer hover:bg-red-500 hover:scale-105">
                                  Connect Account
                                </LanguageIcon>
                              </div>
                            }>
                              <Dropdown.Item className="w-56 font-medium" onClick={handleConnectHive}>
                                <div className="flex">
                                    <img src="/assets/DTube_files/images/logos/hive.png" alt="hive"
                                          className="flex h-6 w-6 rounded-full cursor-pointer 
                                          hover:opacity-90 hover:border-2 border-red-400" 
                                    />
                                    <span className="flex flex-grow mt-0.5 ml-2 justify-center">Hive</span>
                                </div>
                              </Dropdown.Item>

                          </Dropdown>

                        </div>
                        

                        {/* notifications */}
                        <div className="flex group relative">
                            <BellIcon className="flex w-10 h-10 mt-3 ml-5 bg-gray-400 rounded-xl hover:cursor-pointer hover:bg-red-500 hover:scale-105"/>
                            <span class="flex group-hover:opacity-100 w-8 h-10 m-4 p-2 transition-opacity bg-red-500 px-1 text-black 
                              font-medium rounded-xl absolute left-1/2 translate-x-1 -translate-y-5 opacity-0 font-bold justify-center">
                                {notifications.length}
                            </span>
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
