import { fireEvent, screen } from "@testing-library/react";
import { customRender } from "../../utils/testUtils";
import PuzzleNode from "./PuzzleNode";

test("Renders revealed and correct puzzle node", () => {
  const { container } = customRender(
    <PuzzleNode onClick={jest.fn} color="dodgerblue" isRevealed />
  );
  expect(container).toMatchSnapshot();
});

test("Renders revealed and incorrect puzzle node", () => {
  const { container } = customRender(
    <PuzzleNode onClick={jest.fn} isRevealed failState />
  );
  expect(container).toMatchSnapshot();
});

test("handles onclick correctly", () => {
  const mockClick = jest.fn();
  customRender(<PuzzleNode onClick={mockClick} color="dodgerblue" />);

  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(mockClick).toHaveBeenCalledTimes(1);
});
