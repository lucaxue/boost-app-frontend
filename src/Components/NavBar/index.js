import React from 'react';

import NavLink from '../NavLink';
import { Flex } from '@chakra-ui/react';

function NavBar() {
  return (
    <Flex
      position="fixed"
      bottom={[0, 0, 0, null]}
      top={[null, null, null, 0]}
      textColor="white"
      flexDirection={['row', 'row', 'row', 'column']}
      justifyContent={[
        'space-between',
        'space-between',
        'space-between',
        'left',
      ]}
      w={['100%', '100%', '100%', '10%']}
      h={['max-content', 'max-content', 'max-content', '100vh']}
      bg="#1AC0C6"
    >
      <NavLink to="/">Profile</NavLink>
      <NavLink to="/CreateEvent">Create Event</NavLink>
      <NavLink to="/GroupFeed">Group Feed</NavLink>
    </Flex>
  );
}

export default NavBar;
