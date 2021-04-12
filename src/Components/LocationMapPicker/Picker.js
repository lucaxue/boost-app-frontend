import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Picker(){
        const [startDate, setStartDate] = useState(new Date());
        return (
          // @ts-ignore
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        );
}

export default Picker;