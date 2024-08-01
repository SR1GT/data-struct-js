function exist(board, target) {
  const find = (row, col, index = 0) => {
    if (
      row >= board.length ||
      row < 0 ||
      col >= board[0].length ||
      col < 0 ||
      board[row][col] !== target[index]
    )
      return false;
    if (index === target.length - 1) return true;

    const temp = board[row][col];
    board[row][col] = null;
    const result =
      find(row + 1, col, index + 1) ||
      find(row - 1, col, index + 1) ||
      find(row, col + 1, index + 1) ||
      find(row, col - 1, index + 1);
    board[row][col] = temp;

    return result;
  };

  for (let row = 0; row < board.length; row++)
    for (let col = 0; col < board[row].length; col++)
      if (find(row, col, 0)) return true;
  return false;
}

console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
);
