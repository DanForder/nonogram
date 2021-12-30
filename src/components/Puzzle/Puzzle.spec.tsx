import { customRender } from "../../utils/testUtils";
import Puzzle from "./Puzzle";

test("Renders puzzle component with a puzzle", () => {
  const { container } = customRender(
    <Puzzle
      puzzle={[
        { isCorrect: false },
        { isCorrect: true },
        { isCorrect: true },
        { isCorrect: true },
        { isCorrect: true },
        { isCorrect: true },
        { isCorrect: true },
        { isCorrect: false },
        { isCorrect: true },
      ]}
      handleWinNavigation={jest.fn()}
    />
  );
  expect(container).toMatchSnapshot();
});
