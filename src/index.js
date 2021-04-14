import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { UserContextProvider } from './Libs/userContext';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  colors: {
    boostyellow: {
      50: '#fff7dc',
      100: '#fee8b1',
      200: '#fbd882',
      300: '#fac952',
      400: '#fac952',
      500: '#fac952',
      600: '#f8b923',
      700: '#f8ab23',
      800: '#df840d',
      900: '#1c1200',
    },
    boostblue: {
      50: '#dafeff',
      100: '#b3f5f8',
      200: '#89eef1',
      300: '#5de5ea',
      400: '#34dee4',
      500: '#1bc5cb',
      600: '#08999e',
      700: '#006e72',
      800: '#004346',
      900: '#00181a',
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <ChakraProvider theme={theme}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
