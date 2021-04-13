import React from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

function ExerciseDropdown({ dispatch, exerciseType }) {
  const setExercise = (e) => {
    dispatch({ type: 'SET_EXERCISE', payload: e.target.value });
  };

  return (
    <FormControl padding="5px 0" isRequired>
      <FormLabel>Exercise Type</FormLabel>
      <Select
        placeholder="Select options"
        value={exerciseType}
        onChange={setExercise}
      >
        <option value="Run">Run</option>
        <option value="Cycle">Cycle</option>
        <option value="Bootcamp">Bootcamp</option>
        <option value="Other">Other</option>
      </Select>
    </FormControl>
  );
}

export default ExerciseDropdown;
