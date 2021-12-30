import { puzzles } from "../../data/mock/puzzles";
import { customRender } from "../../utils/testUtils";
import Puzzle from "./Puzzle";

puzzles.forEach((puzzle) => {
  test(`renders puzzle`, () => {
    const { container } = customRender(
      <Puzzle puzzle={puzzle} onComplete={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});