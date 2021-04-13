import React, {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  getGroupById,
  getManyEventsByIds,
  getUserByUsername,
} from './httpRequests';
import { DateTime } from 'luxon';

const UserContext = createContext({
  userToDisplay: null,
  setDbUser: null,
  eventsWillAttend: null,
  nextEvent: null,
  dbUser: null,
});

const initialUserToDisplay = {
  id: null,
  firstName: '',
  surname: '',
  picture: '',
  username: '',
  group: '',
  hours: 0,
  isAdmin: false,
  isReady: 'loading',
};

function reducer(userToDisplay, action) {
  switch (action.type) {
    case 'SET_ID':
      return { ...userToDisplay, id: action.payload };
    case 'SET_FIRST_NAME':
      return { ...userToDisplay, firstName: action.payload };
    case 'SET_SURNAME':
      return { ...userToDisplay, surname: action.payload };
    case 'SET_PICTURE':
      return { ...userToDisplay, picture: action.payload };
    case 'SET_USERNAME':
      return { ...userToDisplay, username: action.payload };
    case 'SET_GROUP':
      return { ...userToDisplay, group: action.payload };
    case 'SET_HOURS':
      return { ...userToDisplay, hours: action.payload };
    case 'SET_IS_ADMIN':
      return { ...userToDisplay, isAdmin: action.payload };
    case 'SET_IS_READY':
      return { ...userToDisplay, isReady: action.payload };
    case 'RESET':
      return initialUserToDisplay;
    default:
      return userToDisplay;
  }
}

export function UserContextProvider({ children }) {
  const { user: auth0User, isAuthenticated } = useAuth0();
  const [dbUser, setDbUser] = useState({
    id: 0,
    firstName: '',
    surname: '',
    username: '',
    hours: 0,
    partOfGroupId: 0,
    adminOfGroupId: 0,
    eventsIds: [],
  });
  const [userToDisplay, dispatch] = useReducer(reducer, initialUserToDisplay);

  const [eventsWillAttend, setEventsWillAttend] = useState([]);
  const [nextEvent, setNextEvent] = useState(null);

  //fetch dbUser
  useEffect(() => {
    // @ts-ignore
    dispatch({ type: 'SET_USERNAME', payload: auth0User?.nickname });
    getUserByUsername(
      process.env.REACT_APP_BACKEND_URL,
      auth0User?.nickname,
      (data) => {
        setDbUser(data[0]);
      },
      () => {
        // @ts-ignore
        dispatch({ type: 'SET_IS_READY', payload: 'new user' });
      }
    );
    // eslint-disable-next-line
  }, [isAuthenticated]);

  //if dbUser exists,
  //set the rest of the details
  useEffect(() => {
    if (dbUser.id !== 0) {
      // @ts-ignore
      dispatch({ type: 'SET_FIRST_NAME', payload: dbUser.firstName });
      // @ts-ignore
      dispatch({ type: 'SET_SURNAME', payload: dbUser.surname });
      // @ts-ignore
      dispatch({
        type: 'SET_ID',
        payload: dbUser.id,
      });
      // @ts-ignore
      dispatch({
        type: 'SET_IS_ADMIN',
        payload: dbUser.partOfGroupId === dbUser.adminOfGroupId,
      });
      // @ts-ignore
      dispatch({ type: 'SET_PICTURE', payload: auth0User?.picture });
      // @ts-ignore
      dispatch({ type: 'SET_HOURS', payload: dbUser.hours });
      // @ts-ignore
      dispatch({ type: 'SET_IS_READY', payload: 'ready' });

      getGroupById(
        process.env.REACT_APP_BACKEND_URL,
        dbUser.partOfGroupId,
        (group) => {
          // @ts-ignore
          dispatch({ type: 'SET_GROUP', payload: group.name });
        }
      );

      getManyEventsByIds(
        process.env.REACT_APP_BACKEND_URL,
        dbUser.eventsIds,
        (events) => {
          setEventsWillAttend(
            events.filter(
              (event) => DateTime.fromISO(event.time) > DateTime.now()
            )
          );
        }
      );
    }
    // eslint-disable-next-line
  }, [dbUser]);

  useEffect(() => {
    if (eventsWillAttend.length !== 0) {
      setNextEvent(
        eventsWillAttend.reduce(
          (acc, cur) => (new Date(cur.time) < new Date(acc.time) ? cur : acc),
          eventsWillAttend[0]
        )
      );
    }
    // eslint-disable-next-line
  }, [eventsWillAttend]);

  return (
    <UserContext.Provider
      value={{
        userToDisplay,
        setDbUser,
        eventsWillAttend,
        nextEvent,
        dbUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
