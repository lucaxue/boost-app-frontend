import { Grid } from '@chakra-ui/react';
import React from 'react';
import LoginButton from '../LoginButton';
import { ReactComponent as BoostLogo } from './logo.svg';

export default function LoginPage() {
  return (
    <Grid placeItems="center" height="100vh">
      <BoostLogo />
      <LoginButton></LoginButton>
    </Grid>
  );
}
