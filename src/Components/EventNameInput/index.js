import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

function EventNameInput({ dispatch, name }) {
  const setEventName = (e) => {
    dispatch({ type: 'SET_EVENT_NAME', payload: e.target.value });
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
