import puzzle from "../../types/puzzle";

type PuzzleType = {
  puzzle: puzzle;
};

const Puzzle: React.FC<PuzzleType> = ({ puzzle }) => {
  console.log(puzzle);
  const puzzleJsx = puzzle.puzzleNodes.map((node, index) => (
    <p key={index}>{node.isCorrect.toString()}</p>
  ));

  return <>{puzzleJsx}</>;
};

export default Puzzle;
