import { v4 as uuidv4 } from "uuid";
import puzzle, { puzzleNode } from "../types/puzzle";
import { basicReducer } from "./arrayUtils";

export const getClueText = (clues: puzzleNode[]): JSX.Element[] => {
  let currentValue = 0;
  let clueJsx: JSX.Element[] = [];
  let currentSelected = true;

  for (let i = 0; i < clues.length; i++) {
    const { isCorrect, isSelected } = clues[i];

    // if we get a correct, add to current value, and check if it's selected
    if (isCorrect) {
      currentValue++;
      currentSelected = isSelected ?? false;
    }

    // if we have nothing to add, continue
    if (currentValue === 0) {
      continue;
    }

    // add a new tile if it's a blank or the very last tile in the set
    if (!isCorrect || i === clues.length - 1) {
      clueJsx.push(
        <span
          key={`clue-${uuidv4()}`}
          style={{ opacity: currentSelected ? "0.4" : "1" }}
        >
          {currentValue}
        </span>
      );
      currentValue = 0;
    }
  }

  return clueJsx;
};

export const getPuzzleSize = (length: number): number => {
  const puzzleSize = Math.sqrt(length);
  if (puzzleSize % 1 !== 0) {
    throw new Error("puzzle is not a square");
  }
  return puzzleSize;
};

export const getTotalCorrectTiles = (puzzle: puzzle) => {
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
  return puzzle
    .map(({ isCorrect, isSelected }): number => {
      if (isCorrect && isSelected) {
        return 1;
      }
      return 0;
    })
    .reduce(basicReducer);
};
