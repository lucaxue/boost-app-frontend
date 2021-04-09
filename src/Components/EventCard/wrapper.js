import React from 'react';
import { Box, Center, Heading, HStack } from '@chakra-ui/react';

function EventCardWrapper({ shortDate, children, willAttend, ...props }) {
  return (
    <Center py={1}>
      <Box
        minW={['300px', '445px']}
        w="full"
        boxShadow="md"
        rounded="md"
        p={6}
        overflow={'hidden'}
        mx={1}
        border="0.3px solid lightgrey"
        bg="white"
        transition='0.2s'
        {...props}
      >
        <Box
          h={'10px'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
          bg={willAttend ? '#facd60' : 'gray.100'}
        ></Box>

        <HStack>
          <Heading fontSize="2xl">{shortDate}</Heading>
          {children}
        </HStack>
      </Box>
    </Center>
  );
}

export default EventCardWrapper;
