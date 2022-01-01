import Layout from "../../components/Layout/Layout";
import TileContainer from "../../components/TileContainer/TileContainer";
import TileLink from "../../components/TileLink/TileLink";
import { puzzles } from "../../data/mock/puzzles";
import { isPuzzleCompleted } from "../../utils/localStorageUtils";

export const HomeView = () => {
  const puzzleContents = puzzles.map((_puzzle, index) => (
    <TileLink
      to={`puzzles/${index + 1}`}
      key={`puzzle-${index + 1}`}
      text={`Puzzle ${index + 1}`}
      highlighted={isPuzzleCompleted(index)}
    />
  ));

  return (
    <Layout>
      <h1>Nonogram Puzzler</h1>
      <TileContainer>{puzzleContents}</TileContainer>
    </Layout>
  );
};

export default HomeView;
