import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginButton from "./index";
const testProps = {
  bg: "#1AC0C6",
  size: "lg",
  textColor: "#fff",
  onClick: jest.fn(),
};
test("On login Page, login button is rendered", () => {
  const { getByTestId } = render(<LoginButton {...testProps} />);
  const actual = getByTestId("loginButton");
  expect(actual).toBeInTheDocument();
});

test("Test that the Login button calls the onClick function when it's clicked", () => {
  const { getByTestId } = render(<LoginButton {...testProps} />);
  const actual = getByTestId("loginButton");
  fireEvent.click(actual);
  expect(testProps.onClick).toBeCalled();
});
