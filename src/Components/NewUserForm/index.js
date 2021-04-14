import React, { useEffect, useReducer, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { postUser } from 'Libs/httpRequests';
import { useUserContext } from 'Libs/userContext';
import { useAuth0 } from '@auth0/auth0-react';
import NameInputForm from 'Components/NameInputForm';
import GroupForm from 'Components/GroupForm';
import {
  initialUserToPost,
  reducer,
} from 'Reducers/userToPost/userToPost.reducer';
import * as actionTypes from 'Reducers/userToPost/userToPost.actions';
import Card from 'Components/Card';

function NewUserForm() {
  const { user: auth0User } = useAuth0();
  const { setDbUser } = useUserContext();
  const [userToPost, dispatch] = useReducer(reducer, initialUserToPost);

  const [hasName, setHasName] = useState(false);
  const [toPost, setToPost] = useState(false);

  const handleFirstName = (e) => {
    // @ts-ignore
    dispatch({ type: actionTypes.SET_FIRST_NAME, payload: e.target.value });
  };
  const handleSurname = (e) => {
    // @ts-ignore
    dispatch({ type: actionTypes.SET_SURNAME, payload: e.target.value });
  };

  function submitName() {
    // @ts-ignore
    dispatch({ type: actionTypes.SET_USERNAME, payload: auth0User.nickname });
    setHasName(true);
  }

  //post user only when username state has changed
  useEffect(() => {
    if (toPost) {
      postUser(process.env.REACT_APP_BACKEND_URL, userToPost, setDbUser);
    }
    // eslint-disable-next-line
  }, [toPost]);

  return (
    <Card p={10} maxW="445px">
      <Heading size="xl">Welcome</Heading>
      <Heading size="sm" color="gray.300">
        Please enter some details to register.
      </Heading>
      {hasName ? (
        <GroupForm dispatch={dispatch} setToPost={setToPost} />
      ) : (
        <NameInputForm
          submitName={submitName}
          handleFirstName={handleFirstName}
          handleSurname={handleSurname}
        />
      )}
    </Card>
  );
}
export default NewUserForm;
