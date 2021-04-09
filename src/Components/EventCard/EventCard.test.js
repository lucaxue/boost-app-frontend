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
test("When given an event render details of the event description in event card", () => {
  //act
  const { getByTestId } = render(<EventCard {...testEvent} />);
  const actual = getByTestId("description");

  //assert
  expect(actual).toHaveTextContent(
    "Come join us to ride 50k: On Saturday morning early, before breakfast!"
  );
});

// test("When given an event object with latitude and longitude render the address of the event in event card", () => {
//   //act
//   const { getByTestId } = render(<EventCard {...testEvent} />);
//   const actual = getByTestId("address");

//   //assert
//   expect(actual).toHaveTextContent("Eachelhurst Road, Birmingham, B24 0NR");
// });
