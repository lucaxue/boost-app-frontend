import React, { useEffect, useReducer, useState } from 'react';
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
} from '@chakra-ui/react';
import { useUserContext } from 'Libs/userContext';
import { postEvent } from 'Libs/httpRequests';
import EventDescriptionInput from '../EventDescriptionInput';
import EventNameInput from '../EventNameInput';
import ExerciseDropdown from '../ExerciseDropdown';
import IntensityDropdown from '../IntensityDropdown';
import LocationMapPicker from '../LocationMapPicker';
import DateTimePicker from '../DateTimePicker';
import { Link } from 'react-router-dom';
import * as actionTypes from 'Reducers/eventToPost/eventToPost.actions';
import {
  initialEventToPost,
  reducer,
} from 'Reducers/eventToPost/eventToPost.reducer';

function CreateEvent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dbUser } = useUserContext();
  const [eventToPost, dispatch] = useReducer(reducer, initialEventToPost);
  const [postedEvent, setPostedEvent] = useState(initialEventToPost);
  const [toPost, setToPost] = useState(false);

  function handlePost() {
    // @ts-ignore
    dispatch({
      type: actionTypes.SET_GROUP_ID,
      payload: dbUser?.partOfGroupId,
    });
    setToPost(true);
  }

  useEffect(() => {
    if (toPost) {
      postEvent(
        process.env.REACT_APP_BACKEND_URL,
        eventToPost,
        (eventPosted) => {
          setPostedEvent(eventPosted);
          onOpen();
          setToPost(false);
        }
      );
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
        minW={['300px', '445px']}
        maxW="445"
        w="full"
        placeItems="center"
        boxShadow="md"
        p={5}
      >
        <GridItem w="full">
          <EventNameInput dispatch={dispatch} name={eventToPost.name} />
          <EventDescriptionInput
            dispatch={dispatch}
            description={eventToPost.description}
          />
          <IntensityDropdown
            dispatch={dispatch}
            intensity={eventToPost.intensity}
          />
          <ExerciseDropdown
            dispatch={dispatch}
            exerciseType={eventToPost.exerciseType}
          />
          <DateTimePicker dispatch={dispatch} datetime={eventToPost.time} />
          <LocationMapPicker
            dispatch={dispatch}
            location={{ lat: eventToPost.latitude, lng: eventToPost.longitude }}
          />
        </GridItem>

        <Button
          w="full"
          isLoading={toPost}
          my={5}
          bg="#facd60"
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
              <Button colorScheme="blue" mr={3} fontSize={[12, 16]}>
                Go to Feed Page
              </Button>
            </Link>
            <Button
              fontSize={[12, 16]}
              variant="ghost"
              onClick={() => {
                // @ts-ignore
                dispatch({ type: actionTypes.RESET });
                onClose();
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
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
