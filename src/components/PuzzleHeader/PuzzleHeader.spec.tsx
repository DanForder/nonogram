import { customRender } from "../../utils/testUtils";
import PuzzleHeader from "./PuzzleHeader";

test("Renders PuzzleHeader component", () => {
  const { container } = customRender(
    <PuzzleHeader
      userFacingPuzzleId={2}
      puzzleId={1}
      lastUserFacingPuzzleId={10}
    />
  );
  expect(container).toMatchSnapshot();
});

test("Renders with no previous puzzle if id 0", () => {
  const { container } = customRender(
    <PuzzleHeader
      userFacingPuzzleId={1}
      puzzleId={0}
      lastUserFacingPuzzleId={10}
    />
  );
  expect(container).toMatchSnapshot();
});

test("Renders with no next puzzle if id is last", () => {
  const { container } = customRender(
    <PuzzleHeader
      userFacingPuzzleId={10}
      puzzleId={9}
      lastUserFacingPuzzleId={10}
    />
  );
  expect(container).toMatchSnapshot();
});
