import { customRender } from "../../utils/testUtils";
import Clue from "./Clue";

test("Clue component (incomplete)", () => {
  const { container } = customRender(<Clue completed={false} value={3} />);
  expect(container).toMatchSnapshot();
});

test("Clue component (complete)", () => {
  const { container } = customRender(<Clue completed value={3} />);
  expect(container).toMatchSnapshot();
});
