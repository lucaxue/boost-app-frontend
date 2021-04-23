import React from "react";
import { render } from "@testing-library/react";
import EventCard from "./index";

//arrange
const testEvent = {
  name: "Run with Sarah",
  time: "2021-04-09T19:10:25",
  longitude: -1.8039495,
  latitude: 52.526653,
  description:
    "Come join us to ride 50k: On Saturday morning early, before breakfast!",
  exerciseType: "running",
  intensity: "easy",
  willAttend: true,
  id: 5,
};

describe("When given an event", () => {
  it("should render on the page", () => {
    //act
    const { getByTestId } = render(<EventCard {...testEvent} />);
    const actual = getByTestId("eventcard");

    //assert
    expect(actual).toBeInTheDocument();
  });

  it("should have text details of the event description in event card", () => {
    //act
    const { getByTestId } = render(<EventCard {...testEvent} />);
    const actual = getByTestId("description");

    //assert
    expect(actual).toHaveTextContent(
      "Come join us to ride 50k: On Saturday morning early, before breakfast!"
    );
  });
  it("should have text of correct exercise type", () => {
    //act
    const { getByTestId } = render(<EventCard {...testEvent} />);
    const actual = getByTestId("exerciseType");

    //assert
    expect(actual).toHaveTextContent("RUNNING");
  });
  it("should render correct exercise intensity", () => {
    //act
    const { getByTestId } = render(<EventCard {...testEvent} />);
    const actual = getByTestId("intensity");

    //assert
    expect(actual).toHaveTextContent("EASY");
  });
  it("should have text content of Attend if attending is false", () => {
    //act
    const { getByTestId } = render(
      <EventCard {...{ ...testEvent, willAttend: false }} />
    );
    const actual = getByTestId("attending button");

    //assert
    expect(actual).toHaveTextContent("Attend");
  });
});
