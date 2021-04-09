import React from "react";
import { render } from "@testing-library/react";
import ProfileCard from "./index";

//arrange
const testUser = {
  firstName: "Morgan",
  surname: "Freeman",
  picture: "",
  username: "Morgz",
  group: "Young Mums",
  isAdmin: true,
};
test("When given a user who is an admin, render ADMIN OF and the name of their group", () => {
  //act
  const { getByTestId } = render(<ProfileCard {...testUser} />);
  const actual = getByTestId("ProfileCardAdminHeading");

  //assert
  expect(actual).toHaveTextContent("ADMIN OF");
});

test("When given a user display user's full name on profile card", () => {
  //act
  const { getByTestId } = render(<ProfileCard {...testUser} />);
  const actual = getByTestId("fullname");

  //assert
  expect(actual).toHaveTextContent("Morgan Freeman");
});

test("When given a user display user's group on profile card", () => {
  //act
  const { getByTestId } = render(<ProfileCard {...testUser} />);
  const actual = getByTestId("groupName");

  //assert
  expect(actual).toHaveTextContent("#Young Mums");
});
