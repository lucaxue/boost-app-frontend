import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import React from 'react';

function EventDescriptionInput({ dispatch, description }) {
  const setEventDescription = (e) => {
    dispatch({ type: 'SET_EVENT_DESCRIPTION', payload: e.target.value });
  };
  return (
    <FormControl padding="5px 0">
      <FormLabel>Description</FormLabel>
      <Textarea
        value={description}
        placeholder="Enter event description"
        onChange={setEventDescription}
      />
    </FormControl>
  );
}

export default EventDescriptionInput;
