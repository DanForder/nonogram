import { customRender } from "../../utils/testUtils";
import RadioTile from "./RadioTile";

//mocking uuid to return sequential ids each time
jest.mock("uuid", () => {
  let value = 0;
  return {
    v4: () => value++,
  };
});

test("Renders RadioTile checked", () => {
  const { container } = customRender(
    <RadioTile
      onChange={jest.fn()}
      checked={true}
      labelText="Barry's Radio Tile"
      name="barry"
    />
  );
  expect(container).toMatchSnapshot();
});

test("Renders RadioTile unchecked", () => {
  const { container } = customRender(
    <RadioTile
      onChange={jest.fn()}
      checked={false}
      labelText="Barry's Radio Tile"
      name="barry"
    />
  );
  expect(container).toMatchSnapshot();
});
