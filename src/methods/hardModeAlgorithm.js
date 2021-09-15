function hardModeAlgorithm(squares, history) {
  if (!squares[4]) return [4];

  let possibleMoves;
  let properCell = Math.abs(lastMove(history) - 8);

  if (properCell === 2 || properCell === 6)
    possibleMoves = [properCell - 1, properCell + 1];
  else if (properCell === 3)
    possibleMoves = [0, 6];
  else if (properCell === 5)
    possibleMoves = [2, 8];
  else possibleMoves = [properCell];

  removeFilled(possibleMoves, squares);

  if (possibleMoves.length === 0 || properCell === 4) {
    possibleMoves = [0, 2, 6, 8];
    removeFilled(possibleMoves, squares);
  }
  return possibleMoves;
}

function removeFilled(possibleMoves, squares) {
  let counter = 0;
  for (let i = 0; i < possibleMoves.length + counter; i++) {
    if (squares[possibleMoves[i - counter]]) {
      possibleMoves.splice(i - counter, 1);
      counter++;
    }
  }
}

function lastMove(history) {
  for (let i = 0; i < 9; i++) {
    if (history[history.length - 1].squares[i] !== history[history.length - 2].squares[i]) {
      return i;
    }
  }
}

export {hardModeAlgorithm};
