import { customRender } from "../../utils/testUtils";
import TileLink from "./TileLink";

test("Renders TileLink", () => {
  const { container } = customRender(<TileLink to="/barry" text="5" />);
  expect(container).toMatchSnapshot();
});

test("Renders TileLink highlighted", () => {
  const { container } = customRender(
    <TileLink to="/barry" text="5" highlighted />
  );
  expect(container).toMatchSnapshot();
});
