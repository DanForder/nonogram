import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Puzzle from "../../components/Puzzle/Puzzle";
import PuzzleHeader from "../../components/PuzzleHeader/PuzzleHeader";
import { puzzles } from "../../data/mock/puzzles";
import { setPuzzleCompleteState } from "../../utils/localStorageUtils";
import { PuzzleParams } from "./PuzzleParams";

const Error = (
  <Layout>
    <h2>No puzzle found</h2>
    <Link to="/">Home</Link>
  </Layout>
);

const PuzzleView = () => {
  const navigate = useNavigate();
  const params = useParams<PuzzleParams>();

  const userFacingPuzzleId = parseInt(params.id ?? "-99");
  const puzzleId = userFacingPuzzleId - 1;
  const puzzle = puzzles[puzzleId];

  if (puzzle === undefined) {
    return Error;
  }

  const handleWin = () => {
    setPuzzleCompleteState(puzzleId, true);
    navigate(`/puzzles/${puzzleId + 2}`);
  };

  return (
    <Layout>
      <PuzzleHeader
        userFacingPuzzleId={userFacingPuzzleId}
        puzzleId={puzzleId}
        lastUserFacingPuzzleId={puzzles.length}
      />
      <Puzzle puzzle={puzzle} onComplete={handleWin} />
    </Layout>
  );
};

export default PuzzleView;
