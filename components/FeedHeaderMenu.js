import react from "react";
import {useState, useEffect} from "react";
import HeaderIcon from "./HeaderIcon";
import {
    ChevronDownIcon, TrendingUpIcon,
} from "@heroicons/react/solid";


import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import axios from 'axios';
import { AccessTimeFilled, AccessTimeOutlined, WhatshotOutlined } from "@mui/icons-material";

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const FeedHeaderMenu = ({ contentType, setContentType, setContent}) => {
    const AVALON_API_URL =  "https://avalon.d.tube/"

    const [youtubeTrendingRegion, setYoutubeTrendingRegion] = useState("US")

    const handleDownloadLatest = (requestUrl) => {
        axios.get(requestUrl).then(function (response) {
            setContent(response.data)
        });
    }

    const handleTrendingClick = () => {
        const contentType = "Trending"
        setContentType(contentType)
        const REQUEST_URL = `${AVALON_API_URL}${contentType}`
        handleDownloadLatest(REQUEST_URL)
    }

    const handleHotClick = () => {
        const contentType = "Hot"
        setContentType(contentType)
        const REQUEST_URL = `${AVALON_API_URL}${contentType}`
        handleDownloadLatest(REQUEST_URL)
    }

    const handleNewestClick = () => {
        const contentType = "New";
        setContentType(contentType)
        const REQUEST_URL = `${AVALON_API_URL}${contentType}`
        handleDownloadLatest(REQUEST_URL)
    }

    const handleYoutubeTrending = () => {
        setContentType(contentType)

        const REQUEST_URL = "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=AIzaSyBHJCUTQ4WEJQrpmqAIDuQfgweMRJxd1cc&maxResults=1000&regionCode=" + youtubeTrendingRegion

        axios.get(REQUEST_URL).then(function (response) {
            console.log(response.data)
            setContent(response.data)
        });
    }

    const handleYoutubeTrendingUSClick = () => {
        const youtubeTrendingRegion = "US"
        setYoutubeTrendingRegion(youtubeTrendingRegion)
        handleYoutubeTrending()
    }

    const handleYoutubeTrendingBDClick = () => {
        const youtubeTrendingRegion = "BD"
        setYoutubeTrendingRegion(youtubeTrendingRegion)
        handleYoutubeTrending()
    }

    const handleYoutubeTrendingGBClick = () => {
        const youtubeTrendingRegion = "GB"
        setYoutubeTrendingRegion(youtubeTrendingRegion)
        handleYoutubeTrending()
    }
    const handleYoutubeTrendingINClick = () => {
        const youtubeTrendingRegion = "IN"
        setYoutubeTrendingRegion(youtubeTrendingRegion)
        handleYoutubeTrending()
    }
    const handleYoutubeTrendingAUClick = () => {
        const youtubeTrendingRegion = "AU"
        setYoutubeTrendingRegion(youtubeTrendingRegion)
        handleYoutubeTrending()
    }
    const handleYoutubeTrendingNLClick = () => {
        const youtubeTrendingRegion = "NL"
        setYoutubeTrendingRegion(youtubeTrendingRegion)
        handleYoutubeTrending()
    }
    const handleYoutubeTrendingWorldClick = () => {
        const youtubeTrendingRegion = ""
        setYoutubeTrendingRegion(youtubeTrendingRegion)
        handleYoutubeTrending()
    }


    return (
        <div className="flex">
            <Menu as="div" className="relative inline-block text-left mt-3">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        {contentType} 
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={handleTrendingClick}
                                    >
                                        <div className="flex">
                                            <TrendingUpIcon className="h-5 w-5" aria-hidden="true" />
                                            <h3 className="ml-3"> Trending </h3>
                                        </div>
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={handleNewestClick}
                                    >
                                        <div className="flex">
                                            <AccessTimeOutlined className="h-5 w-5" aria-hidden="true" />
                                            <h3 className="ml-3"> New </h3>
                                        </div>
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={handleHotClick}
                                    >
                                        <div className="flex">
                                            <WhatshotOutlined className="h-5 w-5" aria-hidden="true" />
                                            <h3 className="ml-3"> Hot </h3>
                                        </div>
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>

            <Menu as="div" className="relative inline-block text-left mt-3 m-2">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Youtube Trending ({youtubeTrendingRegion})
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                <button
                                    href="#"
                                    className={classNames('text-gray-700',
                                    'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                    onClick={handleYoutubeTrendingWorldClick}
                                >
                                    World
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                <button
                                    href="#"
                                    className={classNames('text-gray-700',
                                    'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                    onClick={handleYoutubeTrendingUSClick}
                                >
                                    USA (US)
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <button
                                    href="#"
                                    className={classNames('text-gray-700',
                                    'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                    onClick={handleYoutubeTrendingBDClick}
                                >
                                    Bangladesh (BD)
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <button
                                    href="#"
                                    className={classNames('text-gray-700',
                                    'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                    onClick={handleYoutubeTrendingGBClick}
                                >
                                    Great Britain (GB)
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <button
                                    href="#"
                                    className={classNames('text-gray-700',
                                    'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                    onClick={handleYoutubeTrendingINClick}
                                >
                                    India (IN)
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <button
                                    href="#"
                                    className={classNames('text-gray-700',
                                    'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                    onClick={handleYoutubeTrendingAUClick}
                                >
                                    Australia (AU)
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <button
                                    href="#"
                                    className={classNames('text-gray-700',
                                    'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                    onClick={handleYoutubeTrendingNLClick}
                                >
                                    Netherlands (NL)
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )    
}

export default FeedHeaderMenu;