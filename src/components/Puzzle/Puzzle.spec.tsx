import { puzzles } from "../../data/mock/puzzles";
import { customRender } from "../../utils/testUtils";
import Puzzle from "./Puzzle";

//mocking uuid to return sequential ids each time
jest.mock("uuid", () => {
  let value = 0;
  return {
    v4: () => value++,
  };
});

puzzles.forEach((puzzle) => {
  test(`renders puzzle`, () => {
    const { container } = customRender(
      <Puzzle puzzle={puzzle} onComplete={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});
