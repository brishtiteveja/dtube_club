import React from "react";

import HeaderIcon from './HeaderIcon';
import {
    ChevronDownIcon,
    RefreshIcon,
} from "@heroicons/react/solid";

import {
    GridOnOutlined,
    ListOutlined,
    MenuOutlined,
} from "@mui/icons-material";

import FeedHeaderMenu from "./FeedHeaderMenu";

const FeedHeader = ( {setContent, setLayout}) => {

    // Layout controller
    const handleGridLayout = () => {
        console.log("grid")
        setLayout("grid");
    }

    const handleListLayout = () => {
        console.log("list")
        setLayout("list");
    }

    const handleBlogLayout = () => {
        console.log("blog")
        setLayout("blog");
    }

    return (
        <header className="flex flex-grow bg-white p-2 rounded-xl space-x-20 justify-end">
            {/* left */}
            <FeedHeaderMenu setContent={setContent}/>

            {/* center */}
            <div className="flex border-2 rounded-xl float-right">
                {/* Right */}
                <div className="flex items-center">
                    <HeaderIcon Icon={RefreshIcon} />
                </div>
            </div> 

            {/* right */}
            <div className="flex border-2 rounded-xl float-right">
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