export function trimBoard(board) {
  return board.replaceAll(' ', '')
}

export function setBoard(board, input) {
  const grid = [];
  let row = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === ' ') continue;
    if (char === '\n') {
      grid.push(row);
      row = [];
      continue;
    }
    row.push(char);
  }
  grid.push(row)
  board.setGrid(grid);
}