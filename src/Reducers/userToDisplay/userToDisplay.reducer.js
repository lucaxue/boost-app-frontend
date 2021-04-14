import * as actionTypes from './userToDisplay.actions';

export const initialUserToDisplay = {
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

export function reducer(userToDisplay, action) {
  switch (action.type) {
    case actionTypes.SET_ID:
      return { ...userToDisplay, id: action.payload };
    case actionTypes.SET_FIRST_NAME:
      return { ...userToDisplay, firstName: action.payload };
    case actionTypes.SET_SURNAME:
      return { ...userToDisplay, surname: action.payload };
    case actionTypes.SET_PICTURE:
      return { ...userToDisplay, picture: action.payload };
    case actionTypes.SET_USERNAME:
      return { ...userToDisplay, username: action.payload };
    case actionTypes.SET_GROUP:
      return { ...userToDisplay, group: action.payload };
    case actionTypes.SET_HOURS:
      return { ...userToDisplay, hours: action.payload };
    case actionTypes.SET_IS_ADMIN:
      return { ...userToDisplay, isAdmin: action.payload };
    case actionTypes.SET_IS_READY:
      return { ...userToDisplay, isReady: action.payload };
    case actionTypes.RESET:
      return initialUserToDisplay;
    default:
      return userToDisplay;
  }
}
