import mockClues from "../../data/mock/MockClues";
import { customRender } from "../../utils/testUtils";
import ClueContainer from "./ClueContainer";

test("ClueContainer component", () => {
  const { container } = customRender(
    <ClueContainer clues={mockClues} isColumn={false} />
  );
  expect(container).toMatchSnapshot();
});

test("ClueContainer component  (column)", () => {
  const { container } = customRender(
    <ClueContainer clues={mockClues} isColumn={true} />
  );
  expect(container).toMatchSnapshot();
});
