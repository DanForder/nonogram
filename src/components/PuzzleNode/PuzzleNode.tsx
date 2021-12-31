import classnames from "classnames";
import "./PuzzleNode.scss";

type PuzzleNodeType = {
  color?: string;
  failState?: boolean;
  isRevealed?: boolean;
  onClick: any;
  isMarked?: boolean;
};

const PuzzleNode: React.FC<PuzzleNodeType> = ({
  color,
  failState,
  isRevealed,
  onClick,
  isMarked,
}) => {
  const backgroundColor = isRevealed ? color : "";
  const puzzleNodeClassName = classnames("puzzle-node", {
    "puzzle-node--incorrect": failState,
    "puzzle-node--marked": isMarked,
  });

  return (
    <span
      role="button"
      style={{ backgroundColor }}
      className={puzzleNodeClassName}
      onClick={onClick}
    />
  );
};

export default PuzzleNode;
