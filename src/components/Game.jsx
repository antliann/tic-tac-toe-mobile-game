import React from "react";
import {View, Text} from "react-native";

import {Board} from "./Board";

import {calculateWinner, botMind} from "../methods";

import X from '../icons/x.svg';
import O from '../icons/o.svg';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      firstIsO: false,
      hardMode: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || (squares[i])) {
      return false;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    return true;
  }

  botMove() {
    this.handleClick(botMind(this.state.history, this.state.hardMode));
  }

  userClick(i) {
    if (this.handleClick(i))
      setTimeout(() => this.botMove(), 400);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
    if (!step) {
      this.setState({
        history: [{
          squares: Array(9).fill(null),
        }],
      }, () => {
        if (this.state.firstIsO) this.botMove()
      });
    }
  }

  defineStatus(winner) {
    return winner ?
      ((winner === 'X') === this.state.firstIsO) ?
        <Text className='red'>You lose</Text> :
        <Text className='green'>You won</Text> :
      this.state.stepNumber < 9 ?
        [
          'Current player:',
          <View className='little-sign'> {this.state.xIsNext ? <X /> : <O />} </View>
        ] :
        <Text>Draw</Text>;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.slice(1).map(
      (step, move) => {
        if ((move % 2 === 0) !== this.state.firstIsO) {
          let userMove;
          if (this.state.firstIsO) userMove = (move + 1) / 2;
          else userMove = (move + 2) / 2;
          const desc = 'Move #' + userMove;
          if (this.state.stepNumber !== move + 1)
            return (
              <button key={move} className='move-button' onClick={() => this.jumpTo(move + 1)}>
                {desc}
              </button>
            )
          else
            return (
              <button key={move} className='move-button selected'>
                {desc}
              </button>
            );
        }
      });

    return (
      <View className="game">
        <View className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.userClick(i)}
          />
        </View>
        <View className="right">
          <h2>Go to the move:</h2>
          {moves}
        </View>
        <View className="game-info">
          {this.defineStatus(winner)}
        </View>
      </View>
    );
  }
}

export {Game};
