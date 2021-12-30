import { useMemo } from "react";
import puzzle from "../../types/puzzle";
import "./Puzzle.scss";

type PuzzleType = {
  puzzle: puzzle;
};

const Puzzle: React.FC<PuzzleType> = ({ puzzle }) => {
  //   console.log(puzzle);

  const getRowClueJsx = (index: number, rowSize: number): JSX.Element => {
    const rowClues = puzzle.puzzleNodes.slice(index, index + rowSize);
    let clueText = "";
    let currentValue = 0;
    for (let i = 0; i < rowClues.length; i++) {
      const element = rowClues[i];
      //   console.log({ element });

      if (element.isCorrect) {
        // console.log("adding to value");
        currentValue++;
      } else {
        if (currentValue > 0) {
          clueText += currentValue + " ";
          //   console.log("adding current value to text");
          currentValue = 0;
        }
      }

      if (i === rowClues.length - 1 && currentValue > 0) {
        clueText += currentValue;
      }
    }

    console.log(clueText);

    return <span key={`clue-${index}`}>{clueText}</span>;
  };

  const getPuzzleJsx = () => {
    const { puzzleNodes, size } = puzzle;
    let result: JSX.Element[] = [];

    for (let i = 0; i < puzzleNodes.length; i++) {
      const node = puzzleNodes[i];

      if (i % size === 0) {
        const rowClueJsx = getRowClueJsx(i, size);
        result.push(rowClueJsx);
      }

      result.push(
        <span className="puzzle__node" key={i}>
          {node.isCorrect ? "O" : "X"}
        </span>
      );
    }

    return result;
  };

  const gridTemplateColumns = useMemo(() => {
    let templateColumns: string = "1fr";
    for (let index = 0; index < puzzle.size; index++) {
      templateColumns += " 1fr";
    }
    return templateColumns;
  }, [puzzle.size]);

  const barry = getPuzzleJsx();
  //   console.log(barry);

  return (
    <div className="puzzle">
      <div className="puzzle__grid" style={{ gridTemplateColumns }}>
        {barry}
      </div>
    </div>
  );
};

export default Puzzle;
