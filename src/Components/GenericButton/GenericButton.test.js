import React from "react";
import { render } from "@testing-library/react";
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
