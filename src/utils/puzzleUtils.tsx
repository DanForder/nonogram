import { v4 as uuidv4 } from "uuid";
import puzzle, { puzzleNode } from "../types/puzzle";
import { basicReducer } from "./arrayUtils";

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

const getClueSpan = (currentSelected: boolean, currentValue: number) => {
  return (
    <span
      key={`clue-${uuidv4()}`}
      style={{ opacity: currentSelected ? "0.4" : "1" }}
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
