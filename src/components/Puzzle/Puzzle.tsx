import { useEffect, useState } from "react";
import puzzle, { puzzleNode } from "../../types/puzzle";
import {
  getClueText,
  getPuzzleSize,
  getPuzzleStyles,
  getSelectedCorrectTiles,
  getTotalCorrectTiles,
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
  const [livesLeft, setLivesLeft] = useState(3);
  const [navigating, setNavigating] = useState(false);
  const [penSelected, setPenSelected] = useState(true);

  const puzzleSize = getPuzzleSize(puzzleState.length);
  const selectedCorrectTiles = getSelectedCorrectTiles(puzzleState);
  const totalCorrectTiles = getTotalCorrectTiles(puzzleState);

  useEffect(() => {
    setPuzzleState([...puzzle]);
    setNavigating(false);
  }, [puzzle]);

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

  const getRowNodesFromIndex = (
    puzzleArr: puzzleNode[],
    index: number
  ): puzzleNode[] => {
    // get the index of the node at the beginning of the row
    const rowBeginning = Math.floor(index / puzzleSize) * puzzleSize;
    // get the index of the last node in the row
    const rowEnding = rowBeginning + puzzleSize;
    // get all nodes in the row
    return puzzleArr.slice(rowBeginning, rowEnding);
  };

  const getColumnNodesFromIndex = (
    puzzleArr: puzzleNode[],
    index: number
  ): puzzleNode[] => {
    // get the index of the node at the beginning of the row
    const columnBeginning = index % puzzleSize;
    const columnNodes: puzzleNode[] = [];

    // add all nodes on the column
    for (let i = columnBeginning; i < puzzleArr.length; i += puzzleSize) {
      columnNodes.push(puzzleArr[i]);
    }

    return columnNodes;
  };

  const handleRowCheck = (puzzleArr: puzzleNode[], index: number) => {
    const rowNodes = getRowNodesFromIndex(puzzleArr, index);
    const correctNodes = rowNodes.filter(({ isCorrect }) => isCorrect);
    const selectedNodes = correctNodes.filter(({ isSelected }) => isSelected);

    // if they're the same length, we can set all incorrect nodes to marked and selected
    if (correctNodes.length !== selectedNodes.length) {
      return;
    }

    // set all the incorrect + unmarked + unselected nodes to marked and selected
    rowNodes
      .filter(
        ({ isCorrect, isSelected, isMarked }) =>
          !isCorrect && !isSelected && !isMarked
      )
      .forEach((node) => {
        node.isMarked = true;
        node.isSelected = true;
      });
  };

  const handleColumnCheck = (puzzleArr: puzzleNode[], index: number) => {
    const columnNodes = getColumnNodesFromIndex(puzzleArr, index);
    const correctNodes = columnNodes.filter(({ isCorrect }) => isCorrect);
    const selectedNodes = correctNodes.filter(({ isSelected }) => isSelected);

    // if they're the same length, we can set all incorrect nodes to marked and selected
    if (correctNodes.length !== selectedNodes.length) {
      return;
    }

    // set all the incorrect + unmarked + unselected nodes to marked and selected
    columnNodes
      .filter(
        ({ isCorrect, isSelected, isMarked }) =>
          !isCorrect && !isSelected && !isMarked
      )
      .forEach((node) => {
        node.isMarked = true;
        node.isSelected = true;
      });
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

  const setNodeAsMarked = (puzzleNode: puzzleNode): puzzleNode => {
    //set new mark state to opposite of current state
    const newMarkState = !puzzleNode.isMarked;
    return {
      ...puzzleNode,
      isMarked: newMarkState,
    };
  };

  const setNodeAsSelected = (puzzleNode: puzzleNode): puzzleNode => {
    return {
      ...puzzleNode,
      isSelected: true,
      isMarked: false,
    };
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
        handleRowCheck(tempPuzzleArr, index);
        handleColumnCheck(tempPuzzleArr, index);
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

  const puzzleStyles = getPuzzleStyles(puzzleSize);
  const puzzleJsx = getPuzzleJsx(puzzleState, puzzleSize);

  return (
    <div className="puzzle">
      <p>Lives Left : {livesLeft}</p>
      <div className="puzzle__grid" style={puzzleStyles}>
        {puzzleJsx}
      </div>
      <SwitchButton
        penSelected={penSelected}
        updatePenSelected={setPenSelected}
      />
    </div>
  );
};

export default Puzzle;
