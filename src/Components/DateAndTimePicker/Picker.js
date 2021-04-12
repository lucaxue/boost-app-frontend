import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { DateTime } from "luxon";
import { FormControl, FormLabel, Grid } from "@chakra-ui/react";

function Picker({ dispatch, datetime }) {
  function setDateAndTime(date) {
    dispatch({
      type: "SET_DATE_AND_TIME",
      payload: date.toISOString().slice(0, -5),
    });
  }
  const currentTime = new Date(DateTime.now().toString());

  return (
    <FormControl padding="5px 0">
      <FormLabel marginBottom="5px">Date and time</FormLabel>

      <DatePicker
        dateFormat="MMMM dd yyyy, h:mm a"
        showTimeSelect
        selected={new Date(datetime)}
        onChange={(date) => {
          console.log(date);
          setDateAndTime(date);
        }}
      />
    </FormControl>
    // @ts-ignore
  );
}

export default Picker;
