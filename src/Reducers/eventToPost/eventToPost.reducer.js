import * as actionTypes from 'Reducers/eventToPost/eventToPost.actions';
import { DateTime } from 'luxon';

export const initialEventToPost = {
  name: '',
  description: '',
  exerciseType: '',
  longitude: 0,
  latitude: 0,
  time: DateTime.now().toString().slice(0, -10),
  intensity: '',
  groupId: 0,
};

export function reducer(eventToPost, action) {
  switch (action.type) {
    case actionTypes.SET_EXERCISE:
      return { ...eventToPost, exerciseType: action.payload };
    case actionTypes.SET_DATE_AND_TIME:
      return { ...eventToPost, time: action.payload };
    case actionTypes.SET_LOCATION:
      return {
        ...eventToPost,
        longitude: action.payload.lng,
        latitude: action.payload.lat,
      };
    case actionTypes.SET_INTENSITY:
      return {
        ...eventToPost,
        intensity: action.payload,
      };
    case actionTypes.SET_EVENT_NAME:
      return {
        ...eventToPost,
        name: action.payload,
      };
    case actionTypes.SET_EVENT_DESCRIPTION:
      return {
        ...eventToPost,
        description: action.payload,
      };
    case actionTypes.SET_GROUP_ID:
      return {
        ...eventToPost,
        groupId: action.payload,
      };
    case actionTypes.RESET:
      return initialEventToPost;
    default:
      return eventToPost;
  }
}
