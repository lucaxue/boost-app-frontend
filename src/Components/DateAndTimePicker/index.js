import React from 'react';
import TextField from '@material-ui/core/TextField';
import { FormControl, FormLabel, Grid } from '@chakra-ui/react';
import { DateTime } from 'luxon';

function DateAndTimePickers({ dispatch }) {
  function setDateAndTime(e) {
    dispatch({ type: 'SET_DATE_AND_TIME', payload: e.target.value });
  }

  const currentTime = DateTime.now().toString().slice(0, -13);

  return (
    <FormControl padding="5px 0">
      <FormLabel marginBottom="5px">Date and time</FormLabel>
      <Grid
        border="1px"
        borderColor="gray.200"
        rounded="lg"
        p={3}
        placeItems="center"
      >
        <TextField
          onChange={setDateAndTime}
          id="datetime-local"
          type="datetime-local"
          defaultValue={currentTime}
          fullWidth={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </FormControl>
  );
}

export default DateAndTimePickers;
