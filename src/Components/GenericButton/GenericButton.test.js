import React from "react";
import { fireEvent, render } from "@testing-library/react";
import GenericButton from "./index";

const testProps = {
  bg: "#1AC0C6",
  size: "md",
  textColor: "#fff",
  handleClick: jest.fn(),
  text: "text",
};

test("Logout button is rendered", () => {
  const { getByTestId } = render(<GenericButton {...testProps} />);
  const actual = getByTestId("generic button");
  expect(actual).toBeInTheDocument();
});

test("Test that the GenericButton calls the handleClick function when it's clicked", () => {
  const { getByTestId } = render(<GenericButton {...testProps} />);
  const actual = getByTestId("generic button");
  fireEvent.click(actual);
  expect(testProps.handleClick).toBeCalled();
});

test("Test that button is rendered with correct text", () => {
  const { getByTestId } = render(<GenericButton {...testProps} />);
  expect(getByTestId("generic button")).toHaveTextContent("text");
});
