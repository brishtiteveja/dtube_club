import React from "react"
import {useState} from "react"

import { useEffect } from 'react'

import HeaderIcon from './HeaderIcon'
import {
    ChevronDownIcon,
    RefreshIcon,
} from "@heroicons/react/solid"

import {
    GridOnOutlined,
    ListOutlined,
    MenuOutlined,
} from "@mui/icons-material"

import FeedHeaderMenu from "./FeedHeaderMenu"
import axios from "axios"

const FeedHeader = ( {contentType, setContentType, setContent, setLayout}) => {
    // Layout controller
    const handleGridLayout = () => {
        setLayout("grid");
    }

    const handleListLayout = () => {
        setLayout("list");
    }

    const handleBlogLayout = () => {
        setLayout("blog");
    }

    const handleReloadContent = () => {
        const AVALON_API_URL =  "https://avalon.d.tube/"
        const REQUEST_URL = `${AVALON_API_URL}${contentType}`

        axios.get(REQUEST_URL).then(function (response) {
            setContent(response.data)
        });
    }

    return (
        <header className="flex flex-grow h-10 md:h-16 bg-white p-2 rounded-xl space-x-20 justify-end">
            {/* left */}
            <FeedHeaderMenu contentType={contentType} setContentType={setContentType} setContent={setContent}/>

            {/* center */}
            <div className="flex md:border-2 md:rounded-xl float-right">
                {/* Right */}
                <div className="flex items-center">
                    <HeaderIcon Icon={RefreshIcon} onClick={handleReloadContent}/>
                </div>
            </div> 

            {/* right */}
            <div className="flex md:border-2 md:rounded-xl float-right">
                {/* Right */}
                <div className="flex items-center space-x-4">
                    <HeaderIcon Icon={GridOnOutlined} onClick={handleGridLayout}/>
                    <HeaderIcon Icon={ListOutlined} onClick={handleListLayout} />
                    <HeaderIcon Icon={MenuOutlined} onClick={handleBlogLayout}/>
                </div>
            </div>
        </header>
    )
}

export default FeedHeader;