import { useEffect, useState } from "react";
import puzzle, { puzzleNode } from "../../types/puzzle";
import {
  getClueText,
  getPuzzleSize,
  getSelectedCorrectTiles,
  getTotalCorrectTiles,
} from "../../utils/puzzleUtils";
import PuzzleNode from "../PuzzleNode/PuzzleNode";
import "./Puzzle.scss";

type PuzzleType = {
  puzzle: puzzle;
};

const Puzzle: React.FC<PuzzleType> = ({ puzzle }) => {
  const [puzzleState, setPuzzleState] = useState([...puzzle]);
  const [livesLeft, setLivesLeft] = useState(3);

  const puzzleSize = getPuzzleSize(puzzleState.length);
  const selectedCorrectTiles = getSelectedCorrectTiles(puzzleState);
  const totalCorrectTiles = getTotalCorrectTiles(puzzleState);

  useEffect(() => {
    setPuzzleState([...puzzle]);
  }, [puzzle]);

  useEffect(() => {
    if (selectedCorrectTiles === totalCorrectTiles) {
      window.alert("you win!");
      window.location.reload();
    }
  }, [selectedCorrectTiles, totalCorrectTiles]);

  useEffect(() => {
    if (livesLeft === 0) {
      window.alert("you lost!");
      window.location.reload();
    }
  }, [livesLeft]);

  const getColumnClueJsx = (
    puzzleNodes: puzzleNode[],
    columnSize: number
  ): JSX.Element[] => {
    const toReturn = [<span key="empty-chart-span"></span>];

    for (let i = 0; i < columnSize; i++) {
      let columnClues = [];

      for (let j = i; j < puzzleNodes.length; j += columnSize) {
        columnClues.push(puzzleNodes[j]);
      }

      const clueText = getClueText(columnClues);
      const clueJsx = (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          key={`clue-column-${i}`}
        >
          {clueText}
        </span>
      );
      toReturn.push(clueJsx);
    }

    return toReturn;
  };

  const getRowClueJsx = (
    currentRowIndex: number,
    rowSize: number
  ): JSX.Element => {
    const rowClues = puzzle.slice(currentRowIndex, currentRowIndex + rowSize);
    const clueText = getClueText(rowClues);

    return (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        key={`clue-${currentRowIndex}`}
      >
        {clueText}
      </span>
    );
  };

  const getPuzzleJsx = (puzzle: puzzle, size: number) => {
    // initialise result array with the column clues
    let result: JSX.Element[] = [...getColumnClueJsx(puzzle, puzzleSize)];

    for (let index = 0; index < puzzle.length; index++) {
      const node = puzzleState[index];

      // if we're at the beginning of a row, add a row clue
      if (index % size === 0) {
        const rowClueJsx = getRowClueJsx(index, size);
        result.push(rowClueJsx);
      }

      const puzzleNode = createPuzzleNode(node, index);

      // add the puzzle node
      result.push(puzzleNode);
    }

    return result;
  };

  const handleNodeClick = (index: number) => {
    const { isCorrect } = puzzleState[index];

    const updatedPuzzleArr = [...puzzleState];
    // updatedPuzzleArr[index].color = isCorrect ? "green" : "";
    updatedPuzzleArr[index].isSelected = true;

    if (!isCorrect) {
      setLivesLeft(livesLeft - 1);
    }

    setPuzzleState(updatedPuzzleArr);
  };

  const createPuzzleNode = (puzzleNode: puzzleNode, index: number) => {
    return (
      <PuzzleNode
        key={`puzzle-node-${index}`}
        color={puzzleNode.color}
        isRevealed={puzzleNode.isSelected}
        failState={!puzzleNode.isCorrect && puzzleNode.isSelected}
        onClick={() => {
          handleNodeClick(index);
        }}
      />
    );
  };

  // sets the grid columns to match the size of inputted puzzle
  const getGridTemplateColumns = () => {
    let templateColumns: string = " auto";
    for (let index = 0; index < puzzleSize; index++) {
      templateColumns += " 1fr";
    }
    return templateColumns;
  };

  const gridTemplateColumns = getGridTemplateColumns();
  const puzzleJsx = getPuzzleJsx(puzzleState, puzzleSize);

  return (
    <div className="puzzle">
      <p>Lives Left : {livesLeft}</p>
      <div className="puzzle__grid" style={{ gridTemplateColumns }}>
        {puzzleJsx}
      </div>
    </div>
  );
};

export default Puzzle;
