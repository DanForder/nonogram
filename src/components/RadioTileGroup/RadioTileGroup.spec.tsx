import { customRender } from "../../utils/testUtils";
import RadioTileGroup from "./RadioTileGroup";

// //mocking uuid to return sequential ids each time
jest.mock("uuid", () => {
  let value = 0;
  return {
    v4: () => value++,
  };
});

test("Renders RadioTileGroup with pen selected", () => {
  const { container } = customRender(
    <RadioTileGroup penSelected={true} updatePenSelected={jest.fn()} />
  );
  expect(container).toMatchSnapshot();
});

test("Renders RadioTileGroup with pen not selected", () => {
  const { container } = customRender(
    <RadioTileGroup penSelected={false} updatePenSelected={jest.fn()} />
  );
  expect(container).toMatchSnapshot();
});
