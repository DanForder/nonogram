import Layout from "../../components/Layout/Layout";
import TileLink from "../../components/TileLink/TileLink";
import TileLinkContainer from "../../components/TileLinkContainer/TileLinkContainer";
import { puzzles } from "../../data/mock/puzzles";
import { isPuzzleCompleted } from "../../utils/localStorageUtils";

export const HomeView = () => {
  const puzzleContents = puzzles.map((_puzzle, index) => (
    <TileLink
      to={`puzzles/${index + 1}`}
      key={`puzzle-${index + 1}`}
      text={index + 1}
      highlighted={isPuzzleCompleted(index)}
    />
  ));

  return (
    <Layout>
      <h1>Nonogram Puzzler</h1>
      <h2>Puzzles</h2>
      <TileLinkContainer>{puzzleContents}</TileLinkContainer>
    </Layout>
  );
};

export default HomeView;
