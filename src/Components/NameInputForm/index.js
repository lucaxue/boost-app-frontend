import { FormControl, FormLabel, GridItem, Input } from '@chakra-ui/react';
import GenericButton from 'Components/GenericButton';
import React from 'react';

function NameInputForm({ handleFirstName, handleSurname, submitName }) {
  return (
    <>
      <GridItem padding="50px 0">
        <FormControl padding="5px 0" isRequired>
          <FormLabel>First name</FormLabel>
          <Input placeholder="First name" onChange={handleFirstName} />
        </FormControl>
        <FormControl padding="5px 0" isRequired>
          <FormLabel>Surname</FormLabel>
          <Input placeholder="Surname" onChange={handleSurname} />
        </FormControl>
      </GridItem>
      <GenericButton text="Submit" handleClick={submitName} />
    </>
  );
}

export default NameInputForm;
