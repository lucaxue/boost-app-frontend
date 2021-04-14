import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { SET_DATE_AND_TIME } from 'Reducers/eventToPost/eventToPost.actions';

function DateTimePicker({ dispatch, datetime }) {
  function setDateAndTime(date) {
    dispatch({
      type: SET_DATE_AND_TIME,
      payload:
        date.toISOString().slice(0, -13) + date.toTimeString().slice(0, 8),
    });
  }

  return (
    <FormControl padding="5px 0">
      <FormLabel marginBottom="5px">Date and time</FormLabel>
      <DatePicker
        dateFormat="EEE, do MMMM yyyy, h:mm a"
        showTimeSelect
        timeIntervals={15}
        selected={new Date(datetime)}
        onChange={(date) => {
          setDateAndTime(date);
        }}
      />
    </FormControl>
  );
}

export default DateTimePicker;
