import puzzle, { puzzleNode } from "../types/puzzle";
import { basicReducer } from "./arrayUtils";

export const getClueText = (clues: puzzleNode[]): string => {
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
