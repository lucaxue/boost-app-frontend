import * as actionTypes from './userToPost.actions';

export const initialUserToPost = {
  firstName: '',
  surname: '',
  username: '',
  hours: 0,
  partOfGroupId: null,
  adminOfGroupId: null,
  eventsIds: [],
};

export function reducer(userToPost, action) {
  switch (action.type) {
    case actionTypes.SET_FIRST_NAME:
      return { ...userToPost, firstName: action.payload };
    case actionTypes.SET_SURNAME:
      return { ...userToPost, surname: action.payload };
    case actionTypes.SET_USERNAME:
      return { ...userToPost, username: action.payload };
    case actionTypes.SET_HOURS:
      return { ...userToPost, hours: action.payload };
    case actionTypes.SET_PART_OF_GROUP_ID:
      return { ...userToPost, partOfGroupId: action.payload };
    case actionTypes.SET_ADMIN_OF_GROUP_ID:
      return { ...userToPost, adminOfGroupId: action.payload };
    case actionTypes.SET_EVENTS_IDS:
      return { ...userToPost, eventsIds: action.payload };
    default:
      return userToPost;
  }
}
