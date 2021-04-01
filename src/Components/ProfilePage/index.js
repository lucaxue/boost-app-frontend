import React from 'react';
import { Grid } from '@chakra-ui/react';
import NewUserForm from '../NewUserForm';
import { useUserContext } from '../../Libs/userContext';
import LogoutButton from 'Components/LogoutButton';
import ProfileCard from 'Components/ProfileCard';
import EventCard from 'Components/EventCard';

function ProfilePage() {
  const { userToDisplay, nextEvent } = useUserContext();

  return (
    <Grid placeItems="center" minH="90vh" mb="100px">
      {userToDisplay.id && userToDisplay.group ? (
        <ProfileCard {...userToDisplay} />
      ) : (
        <NewUserForm />
      )}

      <LogoutButton />
      {nextEvent && <EventCard {...nextEvent} willAttend={true} />}
    </Grid>
  );
}

export default ProfilePage;
