import React from 'react';
import { Box, Center, Heading,SimpleGrid } from '@chakra-ui/layout';
import Image from 'next/image';

const FeedGridView = ({ videos }) => {

    console.log(videos[0])

    return (
        <Box
            width="100%" mx="auto" my={4}
            >
            <SimpleGrid 
                columns={4} 
                spacingx='100px'
            >
                {videos &&
                videos.map((video) => {
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
                        {/* <Image 
                            src={video.json.thumbnailUrl == ""?video.json.thumbnailUrl : video.json.thumbnailUrlExternal}
                            alt="image"
                            height={400}
                            width={400}
                            objectFit="contain"
                        /> */}
                    </Box>
                    );
                })
                }
            </SimpleGrid>
        </Box>
    )
}

export default FeedGridView;