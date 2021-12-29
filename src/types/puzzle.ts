// size is how wide/long the puzzle board is
// puzzleNodes will always be read from top left by row (based on size value)
type puzzle = {
  size: number;
  puzzleNodes: puzzleNode[];
};

type puzzleNode = {
  isCorrect: boolean;
  isSelected?: boolean;
  color?: string;
};

export default puzzle;
