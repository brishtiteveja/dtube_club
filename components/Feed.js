import React, { useEffect } from "react";
import { useRef, useState } from "react";

import { Box, Center, Heading,SimpleGrid } from '@chakra-ui/layout';


function Feed({ videos, layout }) {
  const [loading, setLoading] = useState(true);
  const gridIframe = useRef(null);

  const videoSl = videos.slice(0,20)

  // useEffect( () => {
  //   const player = new playerjsdyn.playerjs.Player('iframe')
  //   console.log(player)
  // })


  return (
    <div className="flex-grow h-screen pb-44 pt-6 ml-20 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
      <div className="mx-auto "> 
      {/* max-w-md md:max-w-lg lg:max-w-2xl */}

        {
          (
            () => {
              if (layout === 'grid') {
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
                              <iframe 
                                key={video._id}
                                src={`https://emb.d.tube/#!/${video._id}`}
                                // className="flex"
                                frameBorder='0'
                                allow='autoplay; encrypted-media'
                                title={video.json.title}
                                // onLoad={handleIframe}
                              />
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
                              <iframe 
                                key={video._id}
                                src={`https://emb.d.tube/#!/${video._id}`}
                                className="flex h-30 float-right"
                                frameBorder='0'
                                allow='autoplay; encrypted-media'
                                title={video.json.title}
                                // onLoad={handleIframe}
                              />
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
                                          hover:scale-110 rounded-2xl"
                              key={video._id} 
                            >
                              <iframe 
                                key={video._id}
                                src={`https://emb.d.tube/#!/${video._id}`}
                                className="flex h-30 p-5 float-right"
                                frameBorder='0'
                                allow='autoplay; encrypted-media'
                                title={video.json.title}
                                // onLoad={handleIframe}
                              />
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

