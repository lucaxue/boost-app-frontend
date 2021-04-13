import React from 'react';
import { Box, Center } from '@chakra-ui/react';

function Card({ children, stripColor = null, ...props }) {
  return (
    <Center>
      <Box
        placeItems="center"
        bg="white"
        border="0.3px solid lightgrey"
        boxShadow="md"
        rounded="md"
        overflow="hidden"
        minW={['300px', '445px']}
        w="full"
        m={1}
        {...props}
      >
        {stripColor && (
          <Box
            h={'10px'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}
            bg={stripColor}
          ></Box>
        )}
        {children}
      </Box>
    </Center>
  );
}

export default Card;
