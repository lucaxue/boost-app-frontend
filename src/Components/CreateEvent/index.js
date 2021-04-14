import {
  Button,
  Grid,
  GridItem,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useUserContext } from "Libs/userContext";
import React, { useEffect, useReducer, useState } from "react";
import { postEvent } from "../../Libs/httpRequests";
import EventDescriptionInput from "../EventDescriptionInput";
import EventNameInput from "../EventNameInput";
import ExerciseDropdown from "../ExerciseDropdown";
import IntensityDropdown from "../IntensityDropdown";
import LocationMapPicker from "../LocationMapPicker";
import DateTimePicker from "../DateTimePicker";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

const initialEvent = {
  name: "",
  description: "",
  exerciseType: "",
  longitude: -1.8845,
  latitude: 52.4754,
  time: DateTime.now().toString().slice(0, -10),
  intensity: "",
  groupId: 2,
};

function reducer(event, action) {
  switch (action.type) {
    case "SET_EXERCISE":
      return { ...event, exerciseType: action.payload };
    case "SET_DATE_AND_TIME":
      return { ...event, time: action.payload };
    case "SET_LOCATION":
      return {
        ...event,
        longitude: action.payload.lng,
        latitude: action.payload.lat,
      };
    case "SET_INTENSITY":
      return {
        ...event,
        intensity: action.payload,
      };
    case "SET_EVENT_NAME":
      return {
        ...event,
        name: action.payload,
      };
    case "SET_EVENT_DESCRIPTION":
      return {
        ...event,
        description: action.payload,
      };
    case "SET_GROUP_ID":
      return {
        ...event,
        groupId: action.payload,
      };
    case "RESET":
      return initialEvent;
    default:
      return event;
  }
}

function CreateEvent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dbUser } = useUserContext();
  const [event, dispatch] = useReducer(reducer, initialEvent);
  const [postedEvent, setPostedEvent] = useState(initialEvent);
  const [toPost, setToPost] = useState(false);

  function handlePost() {
    // @ts-ignore
    dispatch({ type: "SET_GROUP_ID", payload: dbUser?.partOfGroupId });
    setToPost(true);
  }

  useEffect(() => {
    if (toPost) {
      postEvent(process.env.REACT_APP_BACKEND_URL, event, (eventPosted) => {
        setPostedEvent(eventPosted);
        onOpen();
        setToPost(false);
      });
    }
    // eslint-disable-next-line
  }, [toPost]);

  return (
    <Grid mt="15px" placeItems="center" minH="90vh" mb="100px" mx={1}>
      <Heading>Create Event</Heading>

      <Grid
        my={5}
        placeSelf="center"
        rounded="md"
        border="0.3px solid lightgrey"
        minW={["300px", "445px"]}
        maxW="445"
        w="full"
        placeItems="center"
        boxShadow="md"
        p={5}
      >
        <GridItem w="full">
          <EventNameInput dispatch={dispatch} name={event.name} />
          <EventDescriptionInput
            dispatch={dispatch}
            description={event.description}
          />
          <IntensityDropdown dispatch={dispatch} intensity={event.intensity} />
          <ExerciseDropdown
            dispatch={dispatch}
            exerciseType={event.exerciseType}
          />
          <DateTimePicker dispatch={dispatch} datetime={event.time} />
          <LocationMapPicker
            dispatch={dispatch}
            location={{ lat: event.latitude, lng: event.longitude }}
          />
        </GridItem>

        <Button
          textColor="black"
          w="full"
          colorScheme="boostyellow"
          isLoading={toPost}
          my={5}
          onClick={() => {
            handlePost();
          }}
        >
          Submit
        </Button>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{postedEvent.name} has been added to your group!</Text>
          </ModalBody>

          <ModalFooter>
            <Link to="/GroupFeed">
              <Button colorScheme="boostblue" mr={3} fontSize={[12, 16]}>
                Go to Feed Page
              </Button>
            </Link>
            <Button
              fontSize={[12, 16]}
              variant="ghost"
              onClick={() => {
                // @ts-ignore
                dispatch({ type: "RESET" });
                onClose();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Create Another Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
}

export default CreateEvent;
