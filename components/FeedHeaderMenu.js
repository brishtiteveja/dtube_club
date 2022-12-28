import react from "react";
import {
    ChevronDownIcon,
} from "@heroicons/react/solid";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import axios from 'axios';

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const FeedHeaderMenu = ({ setContent }) => {
    const AVALON_API_URL =  "https://avalon.d.tube/"

    // use timer to fetch data, otherwise use already fetched content
    const trendingContent = []
    const hotContent = []
    const newContent = []

    const handleTrendingClick = () => {
        const contentType = "trending"
        const REQUEST_URL = `${AVALON_API_URL}${contentType}`

        axios.get(REQUEST_URL).then(function (response) {
            trendingContent = response.data
            setContent(response.data)
        });
    }

    const handleHotClick = () => {
        const contentType = "hot"
        const REQUEST_URL = `${AVALON_API_URL}${contentType}`

        axios.get(REQUEST_URL).then(function (response) {
            hotContent = response.data
            setContent(response.data);
        });
    }

    const handleNewestClick = () => {
        const contentType = "new";
        const REQUEST_URL = `${AVALON_API_URL}${contentType}`

        axios.get(REQUEST_URL).then(function (response) {
            newContent = response.data
            setContent(response.data);
        });
    }

    return (
        <Menu as="div" className="relative inline-block text-left mt-3">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Filters 
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
                                    Trending
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
                                    New Releases
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
                                    Hot Videos
                                </a>
                            )}
                        </Menu.Item>
                        <form method="POST" action="#">
                        <Menu.Item>
                            {({ active }) => (
                            <button
                                type="submit"
                                className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full px-4 py-2 text-left text-sm'
                                )}
                            >
                                Your Subscriptions
                            </button>
                            )}
                        </Menu.Item>
                        </form>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )    
}

export default FeedHeaderMenu;