import { puzzleNode } from "../types/puzzle";

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
