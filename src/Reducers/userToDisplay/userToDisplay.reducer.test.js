import * as actionTypes from './userToDisplay.actions';
import { initialUserToDisplay, reducer } from './userToDisplay.reducer';

describe('SET_ID action type:', () => {
  test('When given a number as a payload, SET_ID should set the Id of the state as the number', () => {
    const expected = {
      id: 2,
      firstName: '',
      surname: '',
      picture: '',
      username: '',
      group: '',
      hours: 0,
      isAdmin: false,
      isReady: 'loading',
    };

    const actual = reducer(initialUserToDisplay, {
      type: actionTypes.SET_ID,
      payload: 2,
    });

    expect(expected).toEqual(actual);
  });
});
