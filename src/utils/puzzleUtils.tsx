import puzzle, { puzzleNode } from "../types/puzzle";
import { basicReducer } from "./arrayUtils";
import getUniqueId from "./guidUtils";

export const getClueText = (clues: puzzleNode[]): JSX.Element[] => {
  let currentValue = 0;
  let clueJsx: JSX.Element[] = [];
  let currentSelected = true;

  for (let i = 0; i < clues.length; i++) {
    const { isCorrect, isSelected } = clues[i];

    // if we get a correct, add to current value then continue
    if (isCorrect) {
      currentValue++;
      // if any in this batch aren't selected, set to false
      if (!isSelected) {
        currentSelected = false;
      }
      continue;
    }

    // if we have nothing to add, continue
    if (currentValue === 0) {
      continue;
    }

    clueJsx.push(getClueSpan(currentSelected, currentValue));
    currentValue = 0;
    currentSelected = true;
  }

  // if we have more values or nothing in the array, add the final element
  if (clueJsx.length === 0 || currentValue > 0) {
    clueJsx.push(getClueSpan(currentSelected, currentValue));
  }

  return clueJsx;
};

//TODO: create clue component that can add top to bottom or left to right clues
const getClueSpan = (currentSelected: boolean, currentValue: number) => {
  return (
    <span
      key={getUniqueId()}
      style={{ opacity: currentSelected ? "0.4" : "1", fontSize: "0.6875rem" }}
    >
      {currentValue}
    </span>
  );
};

export const getPuzzleSize = (length: number): number => {
  const puzzleSize = Math.sqrt(length);
  if (puzzleSize % 1 !== 0) {
    throw new Error("puzzle is not a square");
  }
  return puzzleSize;
};

export const getTotalCorrectTiles = (puzzle: puzzle) => {
  if (puzzle.length === 0) {
    return [];
  }
  return puzzle
    .map(({ isCorrect }): number => {
      if (isCorrect) {
        return 1;
      }
      return 0;
    })
    .reduce(basicReducer);
};

export const getSelectedCorrectTiles = (puzzle: puzzle) => {
  if (puzzle.length === 0) {
    return [];
  }
  return puzzle
    .map(({ isCorrect, isSelected }): number => {
      if (isCorrect && isSelected) {
        return 1;
      }
      return 0;
    })
    .reduce(basicReducer);
};

// sets the grid columns to match the size of inputted puzzle
export const getPuzzleStyles = (puzzleSize: number) => {
  let gridTemplateColumns: string = " auto";
  for (let index = 0; index < puzzleSize; index++) {
    gridTemplateColumns += " 1fr";
  }

  return {
    gridTemplateColumns,
  };
};

export const getRowNodesFromIndex = (
  puzzleArr: puzzleNode[],
  index: number
): puzzleNode[] => {
  const puzzleSize = Math.sqrt(puzzleArr.length);
  // get the index of the node at the beginning of the row
  const rowBeginning = Math.floor(index / puzzleSize) * puzzleSize;
  // get the index of the last node in the row
  const rowEnding = rowBeginning + puzzleSize;
  // get all nodes in the row
  return puzzleArr.slice(rowBeginning, rowEnding);
};

export const getColumnNodesFromIndex = (
  puzzleArr: puzzleNode[],
  index: number
): puzzleNode[] => {
  const puzzleSize = Math.sqrt(puzzleArr.length);
  // get the index of the node at the beginning of the row
  const columnBeginning = index % puzzleSize;
  const columnNodes: puzzleNode[] = [];

  // add all nodes on the column
  for (let i = columnBeginning; i < puzzleArr.length; i += puzzleSize) {
    columnNodes.push(puzzleArr[i]);
  }

  return columnNodes;
};

export const handleSetToMarked = (nodes: puzzleNode[]) => {
  const correctNodes = nodes.filter(({ isCorrect }) => isCorrect);
  const selectedNodes = correctNodes.filter(({ isSelected }) => isSelected);

  // if they're the same length, we can set all incorrect nodes to marked and selected
  if (correctNodes.length !== selectedNodes.length) {
    return;
  }

  // set all the incorrect + unmarked + unselected nodes to marked and selected
  nodes
    .filter(({ isCorrect, isSelected }) => !isCorrect && !isSelected)
    .forEach((node) => {
      node.isMarked = true;
      node.isSelected = true;
    });
};

export const setNodeAsMarked = (puzzleNode: puzzleNode): puzzleNode => {
  //set new mark state to opposite of current state
  const newMarkState = !puzzleNode.isMarked;
  return {
    ...puzzleNode,
    isMarked: newMarkState,
  };
};

export const setNodeAsSelected = (puzzleNode: puzzleNode): puzzleNode => {
  return {
    ...puzzleNode,
    isSelected: true,
    isMarked: false,
  };
};
