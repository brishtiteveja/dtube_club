import React, { useEffect } from "react";
import { useRef, useState } from "react";

import FeedGridView from "./FeedViews/FeedGridView";
import FeedBlogView from "./FeedViews/FeedBlogView";
import FeedListView from "./FeedViews/FeedListView";


function Feed({ videos, layout }) {
  const [loading, setLoading] = useState(true);
  const gridIframe = useRef(null);

  const videoSl = videos.slice(0,20)

  return (
    <div className="flex-grow h-screen pb-44 pt-6 ml-20 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
      <div className="mx-auto "> 
      {/* max-w-md md:max-w-lg lg:max-w-2xl */}

        {
          (
            () => {
              if (layout === 'grid') {
                return(
                  <FeedGridView videos={videoSl} />
                )
              } else if (layout === 'list') {
                return(
                  <FeedListView videos={videoSl} />
                )
              } else if (layout === 'blog') {
                return(
                  <FeedBlogView videos={videoSl} />
                )
              }
            }
          )()
        }
        
      </div>
    </div>
  );
}

export default Feed;
