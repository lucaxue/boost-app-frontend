import {
  Button,
  Grid,
  GridItem,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { useUserContext } from 'Libs/userContext';
import React, { useEffect, useReducer, useState } from 'react';
import { postEvent } from '../../Libs/httpRequests';
import DateAndTimePickers from '../DateAndTimePicker';
import EventDescriptionInput from '../EventDescriptionInput';
import EventNameInput from '../EventNameInput';
import ExerciseDropdown from '../ExerciseDropdown';
import IntensityDropdown from '../IntensityDropdown';
import LocationMapPicker from '../LocationMapPicker';

const initialEvent = {
  name: '',
  description: '',
  exerciseType: '',
  longitude: 0,
  latitude: 0,
  time: '0',
  intensity: '',
  groupId: 2,
};

function reducer(event, action) {
  switch (action.type) {
    case 'SET_EXERCISE':
      return { ...event, exerciseType: action.payload };
    case 'SET_DATE_AND_TIME':
      return { ...event, time: action.payload };
    case 'SET_LOCATION':
      return {
        ...event,
        longitude: action.payload.lng,
        latitude: action.payload.lat,
      };
    case 'SET_INTENSITY':
      return {
        ...event,
        intensity: action.payload,
      };
    case 'SET_EVENT_NAME':
      return {
        ...event,
        name: action.payload,
      };
    case 'SET_EVENT_DESCRIPTION':
      return {
        ...event,
        description: action.payload,
      };
    case 'SET_GROUP_ID':
      return {
        ...event,
        groupId: action.payload,
      };
    default:
      return event;
  }
}

function CreateEvent() {
  const { dbUser } = useUserContext();
  const [event, dispatch] = useReducer(reducer, initialEvent);
  const [postedEvent, setPostedEvent] = useState(initialEvent);
  const [toPost, setToPost] = useState(false);

  function handlePost() {
    // @ts-ignore
    dispatch({ type: 'SET_GROUP_ID', payload: dbUser?.partOfGroupId });
    setToPost(true);
  }

  useEffect(() => {
    if (toPost) {
      postEvent(process.env.REACT_APP_BACKEND_URL, event, setPostedEvent);
    }
    // eslint-disable-next-line
  }, [toPost]);

  return (
    <Grid mt="15px" placeItems="center" minH="90vh" mb="100px" mx={1}>
      <Heading>Create Event</Heading>

      <Grid
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
          <EventNameInput dispatch={dispatch} />
          <EventDescriptionInput dispatch={dispatch} />
          <IntensityDropdown dispatch={dispatch} />
          <ExerciseDropdown dispatch={dispatch} />
          <DateAndTimePickers dispatch={dispatch} />
          <LocationMapPicker dispatch={dispatch} />
        </GridItem>

        <Popover>
          <PopoverTrigger>
            <Button mt={5} bg="#facd60" onClick={handlePost}>
              Submit
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              You have added an event called {postedEvent.name}!
            </PopoverHeader>
            <PopoverBody>Click on the feed to view this event</PopoverBody>
          </PopoverContent>
        </Popover>
      </Grid>
    </Grid>
  );
}

export default CreateEvent;
