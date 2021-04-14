import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  GridItem,
  Heading,
  HStack,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import Card from "Components/Card";
import { useUserContext } from "Libs/userContext";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { getAddress, updateUser } from "../../Libs/httpRequests";

function EventCard({
  name,
  time: dateTime,
  longitude,
  latitude,
  description,
  exerciseType,
  intensity,
  willAttend,
  id,
}) {
  const date = DateTime.fromISO(dateTime).toHTTP().slice(0, 17);
  const time = DateTime.fromISO(dateTime)
    .toLocaleString(DateTime.DATETIME_MED)
    .slice(13);
  const shortDate = date.slice(5, -6);

  const { dbUser, setDbUser } = useUserContext();

  const [toUpdateUser, setToUpdateUser] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(dbUser);

  const [address, setAddress] = useState({
    road: null,
    city: null,
    postcode: null,
  });

  function attendEvent() {
    setUserToUpdate({ ...dbUser, eventsIds: [...dbUser?.eventsIds, id] });
    setToUpdateUser(true);
  }

  useEffect(() => {
    if (toUpdateUser) {
      updateUser(
        process.env.REACT_APP_BACKEND_URL,
        dbUser?.id,
        userToUpdate,
        setDbUser
      );
    }
    // eslint-disable-next-line
  }, [toUpdateUser]);

  useEffect(() => {
    getAddress(
      process.env.REACT_APP_NOMINATIM_URL,
      latitude,
      longitude,
      setAddress
    );
    // eslint-disable-next-line
  }, []);

  return (
    <Card stripColor={willAttend ? "#facd60" : "gray.100"} p={6}>
      <HStack>
        <Heading fontSize="2xl">{shortDate}</Heading>

        <GridItem data-testid="eventcard" w="full">
          <Accordion allowToggle minW="full">
            <AccordionItem textAlign="center">
              <AccordionButton>
                <Box flex="1">
                  <Heading size="md" textAlign="center">
                    {name}
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel textAlign="left" pb={4}>
                <HStack>
                  <Heading size="xs" color="#1ac0c6">
                    DATE
                  </Heading>
                  <Text>{date}</Text>
                  <Heading size="xs" color="#1ac0c6">
                    AT
                  </Heading>
                  <Text>{time}</Text>
                </HStack>

                <Text data-testid="description" my={5}>
                  {description}
                </Text>
                <WrapItem>
                  <Text
                    data-testid="intensity"
                    fontWeight={500}
                    fontSize="md"
                    color="gray.400"
                  >
                    <span className="material-icons">moving</span>{" "}
                    {intensity.toUpperCase()}
                  </Text>
                </WrapItem>
                <WrapItem>
                  <Text
                    data-testid="exerciseType"
                    fontWeight={500}
                    fontSize="md"
                    color="gray.400"
                  >
                    <span className="material-icons">fitness_center</span>
                    {" " + exerciseType.toUpperCase()}
                  </Text>
                </WrapItem>

                <Text
                  data-testid="address"
                  fontWeight={500}
                  fontSize="md"
                  color="gray.400"
                >
                  <span className="material-icons">place</span> {address.road},{" "}
                  {address.city}, {address.postcode}
                </Text>
                <Box textAlign="right">
                  <Button
                    colorScheme="boostblue"
                    onClick={attendEvent}
                    display={willAttend ? "none" : null}
                  >
                    Attend
                  </Button>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
      </HStack>
    </Card>
  );
}
export default EventCard;
