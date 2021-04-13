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
import Card from 'Components/Card';

function GroupFeed() {
  const [groupEvents, setGroupEvents] = useState([]);
  const [eventsWillNotAttend, setEventsWillNotAttend] = useState([]);
  const { dbUser, eventsWillAttend, userToDisplay } = useUserContext();

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
      <Grid
        w="full"
        maxW="445px"
        mt="15px"
        placeItems="center"
        mb="100px"
        mx={1}
      >
        <Heading>Group Feed</Heading>
        <Heading size="md" my={1} color="gray.400">
          {userToDisplay.group}
        </Heading>
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
                <Card p={5}>
                  <Text>You are attending no events.</Text>
                </Card>
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
                  <Card p={5}>
                    <Text>No other events</Text>
                  </Card>
                )}
              </Box>
            </GridItem>
          </>
        ) : (
          <Card p={5}>
            <Heading textAlign="center" size="sm" mb={5}>
              You have no events.
            </Heading>
            <Box textAlign="center">
              <Link to="/CreateEvent">
                <Button>Add a new event</Button>
              </Link>
            </Box>
          </Card>
        )}
      </Grid>
    </Center>
  );
}

export default GroupFeed;
