import React from 'react';
import { Center, Grid, GridItem } from '@chakra-ui/react';
import { useUserContext } from '../../Libs/userContext';
import NewUserForm from '../NewUserForm';
import EventCard from '../EventCard';
import ProfileCard from '../ProfileCard';

function ProfilePage() {
  const { userToDisplay, nextEvent } = useUserContext();

  return (
    <Center>
      <Grid placeItems="center" minH="90vh" mb="100px">
        {userToDisplay.id && userToDisplay.group ? (
          <ProfileCard {...userToDisplay} />
        ) : (
          <NewUserForm />
        )}

        <GridItem w="full" maxW="445">
          {nextEvent && <EventCard {...nextEvent} willAttend={true} />}
        </GridItem>
      </Grid>
    </Center>
  );
}

export default ProfilePage;
