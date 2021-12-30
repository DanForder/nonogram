import puzzle, { puzzleNode } from "../../types/puzzle";
import "./Puzzle.scss";

type PuzzleType = {
  puzzle: puzzle;
};

const Puzzle: React.FC<PuzzleType> = ({ puzzle }) => {
  const getColumnClueJsx = (
    puzzleNodes: puzzleNode[],
    rowSize: number
  ): JSX.Element[] => {
    const toReturn = [<span key="empty-chart-span"></span>];

    for (let i = 0; i < rowSize; i++) {
      let columnClues = [];

      for (let j = i; j < puzzleNodes.length; j += rowSize) {
        columnClues.push(puzzleNodes[j]);
      }

      const clueText = getClueText(columnClues);
      const clueJsx = <span key={`clue-column-${i}`}>{clueText}</span>;
      toReturn.push(clueJsx);
    }

    return toReturn;
  };

  const getRowClueJsx = (index: number, rowSize: number): JSX.Element => {
    const rowClues = puzzle.puzzleNodes.slice(index, index + rowSize);
    const clueText = getClueText(rowClues);

    return <span key={`clue-${index}`}>{clueText}</span>;
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

  const getPuzzleJsx = () => {
    const { puzzleNodes, size } = puzzle;

    // initialise result array with the column clues
    let result: JSX.Element[] = [...getColumnClueJsx(puzzleNodes, size)];

    for (let i = 0; i < puzzleNodes.length; i++) {
      const node = puzzleNodes[i];

      // if we're at the beginning of a row, add a row clue
      if (i % size === 0) {
        const rowClueJsx = getRowClueJsx(i, size);
        result.push(rowClueJsx);
      }

      // add the puzzle node
      result.push(
        <span className="puzzle__node" key={i}>
          {node.isCorrect ? "O" : "X"}
        </span>
      );
    }

    return result;
  };

  const getGridTemplateColumns = () => {
    let templateColumns: string = "1fr";
    for (let index = 0; index < puzzle.size; index++) {
      templateColumns += " 1fr";
    }
    return templateColumns;
  };

  const gridTemplateColumns = getGridTemplateColumns();
  const puzzleJsx = getPuzzleJsx();

  return (
    <div className="puzzle">
      <div className="puzzle__grid" style={{ gridTemplateColumns }}>
        {puzzleJsx}
      </div>
    </div>
  );
};

export default Puzzle;
