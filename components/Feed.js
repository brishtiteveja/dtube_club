/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRef, useState } from "react";

import { Box, Center, Heading, SimpleGrid } from '@chakra-ui/layout';
import Link from "next/link"
import {Geographies, Geography, SimpleMap, ComposableMap, ZoomableGroup } from 'react-simple-maps'

import { FlashOn } from "@mui/icons-material";

function Feed({ videos, layout }) {
  const [loading, setLoading] = useState(true);
  const gridIframe = useRef(null);

  const videoSl = videos
  console.log(videos)
  const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const getTimeDuration = (dur) => {
    var v = dur / 60
    var h, m, s, t 
    if (v >=60) {
      h = m / 60
      h = h.toFixed(0)
      m = h / 60
      m = m.toFixed(0)
      s = h % 60
      s = s.toFixed(0)

      t = h + ":" + m + ":" + s 
    } else {
      // m = v
      // m = m.toFixed(0)
      // s = v % 60
      // s = s.toFixed(1)

      // t = m + ":" + s 
      t = new Date(dur * 1000).toISOString().substring(14, 19)
    }

    return t

  }

  const getThumbnailUrl = (video) => {
    if (!video || !video.json)
        return ''
    if (video.json.thumbnailUrl)
        return video.json.thumbnailUrl
    if (video.json.files && video.json.files.btfs && video.json.files.btfs.img && video.json.files.btfs.img["118"])
        return 'https://btfs.d.tube/btfs/' + video.json.files.btfs.img["118"]
    if (video.json.files && video.json.files.ipfs && video.json.files.ipfs.img && video.json.files.ipfs.img["118"])
        return 'https://snap1.d.tube/ipfs/' + video.json.files.ipfs.img["118"]
    if (video.json.files && video.json.files.youtube)
        return 'https://i.ytimg.com/vi/' + video.json.files.youtube + '/mqdefault.jpg'
  
    if (video.json.ipfs && video.json.ipfs.snaphash) return 'https://snap1.d.tube/ipfs/' + video.json.ipfs.snaphash
    if (video.json.info && video.json.info.snaphash) return 'https://snap1.d.tube/ipfs/' + video.json.info.snaphash
        // console.log('Found video with no thumbnail!!', video)
    return ''
  }

  return (
    <div className="flex-grow h-screen ml-10 mr-10 pl-10 pr-10 overflow-y-auto scrollbar-hide">
      <div className="mx-auto"> 
        {
          (
            () => {
              if (videoSl && videoSl.items) {
                return (
                  <div>
                    <SimpleGrid 
                      columns={4} 
                      spacingx='100px'
                      className="p-5 mt-5 bg-white rounded-2xl shadow-md"
                    >
                      {videoSl.items.map(video => (
                          <div 
                            key={video.id}
                            className="p-5 m-5 bg-white rounded-2xl shadow-md"
                          >
                            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
                              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                              <h3>{video.snippet.title}</h3>
                              {/* <p>{video.snippet.description}</p> */}
                            </a>
                          </div>
                      ))}
                    </SimpleGrid>

                    <ComposableMap
                      onClick={(event) => {
                        console.log(event)
                      }}
                    >
                      <ZoomableGroup center={[0, 0]} zoom={1}>
                        <Geographies geography={geoUrl}>
                          {({ geographies }) =>
                            geographies.map((geo) => (
                              <Geography key={geo.rsmKey} geography={geo} />
                            ))
                          }
                        </Geographies>
                      </ZoomableGroup>
                    </ComposableMap>
                  </div>
                )
              }
              else if (layout === 'grid') {
                return(
                  <Box
                    width="100%" mx="auto" my={4}
                  >
                    <SimpleGrid 
                      columns={4} 
                      spacingx='100px'
                    >
                      {videoSl &&
                        videoSl.map((video) => {
                          return (
                            <Box 
                              className="cursor-pointer overflow-x p-3 transition duration-200 transform ease-in 
                                          hover:scale-110 rounded-2xl"
                              key={video._id} 
                            >
                              {/* videosnap */}
                              <div className="flex flex-col">
                                  <div>
                                      {/* videosnaplink */}
                                      {/* <a href={`https://d.tube/#!/v/${video._id}`} target="_blank" rel="noreferrer" > */}
                                      <Link href={{
                                          pathname: `/v/[author]/[id]`,
                                          query: {
                                            id: video._id, // pass the id 
                                            author: video.author,
                                            link: video.link
                                          },
                                        }}
                                        as={`/v/${video._id}`} key={video._id}>
                                        {/* videosnapimage */}
                                        <div className="flex-col">
                                            <img 
                                              src={getThumbnailUrl(video)}
                                              className="flex rounded-2xl m-5"
                                              alt="image"
                                              height="400"
                                              width="400"
                                            />

                                            <div>
                                            <span className="absolute -mt-14  ml-10 bg-black opacity-50 text-white p-0.5 rounded-sm">
                                              { getTimeDuration(video.json.dur) }
                                            </span>

                                            <span className="absolute -mt-14  ml-56 bg-black opacity-50 text-white p-0.5 rounded-sm">
                                              <FlashOn className="scale-75" /> { (video.votes.reduce((a, c) => ({ vt: a.vt + c.vt })).vt / 1000000).toFixed(1) } M
                                            </span>

                                            </div>

                                        </div>
                                      </Link>
                                      {/* </a> */}
                                      {/* video title */}
                                      <div className="ml-6 -mt-5 max-w-sm">
                                        <span className="font-semibold font-sans"> {video.json.title} </span>
                                      </div>
                                  </div>

                                  {/* video author */}
                                  <div>
                                    <a href={`https://d.tube/#!/c/${video.author}`} target="_blank" rel="noreferrer" >
                                      <div className="ml-6">
                                        <span className="font-light text-slate-400"> {video.author} </span>
                                      </div>
                                    </a>
                                  </div>
                              </div>
                            </Box>
                          );
                        })
                      }
                    </SimpleGrid>
                  </Box>
                )
              } else if (layout === 'list') {
                return(
                  <Box
                    width="100%" mx="auto" my={2}
                  >
                    <SimpleGrid 
                      columns={2} 
                      spacingx='100px'
                    >
                      {videoSl &&
                        videoSl.map((video) => {
                          return (
                            <Box 
                              className="cursor-pointer overflow-x p-3 transition duration-200 transform ease-in 
                                          hover:scale-110 rounded-2xl"
                              key={video._id} 
                            >
                              {/* videosnap */}
                              <div className="flex flex-col">
                                  <div>
                                      {/* videosnaplink */}
                                      <a href={`https://d.tube/#!/v/${video._id}`} target="_blank" rel="noreferrer" >
                                        {/* videosnapimage */}
                                        <img 
                                          src={getThumbnailUrl(video)}
                                          className="flex rounded-2xl m-5"
                                          alt="image"
                                          height="400"
                                          width="400"
                                        />
                                      </a>
                                      {/* video title */}
                                      <div className="ml-6 -mt-5 max-w-sm">
                                        <span className="font-semibold font-sans"> {video.json.title} </span>
                                      </div>
                                  </div>

                                  {/* video author */}
                                  <div>
                                    <a href={`https://d.tube/#!/c/${video.author}`} target="_blank" rel="noreferrer" >
                                      <div className="ml-6">
                                        <span className="font-light text-slate-400"> {video.author} </span>
                                      </div>
                                    </a>
                                  </div>
                              </div>
                            </Box>
                          );
                        })
                      }
                    </SimpleGrid>
                  </Box>
                )
              } else if (layout === 'blog') {
                return(
                  <Box
                    width="100%" mx="auto" my={1}
                  >
                    <SimpleGrid 
                      columns={1} 
                      spacingx='100px'
                    >
                      {videoSl &&
                        videoSl.map((video) => {
                          return (
                            <Box 
                              className="cursor-pointer overflow-x p-3 transition duration-200 transform ease-in 
                                          hover:scale-110 rounded-2xl "
                              key={video._id} 
                            >
                              {/* videosnap */}
                              <div className="flex flex-col float-right">
                                  {/* videosnaplink */}
                                  <div>
                                      <a href={`https://d.tube/#!/v/${video._id}`} target="_blank" rel="noreferrer" >
                                        {/* videosnapimage */}
                                        <img 
                                          src={getThumbnailUrl(video)}
                                          className="flex rounded-2xl m-5"
                                          alt="image"
                                          height="400"
                                          width="400"
                                        />
                                      </a>
                                  </div>

                                  {/* video title */}
                                  <div className="ml-6 -mt-5 max-w-sm">
                                    <span className="font-semibold font-sans flex-wrap"> {video.json.title} </span>
                                  </div>

                                  {/* video author */}
                                  <div className="ml-6">
                                    <span className="font-light text-slate-600"> {video.author} </span>
                                  </div>
                              </div>
                            </Box>
                          );
                        })
                      }
                    </SimpleGrid>
                  </Box>
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


// import React, { useEffect } from "react";
// import { useRef, useState } from "react";

// import FeedGridView from "./FeedViews/FeedGridView";
// import FeedBlogView from "./FeedViews/FeedBlogView";
// import FeedListView from "./FeedViews/FeedListView";


// function Feed({ videos, layout }) {
//   const [loading, setLoading] = useState(true);
//   const gridIframe = useRef(null);

//   const videoSl = videos.slice(0,20)

//   return (
//     <div className="flex-grow h-screen pb-44 pt-6 ml-20 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
//       <div className="mx-auto "> 
//       {/* max-w-md md:max-w-lg lg:max-w-2xl */}

//         {
//           (
//             () => {
//               if (layout === 'grid') {
//                 return(
//                   <FeedGridView videos={videoSl} />
//                 )
//               } else if (layout === 'list') {
//                 return(
//                   <FeedListView videos={videoSl} />
//                 )
//               } else if (layout === 'blog') {
//                 return(
//                   <FeedBlogView videos={videoSl} />
//                 )
//               }
//             }
//           )()
//         }
        
//       </div>
//     </div>
//   );
// }

// export default Feed;

