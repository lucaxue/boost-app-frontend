import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, FormControl, FormLabel, Grid } from '@chakra-ui/react';
import { DateTime } from 'luxon';

function DateAndTimePickers({ dispatch }) {
  function setDateAndTime(e) {
    dispatch({ type: 'SET_DATE_AND_TIME', payload: e.target.value });
  }

 
  const luxonTime= DateTime.now().toString().slice(0,-13);
 



  return (
    <FormControl padding="5px 0">
      <FormLabel marginBottom="5px">Date and time</FormLabel>
      <Grid
        border="1px"
        borderColor="gray.200"
        borderRadius="7px"
        padding="10px"
        placeItems="center"
      >
        <TextField
          onChange={setDateAndTime}
          id="datetime-local"
          type="datetime-local"
          defaultValue={luxonTime}
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
