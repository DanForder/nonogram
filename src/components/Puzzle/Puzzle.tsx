import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import puzzle, { puzzleNode } from "../../types/puzzle";
import {
  getClue,
  getColumnNodesFromIndex,
  getPuzzleSize,
  getPuzzleStyles,
  getRowNodesFromIndex,
  getSelectedCorrectTiles,
  getTotalCorrectTiles,
  handleSetToMarked,
  setNodeAsMarked,
  setNodeAsSelected,
} from "../../utils/puzzleUtils";
import PuzzleHud from "../PuzzleHud/PuzzleHud";
import PuzzleNode from "../PuzzleNode/PuzzleNode";
import "./Puzzle.scss";

type PuzzleType = {
  puzzle: puzzle;
  nextPuzzleLink: string;
  onComplete: any;
};

const Puzzle: React.FC<PuzzleType> = ({
  puzzle,
  nextPuzzleLink,
  onComplete,
}) => {
  const [puzzleState, setPuzzleState] = useState<puzzleNode[]>([]);
  const [lives, setLives] = useState(4);
  const [penSelected, setPenSelected] = useState(true);
  const [isWin, setIsWin] = useState(false);

  const puzzleSize = getPuzzleSize(puzzleState.length);
  const selectedCorrectTiles = getSelectedCorrectTiles(puzzleState);
  const totalCorrectTiles = getTotalCorrectTiles(puzzleState);

  const getAutofilledPuzzle = useCallback((puzzleArr: puzzleNode[]) => {
    const size = Math.sqrt(puzzleArr.length);
    const edgeIndexes = [];

    // start by adding top row indexes
    for (let i = 1; i < size; i++) {
      edgeIndexes.push(i);
    }

    // now add left-hand size indexes
    for (let i = size; i < puzzleArr.length; i += size) {
      edgeIndexes.push(i);
    }

    // autofill for each of these nodes
    edgeIndexes.forEach((index) => {
      handleAutofill(puzzleArr, index);
    });

    return puzzleArr;
  }, []);

  useEffect(() => {
    // when loading a new puzzle, do an initial autofill check
    setPuzzleState(getAutofilledPuzzle([...puzzle.puzzleNodes]));
    setLives(4);
    setPenSelected(true);
    setIsWin(false);
  }, [getAutofilledPuzzle, puzzle, setIsWin]);

  useEffect(() => {
    if (selectedCorrectTiles === totalCorrectTiles && !isWin) {
      setIsWin(true);
      onComplete();
    }
  }, [isWin, onComplete, selectedCorrectTiles, totalCorrectTiles]);

  useEffect(() => {
    if (lives === 0) {
      window.alert("you lost!");
      window.location.reload();
    }
  }, [lives]);

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

      const clue = getClue(columnClues, true, `clue-column-${i}`);
      toReturn.push(clue);
    }

    return toReturn;
  };

  const getRowClueJsx = (
    currentRowIndex: number,
    rowSize: number
  ): JSX.Element => {
    const rowClues = puzzleState.slice(
      currentRowIndex,
      currentRowIndex + rowSize
    );
    const clue = getClue(rowClues, false, `clue-${currentRowIndex}`);

    return clue;
  };

  const handleAutofill = (puzzleArr: puzzleNode[], index: number) => {
    const rowNodes = getRowNodesFromIndex(puzzleArr, index);
    const columnNodes = getColumnNodesFromIndex(puzzleArr, index);

    handleSetToMarked(rowNodes);
    handleSetToMarked(columnNodes);
  };

  const getPuzzleJsx = (puzzleNodes: puzzleNode[], size: number) => {
    // initialise result array with the column clues
    let result: JSX.Element[] = [...getColumnClueJsx(puzzleNodes, puzzleSize)];

    for (let index = 0; index < puzzleNodes.length; index++) {
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
    const { isCorrect, isSelected, isMarked } = puzzleState[index];

    // don't let user mark an already marked or revealed node
    if (isSelected || (isMarked && penSelected)) {
      return;
    }

    const tempPuzzleArr = [...puzzleState];
    let puzzleNode = tempPuzzleArr[index];

    //TODO: refactor this dirty nested if/else statement
    if (penSelected) {
      tempPuzzleArr[index] = setNodeAsSelected(puzzleNode);

      if (isCorrect) {
        // check for row or column completion, mark any crosses as isMarked and isRevealed if necessary
        handleAutofill(tempPuzzleArr, index);
      } else {
        setLives(lives - 1);
      }
    } else {
      tempPuzzleArr[index] = setNodeAsMarked(puzzleNode);
    }

    setPuzzleState(tempPuzzleArr);
  };

  const createPuzzleNode = (
    { color, isSelected, isCorrect, isMarked }: puzzleNode,
    index: number
  ) => (
    <PuzzleNode
      key={`puzzle-node-${index}`}
      color={color}
      isRevealed={isSelected}
      failState={!isCorrect && isSelected}
      onClick={() => {
        handleNodeClick(index);
      }}
      isMarked={isMarked}
    />
  );

  const puzzleStyles = getPuzzleStyles(puzzleSize);
  const puzzleJsx = getPuzzleJsx(puzzleState, puzzleSize);

  // TODO: extract win to separate version within HUD component
  return (
    <div className="puzzle">
      <div className="puzzle__grid" style={puzzleStyles}>
        {puzzleJsx}
      </div>
      {isWin ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            paddingTop: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "2.5rem",
              textAlign: "center",
            }}
          >
            {puzzle.name}
          </span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              style={{
                backgroundColor: "#201e22",
                padding: "1rem",
                borderRadius: "0.65rem",
              }}
              to={nextPuzzleLink}
            >
              next ➡️
            </Link>
          </div>
        </div>
      ) : (
        <PuzzleHud
          lives={lives}
          penSelected={penSelected}
          setPenSelected={setPenSelected}
        />
      )}
    </div>
  );
};

export default Puzzle;
