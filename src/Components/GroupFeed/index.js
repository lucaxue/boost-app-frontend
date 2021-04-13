import React, { useEffect, useState } from "react";
import { Heading, Grid, GridItem, Text, Center, Box } from "@chakra-ui/react";
import EventCard from "../EventCard/index";
import { getEventsByGroupId } from "../../Libs/httpRequests";
import { useUserContext } from "Libs/userContext";
import { DateTime } from "luxon";

function GroupFeed() {
  const [groupEvents, setGroupEvents] = useState([]);
  const [eventsWillNotAttend, setEventsWillNotAttend] = useState([]);
  const { dbUser, eventsWillAttend } = useUserContext();
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
      <Grid
        mt="15px"
        placeItems="center"
        minH="60vh"
        mb="100px"
        maxW="445"
        w="full"
      >
        <Heading>Group Feed</Heading>
        {eventsWillAttend.length !== 0 && eventsWillNotAttend.length !== 0 ? (
          <>
            <GridItem py={5} w="full">
              <Heading ml={2} size="md" color="black">
                Attending Events
              </Heading>
              {eventsWillAttend.map((event) => (
                <EventCard {...event} key={event.id} willAttend={true} />
              ))}
            </GridItem>
            <GridItem py={5} w="full">
              <Heading ml={2} size="md" color="black">
                Other Events
              </Heading>
              <Box w="full">
                {eventsWillNotAttend.map((event) => (
                  <EventCard {...event} key={event.id} willAttend={false} />
                ))}
              </Box>
            </GridItem>
          </>
        ) : (
          <Text>You have no events</Text>
        )}
      </Grid>
    </Center>
  );
}

export default GroupFeed;
