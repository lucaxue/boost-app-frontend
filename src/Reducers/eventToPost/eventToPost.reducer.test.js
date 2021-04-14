import { DateTime } from 'luxon';
import * as actionTypes from './eventToPost.actions';
import { initialEventToPost, reducer } from './eventToPost.reducer';

describe('SET_EXERCISE action type:', () => {
  test('When given a string as a payload, SET_EXERCISE should set the exerciseType of the state as the given string', () => {
    const expected = {
      name: '',
      description: '',
      exerciseType: 'Running',
      longitude: -1.8845,
      latitude: 52.4754,
      time: DateTime.now().toString().slice(0, -10),
      intensity: '',
      groupId: 2,
    };

    const actual = reducer(initialEventToPost, {
      type: actionTypes.SET_EXERCISE,
      payload: 'Running',
    });

    expect(expected).toEqual(actual);
  });
});
