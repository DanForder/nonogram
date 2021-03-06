// size is how wide/long the puzzle board is
// puzzleNodes will always be read from top left by row (based on size value)
type puzzle = {
  name: string;
  puzzleNodes: puzzleNode[];
};

export type puzzleNode = {
  isCorrect: boolean;
  isSelected?: boolean;
  color?: string;
  isMarked?: boolean;
};

export default puzzle;
