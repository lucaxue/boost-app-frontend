import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LogoutButton from "./index";

const testProps = {
  bg: "#1AC0C6",
  size: "md",
  textColor: "black",
  onClick: jest.fn(),
};
test("Logout button is rendered", () => {
  const { getByTestId } = render(<LogoutButton {...testProps} />);
  const actual = getByTestId("logoutButton");
  expect(actual).toBeInTheDocument();
});

test("Test that the Login button calls the onClick function when it's clicked", () => {
  const { getByTestId } = render(<LogoutButton {...testProps} />);
  const actual = getByTestId("logoutButton");

  fireEvent.click(actual);
  expect(testProps.onClick).toBeCalled();
});
