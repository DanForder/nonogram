import React from "react";
import "./PuzzleNode.scss";

type PuzzleNodeType = {
  color: string;
  isRevealed?: boolean;
  onClick: any;
};

const PuzzleNode: React.FC<PuzzleNodeType> = ({
  color,
  isRevealed,
  onClick,
}) => {
  return (
    <span
      className="puzzle-node"
      style={
        {
          // backgroundColor: color,
          // color,
        }
      }
      onClick={onClick}
    />
  );
};

export default PuzzleNode;
