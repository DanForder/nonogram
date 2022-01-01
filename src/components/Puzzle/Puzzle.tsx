import { useCallback, useEffect, useState } from "react";
import puzzle, { puzzleNode } from "../../types/puzzle";
import {
  getClueText,
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
import PuzzleNode from "../PuzzleNode/PuzzleNode";
import SwitchButton from "../RadioTileGroup/RadioTileGroup";
import "./Puzzle.scss";

type PuzzleType = {
  puzzle: puzzle;
  onComplete: any;
};

const Puzzle: React.FC<PuzzleType> = ({ puzzle, onComplete }) => {
  const [puzzleState, setPuzzleState] = useState<puzzle>([]);
  const [livesLeft, setLivesLeft] = useState(4);
  const [navigating, setNavigating] = useState(false);
  const [penSelected, setPenSelected] = useState(true);

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
    setPuzzleState(getAutofilledPuzzle([...puzzle]));
    setLivesLeft(4);
    setNavigating(false);
  }, [getAutofilledPuzzle, puzzle]);

  useEffect(() => {
    if (selectedCorrectTiles === totalCorrectTiles && !navigating) {
      setNavigating(true);
      window.alert("you won! moving to next level");
      onComplete();
    }
  }, [navigating, onComplete, selectedCorrectTiles, totalCorrectTiles]);

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
    const rowClues = puzzleState.slice(
      currentRowIndex,
      currentRowIndex + rowSize
    );
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

  const handleAutofill = (puzzleArr: puzzleNode[], index: number) => {
    const rowNodes = getRowNodesFromIndex(puzzleArr, index);
    const columnNodes = getColumnNodesFromIndex(puzzleArr, index);

    handleSetToMarked(rowNodes);
    handleSetToMarked(columnNodes);
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
    const { isCorrect, isSelected, isMarked } = puzzleState[index];

    if (isSelected || (isMarked && penSelected)) {
      console.log("attempted to change a marked or revealed node");
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
        setLivesLeft(livesLeft - 1);
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

  const getLivesText = (lives: number) => {
    let livesText = "";

    for (let i = 0; i < lives; i++) {
      livesText += "❤️";
    }

    return livesText;
  };

  const puzzleStyles = getPuzzleStyles(puzzleSize);
  const puzzleJsx = getPuzzleJsx(puzzleState, puzzleSize);

  return (
    <div className="puzzle">
      <div className="puzzle__grid" style={puzzleStyles}>
        {puzzleJsx}
      </div>
      <div className="puzzle__hud">
        <fieldset className="puzzle__life-count">
          <legend>Lives Left</legend>
          <span className="puzzle__life-count-hearts">
            {getLivesText(livesLeft)}
          </span>
        </fieldset>
        <SwitchButton
          penSelected={penSelected}
          updatePenSelected={setPenSelected}
        />
      </div>
    </div>
  );
};

export default Puzzle;
