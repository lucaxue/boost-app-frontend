import { actionTypes } from "./userToPostActionTypes";
import { initialUserToPost, reducer } from "./userToPostReducer";

describe("SET_FIRST_NAME action type:", () => {
  test("When given a string as a payload, SET_FIRST_NAME should add that string to the state array", () => {
    const expected = {
      firstName: "Sarah",
      surname: "",
      username: "",
      hours: 0,
      partOfGroupId: null,
      adminOfGroupId: null,
      eventsIds: [],
    };
    const actual = reducer(initialUserToPost, {
      type: actionTypes.SET_FIRST_NAME,
      payload: "Sarah",
    });
    expect(expected).toEqual(actual);
  });
});
