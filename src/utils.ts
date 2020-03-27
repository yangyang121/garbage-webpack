export const shuffleKeyboard = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let i = arr.length - 1;
  while (i > 0) {
    const changeNum = Math.floor(Math.random() * (i - 1));
    [arr[i], arr[changeNum]] = [arr[changeNum], arr[i]];
    i--;
  }
  return arr;
};
