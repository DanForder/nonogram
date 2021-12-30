import { fireEvent, screen } from "@testing-library/react";
import { customRender } from "../../utils/testUtils";
import PuzzleNode from "./PuzzleNode";

test("Renders revealed and correct puzzle node", () => {
  const { container } = customRender(
    <PuzzleNode
      onClick={jest.fn()}
      color="dodgerblue"
      isRevealed
      onSecondaryClick={jest.fn()}
    />
  );
  expect(container).toMatchSnapshot();
});

test("Renders revealed and incorrect puzzle node", () => {
  const { container } = customRender(
    <PuzzleNode
      onClick={jest.fn()}
      isRevealed
      failState
      onSecondaryClick={jest.fn()}
    />
  );
  expect(container).toMatchSnapshot();
});

test("handles onclick correctly", () => {
  const mockPrimaryClick = jest.fn();
  const mockSecondaryClick = jest.fn();
  customRender(
    <PuzzleNode
      onClick={mockPrimaryClick}
      color="dodgerblue"
      onSecondaryClick={mockSecondaryClick}
    />
  );

  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(mockPrimaryClick).toHaveBeenCalledTimes(1);

  fireEvent.contextMenu(button);
  expect(mockSecondaryClick).toHaveBeenCalledTimes(1);
});
