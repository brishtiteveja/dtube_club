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
  //console.log(videos)
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
      try {
        t = new Date(dur * 1000).toISOString().substring(14, 19)
      } catch (e) {
        console.log("Couldn't convert")
      }
    }

    if (t.includes("NaN:NaN")) {
      t = "\"\""
    }

    return t

  }

  const getVotes = (votes) => {
    let vt = votes.reduce((a, c) => ({ vt: a.vt + c.vt })).vt / 1000000
    let v = vt.toFixed(1)
    if (v === "0.0" || v === "-0.0") {
      return "0"
    }

    return v
  }

  const getThumbnailUrl = (video) => {
    if (!video || !video.json)
      return 'assets/DTube_files/images/DTube_Black.svg'
    if (video.json.thumbnailUrl) {
      if (!video.json.thumbnailUrl.includes('btfs') || 
          !video.json.thumbnailUrl.includes('ipfs') || 
          !video.json.thumbnailUrl.includes('youtube') ) { 
        return 'assets/DTube_files/images/DTube_Black.svg'
      }
    }

    if (video.json.files && video.json.files.btfs && video.json.files.btfs.img && video.json.files.btfs.img["118"])
        return 'https://btfs.d.tube/btfs/' + video.json.files.btfs.img["118"]
    if (video.json.files && video.json.files.ipfs && video.json.files.ipfs.img && video.json.files.ipfs.img["118"])
        return 'https://snap1.d.tube/ipfs/' + video.json.files.ipfs.img["118"]
    if (video.json.files && video.json.files.youtube)
        return 'https://i.ytimg.com/vi/' + video.json.files.youtube + '/mqdefault.jpg'
  
    if (video.json.ipfs && video.json.ipfs.snaphash) return 'https://snap1.d.tube/ipfs/' + video.json.ipfs.snaphash
    if (video.json.info && video.json.info.snaphash) return 'https://snap1.d.tube/ipfs/' + video.json.info.snaphash
        // console.log('Found video with no thumbnail!!', video)
    return 'assets/DTube_files/images/DTube_Black.svg'
  }

  return (
    <div className="flex-grow h-screen ml-0 md:ml-10 mr-10 pl-0 md:pl-10 pr-0 md:pr-10 overflow-y-auto scrollbar-hide">
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
                    <SimpleGrid 
                      columns={ {base: 2, sm: 2, md: 4, lg: 6} }
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
                                              className="flex rounded-2xl m-5 h-[100px] sm:h-[100px] md:h-[150px]"
                                              alt="image"
                                              width="400"
                                            />

                                            <div className="flex-auto">
                                              <span className="absolute -mt-14 md:-mt-14  ml-6 md:ml-8 h-6 bg-black opacity-50 text-white text-sm p-0.5 rounded-sm">
                                                { getTimeDuration(video.json.dur) }
                                              </span>

                                              <span className="hidden lg:block absolute -mt-14 lg:ml-36 h-6 bg-black opacity-50 text-white text-sm p-0.5 rounded-sm truncate">
                                                <FlashOn className="scale-75" /> { getVotes(video.votes) } M
                                              </span>

                                            </div>

                                        </div>
                                      </Link>
                                      {/* </a> */}
                                      {/* video title */}
                                      <div className="ml-6 -mt-5 max-w-sm">
                                        <span className="font-semibold font-sans line-clamp-2 sm:line-clamp-1 lg:line-clamp-2"> {video.json.title} </span>
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
                                          className="flex rounded-2xl m-5 sm:h-[100px] lg:h-[200px] sm:w-[200px] lg:w-[400px]"
                                          alt="Dtube"
                                        />
                                      </a>
                                      {/* video title */}
                                      <div className="ml-6 -mt-5 max-w-sm">
                                        <span className="font-semibold font-sans line-clamp-2 sm:line-clamp-1 lg:line-clamp-2"> {video.json.title} </span>
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
                                          className="flex rounded-2xl m-5 h-56"
                                          alt="image"
                                          height="400"
                                          width="400"
                                        />
                                      </a>
                                  </div>

                                  {/* video title */}
                                  <div className="ml-6 -mt-5 max-w-sm">
                                    <span className="font-semibold font-sans flex-wrap line-clamp-2 sm:line-clamp-1 lg:line-clamp-2"> {video.json.title} </span>
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

