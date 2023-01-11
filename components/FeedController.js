import React from 'react';
import { useState } from 'react';

import Feed from './Feed';
import FeedHeader from './FeedHeader';

const FeedController = ({ videos }) => {
    const [contentType, setContentType] = useState("Trending")
    const [content, setContent] = useState(videos)
    const [layout, setLayout] = useState("grid")

    return (
        <div className="flex-col items-center">
            <FeedHeader contentType={contentType} setContentType={setContentType} setContent={setContent} setLayout={setLayout}  />
            <Feed videos={content} layout={layout} />
        </div>
        
    )
}

export default FeedController;