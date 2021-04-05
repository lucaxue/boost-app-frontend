import React from "react";
import { render } from "@testing-library/react";
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
