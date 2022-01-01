export const getLocalStorageItem = (key: string): string | null => {
  //get encryted item with encrypted key
  const encryptedKey = window.btoa(key);
  const item = window.localStorage.getItem(encryptedKey);

  return item ? window.atob(item) : null;
};

export const setLocalStorageItem = (key: string, item: string): void => {
  const encryptedItem = window.btoa(item);
  const encryptedKey = window.btoa(key);

  window.localStorage.setItem(encryptedKey, encryptedItem);
};

export const isPuzzleCompleted = (puzzleIndex: number) => {
  return getLocalStorageItem(`puzzle_${puzzleIndex}`) === "true";
};

export const setPuzzleCompleteState = (
  puzzleId: number,
  isComplete: boolean
) => {
  setLocalStorageItem(`puzzle_${puzzleId}`, isComplete.toString());
};
