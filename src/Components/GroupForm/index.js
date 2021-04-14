import {
  FormControl,
  FormLabel,
  GridItem,
  Input,
  Button,
  Grid,
} from "@chakra-ui/react";
import { getGroupByName, postGroup } from "Libs/httpRequests";
import React, { useEffect, useState } from "react";
import { actionTypes } from "../../Libs/Reducer/userToPostActionTypes";

function GroupForm({ setToPost, dispatch }) {
  const [groupName, setGroupName] = useState("");
  const [groupExists, setGroupExists] = useState("undetermined");
  const [toCreateGroup, setToCreateGroup] = useState(false);

  function handleGroupCheck() {
    getGroupByName(
      process.env.REACT_APP_BACKEND_URL,
      groupName,
      (group) => {
        if (groupName === group.name) {
          dispatch({
            type: actionTypes.SET_PART_OF_GROUP_ID,
            payload: group.id,
          });
          setGroupExists("true");
        }
      },
      () => {
        setGroupExists("false");
      }
    );
  }

  useEffect(() => {
    if (toCreateGroup) {
      postGroup(
        process.env.REACT_APP_BACKEND_URL,
        { name: groupName },
        (group) => {
          dispatch({
            type: actionTypes.SET_PART_OF_GROUP_ID,
            payload: group.id,
          });
          dispatch({
            type: actionTypes.SET_ADMIN_OF_GROUP_ID,
            payload: group.id,
          });
          setToPost(true);
        }
      );
    }
    // eslint-disable-next-line
  }, [toCreateGroup]);

  return (
    <>
      {groupExists === "undetermined" && (
        <>
          <GridItem py={10}>
            <FormControl py={5} isRequired>
              <FormLabel>
                Please enter group name to create or join a group
              </FormLabel>
              <Input
                placeholder="Group Name"
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
            </FormControl>
          </GridItem>
          <Button w="full" colorScheme="boostblue" onClick={handleGroupCheck}>
            Submit
          </Button>
        </>
      )}
      {groupExists === "true" && (
        <GridItem py={10}>
          <FormControl py={5} isRequired>
            <FormLabel>
              {groupName} is an existing group, would you like to join it?
            </FormLabel>
            <Grid mt={5} placeItems="center" w="full" templateColumns="4fr 4fr">
              <Button
                w="80%"
                colorScheme="boostblue"
                onClick={() => {
                  setToPost(true);
                }}
              >
                Yes
              </Button>
              <Button
                w="80%"
                right="0"
                colorScheme="boostblue"
                onClick={() => {
                  setGroupExists("undetermined");
                }}
              >
                No
              </Button>
            </Grid>
          </FormControl>
        </GridItem>
      )}
      {groupExists === "false" && (
        <GridItem py={10}>
          <FormControl py={5} isRequired>
            <FormLabel>
              Group {groupName} does not exist would you like to create this
              group?
            </FormLabel>
            <Grid mt={5} placeItems="center" w="full" templateColumns="4fr 4fr">
              <Button
                w="80%"
                colorScheme="boostblue"
                onClick={() => {
                  setToCreateGroup(true);
                }}
              >
                Yes
              </Button>
              <Button
                w="80%"
                colorScheme="boostblue"
                onClick={() => {
                  setGroupExists("undetermined");
                }}
              >
                No
              </Button>
            </Grid>
          </FormControl>
        </GridItem>
      )}
    </>
  );
}

export default GroupForm;
