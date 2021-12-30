import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Puzzle from "../../components/Puzzle/Puzzle";
import { puzzles } from "../../data/puzzles";
import { PuzzleParams } from "./PuzzleParams";

const Error = (
  <Layout>
    <h2>No puzzle found</h2>
    <Link to="/">Home</Link>
  </Layout>
);

const PuzzleView = () => {
  const { id } = useParams<PuzzleParams>();

  if (id === undefined) {
    return Error;
  }

  const puzzleId = parseInt(id) - 1;

  const puzzle = puzzles[puzzleId];

  if (puzzle === undefined) {
    return Error;
  }

  return (
    <Layout>
      <h2>Puzzle {id}</h2>
      <Puzzle puzzle={puzzle} />
      <Link to="/">Home</Link>
      <br />
      <Link to={`/puzzles/${puzzleId + 2}`}>Puzzle {puzzleId + 2}</Link>
    </Layout>
  );
};

export default PuzzleView;