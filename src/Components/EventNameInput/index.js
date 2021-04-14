import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { SET_EVENT_NAME } from 'Reducers/eventToPost/eventToPost.actions';

function EventNameInput({ dispatch, name }) {
  const setEventName = (e) => {
    dispatch({ type: SET_EVENT_NAME, payload: e.target.value });
  };
  return (
    <FormControl padding="5px 0" isRequired>
      <FormLabel>Event name</FormLabel>
      <Input
        value={name}
        placeholder="Enter event name"
        onChange={setEventName}
      />
    </FormControl>
  );
}

export default EventNameInput;
