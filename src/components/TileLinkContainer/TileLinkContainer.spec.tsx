import { customRender } from "../../utils/testUtils";
import TileLink from "../TileLink/TileLink";
import TileLinkContainer from "./TileLinkContainer";

test("Renders TileLinkContainer with two tile links", () => {
  const { container } = customRender(
    <TileLinkContainer>
      <TileLink to="/1" text="1" highlighted />
      <TileLink to="/2" text="2" />
    </TileLinkContainer>
  );
  expect(container).toMatchSnapshot();
});
