import React from "react";
import { render } from "@testing-library/react";
import ProfileCard from "./index";

//arrange
const testUser = {
  firstName: "Morgan",
  surname: "Freeman",
  picture: "https://images.unsplash.com/photo-1577394580379-0b59ce5e1f01?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8bWFuJTIwb3IlMjB3b21hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
  username: "Morgz",
  group: "Young Mums",
  isAdmin: true,
};

describe("When given a user that is an admin", () => {
  it("should render ADMIN OF and the name of their group", () => {
    //act
    const { getByTestId } = render(<ProfileCard {...testUser} />);
    const actual = getByTestId("ProfileCardAdminHeading");

    //assert
    expect(actual).toHaveTextContent("ADMIN OF");
  });

  it("should have user's full name on profile card", () => {
    //act
    const { getByTestId } = render(<ProfileCard {...testUser} />);
    const actual = getByTestId("fullname");

    //assert
    expect(actual).toHaveTextContent("Morgan Freeman");
  });

  it("should display user's group on profile card", () => {
    //act
    const { getByTestId } = render(<ProfileCard {...testUser} />);
    const actual = getByTestId("groupName");

    //assert
    expect(actual).toHaveTextContent("#Young Mums");
  });
  it("should render image in the DOM", () => {
    //act
    const { getByTestId } = render(<ProfileCard {...testUser} />);
    const actual = getByTestId("image");

    //assert
    expect(actual).toBeInTheDocument();
  });
});


//expect(getByTestId('parent')).toContainHTML('<span data-testid="child"></span>')