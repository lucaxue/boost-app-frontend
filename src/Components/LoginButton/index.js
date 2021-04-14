import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

function LoginButton({ ...props }) {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      data-testid="loginButton"
      colorScheme="boostblue"
      size="lg"
      textColor="white"
      onClick={() => loginWithRedirect()}
      {...props}
    >
      Log In
    </Button>
  );
}

export default LoginButton;
