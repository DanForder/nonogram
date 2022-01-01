import { Link } from "react-router-dom";
import "./PuzzleHeader.scss";

type PuzzleHeaderProps = {
  userFacingPuzzleId: number;
  puzzleId: number;
  lastUserFacingPuzzleId: number;
};

const PuzzleHeader: React.FC<PuzzleHeaderProps> = ({
  userFacingPuzzleId,
  puzzleId,
  lastUserFacingPuzzleId,
}) => {
  const previousPuzzleId = userFacingPuzzleId - 1;
  const nextPuzzleId = userFacingPuzzleId + 1;

  return (
    <header className="puzzle-header">
      <h1 className="puzzle-header__heading">Puzzle {userFacingPuzzleId}</h1>
      {previousPuzzleId > 0 && (
        <Link className="puzzle-header__previous" to={`/puzzles/${puzzleId}`}>
          ⬅️ previous
        </Link>
      )}
      <Link className="puzzle-header__home" to="/">
        🧩home🧩
      </Link>
      {nextPuzzleId <= lastUserFacingPuzzleId && (
        <Link className="puzzle-header__next" to={`/puzzles/${puzzleId + 2}`}>
          next ➡️
        </Link>
      )}
    </header>
  );
};

export default PuzzleHeader;
