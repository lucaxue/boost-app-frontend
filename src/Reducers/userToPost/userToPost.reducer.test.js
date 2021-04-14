import * as actionTypes from './userToPost.actions';
import { initialUserToPost, reducer } from './userToPost.reducer';

describe('SET_FIRST_NAME action type:', () => {
  test('When given a string as a payload, SET_FIRST_NAME should set the firstName of the state as the given string', () => {
    const expected = {
      firstName: 'Sarah',
      surname: '',
      username: '',
      hours: 0,
      partOfGroupId: null,
      adminOfGroupId: null,
      eventsIds: [],
    };

    const actual = reducer(initialUserToPost, {
      type: actionTypes.SET_FIRST_NAME,
      payload: 'Sarah',
    });

    expect(expected).toEqual(actual);
  });
});
