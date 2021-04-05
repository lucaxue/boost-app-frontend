import React from "react";
import { render } from "@testing-library/react";
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
