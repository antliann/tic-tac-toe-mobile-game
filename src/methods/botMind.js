import {hardModeAlgorithm} from "./hardModeAlgorithm";
import {calculateWinner} from "./calculateWinner";

function botMind(history, hardMode) {
  let squares = history[history.length - 1].squares.slice();
  let filledSquares = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) filledSquares++;
  }
  let bot = (filledSquares % 2 === 0) ? 'X' : 'O';
  let user = (filledSquares % 2 === 0) ? 'O' : 'X';

  // First compulsive rule
  let compulsiveMove = fillThreeInARow(squares, bot);
  if (compulsiveMove) return compulsiveMove;

  // Second compulsive rule
  compulsiveMove = fillThreeInARow(squares, user);
  if (compulsiveMove) return compulsiveMove;

  let possibleMoves = hardMode ? hardModeAlgorithm(squares, history) : [];

  if (possibleMoves.length === 0) {
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) possibleMoves.push(i);
    }
  }
  return possibleMoves[Math.floor(Math.random() * (possibleMoves.length))];
}

function fillThreeInARow(squares, player) {
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = player;
      if (calculateWinner(squares) === player) {
        squares[i] = null;
        return i;
      }
      squares[i] = null;
    }
  }
  return null;
}

export {botMind};
