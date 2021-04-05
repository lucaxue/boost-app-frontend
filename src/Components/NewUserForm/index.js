import React, { useEffect, useReducer, useState } from "react";
import { Grid, Heading } from "@chakra-ui/react";
import { postUser } from "Libs/httpRequests";
import { useUserContext } from "../../Libs/userContext";
import { useAuth0 } from "@auth0/auth0-react";
import NameInputForm from "Components/NameInputForm";
import GroupForm from "Components/GroupForm";
import {
  initialUserToPost,
  reducer,
} from "../../Libs/Reducer/userToPostReducer";
import { actionTypes } from "../../Libs/Reducer/userToPostActionTypes";

function NewUserForm() {
  const { user: auth0User } = useAuth0();
  const { setDbUser } = useUserContext();
  const [userToPost, dispatch] = useReducer(reducer, initialUserToPost);

  const [isPosted, setIsPosted] = useState(false);

  const handleFirstName = (e) => {
    // @ts-ignore
    dispatch({ type: actionTypes.SET_FIRST_NAME, payload: e.target.value });
  };
  const handleSurname = (e) => {
    // @ts-ignore
    dispatch({ type: actionTypes.SET_SURNAME, payload: e.target.value });
  };

  function handlePost() {
    // @ts-ignore
    dispatch({ type: actionTypes.SET_USERNAME, payload: auth0User.nickname });
    setIsPosted(true);
  }

  //post user only when username state has changed
  useEffect(() => {
    postUser(process.env.REACT_APP_BACKEND_URL, userToPost, setDbUser);
    // eslint-disable-next-line
  }, [userToPost.username]);

  return (
    <Grid
      boxShadow="lg"
      padding="30px 50px"
      borderRadius={[null, "10px"]}
      width={["100%", "60%"]}
      maxW="max-content"
    >
      <Heading size="xl">Welcome</Heading>
      <Heading size="sm" color="gray.300">
        Please enter some details to register.
      </Heading>
      {isPosted ? (
        <GroupForm dispatch={dispatch} userToPost={userToPost} />
      ) : (
        <NameInputForm
          handlePost={handlePost}
          handleFirstName={handleFirstName}
          handleSurname={handleSurname}
        />
      )}
    </Grid>
  );
}
export default NewUserForm;
