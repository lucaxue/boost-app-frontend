import React, { useEffect, useState } from 'react';
import {
  Heading,
  Grid,
  GridItem,
  Text,
  Center,
  Box,
  Button,
} from '@chakra-ui/react';
import EventCard from '../EventCard/index';
import { getEventsByGroupId } from '../../Libs/httpRequests';
import { useUserContext } from 'Libs/userContext';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

function GroupFeed() {
  const [groupEvents, setGroupEvents] = useState([]);
  const [eventsWillNotAttend, setEventsWillNotAttend] = useState([]);
  const { dbUser, eventsWillAttend, userToDisplay } = useUserContext();
  console.log(groupEvents);
  useEffect(() => {
    getEventsByGroupId(
      process.env.REACT_APP_BACKEND_URL,
      dbUser?.partOfGroupId,
      setGroupEvents
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setEventsWillNotAttend(
      groupEvents
        .filter((event) => DateTime.fromISO(event.time) > DateTime.now())
        .filter((event) => !dbUser?.eventsIds.includes(event.id))
    );
    // eslint-disable-next-line
  }, [groupEvents, eventsWillAttend]);

  return (
    <Center>
      <Grid mt="15px" placeItems="center"   mb="100px" mx={1}>
        <Heading>Group Feed</Heading>
        <Heading size="md" my={1} color="gray.400">{userToDisplay.group}</Heading>
        {eventsWillAttend.length !== 0 || eventsWillNotAttend.length !== 0 ? (
          <>
            <GridItem py={5} w="full">
              <Heading ml={2} size="md" color="black">
                Attending Events
              </Heading>
              {eventsWillAttend.length !== 0 ? (
                eventsWillAttend.map((event) => (
                  <EventCard {...event} key={event.id} willAttend={true} />
                ))
              ) : (
                <Center>
                  <Box
                    placeItems="center"
                    p={5}
                    bg="white"
                    minW={['300px', '445px']}
                    w="full"
                    border="0.3px solid lightgrey"
                    boxShadow="md"
                    rounded="md"
                    overflow="hidden"
                    mx={1}
                  >
                    <Text>You are attending no events.</Text>
                  </Box>
                </Center>
              )}
            </GridItem>
            <GridItem py={5} w="full">
              <Heading ml={2} size="md" color="black">
                Other Events
              </Heading>
              <Box w="full">
                {eventsWillNotAttend.length !== 0 ? (
                  eventsWillNotAttend.map((event) => (
                    <EventCard {...event} key={event.id} willAttend={false} />
                  ))
                ) : (
                  <Center>
                    <Box
                      placeItems="center"
                      p={5}
                      bg="white"
                      minW={['300px', '445px']}
                      w="full"
                      border="0.3px solid lightgrey"
                      boxShadow="md"
                      rounded="md"
                      overflow="hidden"
                      mx={1}
                    >
                      <Text>No other events</Text>
                    </Box>
                  </Center>
                )}
              </Box>
            </GridItem>
          </>
        ) : (
          <Grid
            placeItems="center"
            p={5}
            bg="white"
            minW={['275px', '445px']}
            maxW="445px"
            w="full"
            border="0.3px solid lightgrey"
            boxShadow="md"
            rounded="md"
            overflow="hidden"
            mx={1}
          >
            <Heading size="sm" mb={5}>
              You have no events.
            </Heading>
            <Link to="/CreateEvent">
              <Button>Add a new event</Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </Center>
  );
}

export default GroupFeed;
