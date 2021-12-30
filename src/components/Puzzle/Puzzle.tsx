import puzzle, { puzzleNode } from "../../types/puzzle";
import PuzzleNode from "../PuzzleNode/PuzzleNode";
import "./Puzzle.scss";

type PuzzleType = {
  puzzle: puzzle;
};

const Puzzle: React.FC<PuzzleType> = ({ puzzle }) => {
  const puzzleSize = Math.sqrt(puzzle.length);
  if (puzzleSize % 1 !== 0) {
    throw new Error("puzzle is not a square");
  }

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

  const getClueText = (clues: puzzleNode[]): string => {
    let clueText = "";
    let currentValue = 0;

    for (let i = 0; i < clues.length; i++) {
      const element = clues[i];

      if (element.isCorrect) {
        currentValue++;
      } else {
        if (currentValue > 0) {
          clueText += currentValue + " ";
          currentValue = 0;
        }
      }

      if (i === clues.length - 1 && currentValue > 0) {
        clueText += currentValue;
      }
    }

    return clueText;
  };

  const getPuzzleJsx = (puzzle: puzzle, size: number) => {
    // initialise result array with the column clues
    let result: JSX.Element[] = [...getColumnClueJsx(puzzle, puzzleSize)];

    for (let index = 0; index < puzzle.length; index++) {
      const node = puzzle[index];

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
    const { isCorrect } = puzzle[index];
    console.log(`${isCorrect ? "Correct" : "Incorrect"} choice!`);
  };

  const createPuzzleNode = (puzzleNode: puzzleNode, index: number) => {
    const color = puzzleNode.isCorrect ? "dodgerblue" : "red";

    return (
      <PuzzleNode
        key={`puzzle-node-${index}`}
        color={color}
        isRevealed={puzzleNode.isSelected}
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

  const puzzleJsx = getPuzzleJsx(puzzle, puzzleSize);

  return (
    <div className="puzzle">
      <div className="puzzle__grid" style={{ gridTemplateColumns }}>
        {puzzleJsx}
      </div>
    </div>
  );
};

export default Puzzle;
