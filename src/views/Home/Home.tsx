import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { puzzles } from "../../data/puzzles";

export const HomeView = () => {
  const puzzleContents = puzzles.map((_puzzle, index) => (
    <>
      <Link key={`puzzle-${index + 1}`} to={`puzzles/${index + 1}`}>
        Puzzle {index + 1}
      </Link>
      <br />
    </>
  ));

  return (
    <Layout>
      <h1>Welcome to Nonogram Puzzler</h1>
      {puzzleContents}
    </Layout>
  );
};

export default HomeView;
