import classnames from "classnames";
import "./PuzzleNode.scss";

type PuzzleNodeType = {
  color?: string;
  failState?: boolean;
  isRevealed?: boolean;
  onClick: any;
  onSecondaryClick: any;
};

const PuzzleNode: React.FC<PuzzleNodeType> = ({
  color,
  failState,
  isRevealed,
  onClick,
  onSecondaryClick,
}) => {
  const backgroundColor = isRevealed ? color : "";
  const puzzleNodeClassName = classnames("puzzle-node", {
    "puzzle-node--incorrect": failState,
  });

  return (
    <span
      role="button"
      style={{ backgroundColor }}
      className={puzzleNodeClassName}
      onClick={onClick}
      onContextMenu={onSecondaryClick}
    />
  );
};

export default PuzzleNode;
