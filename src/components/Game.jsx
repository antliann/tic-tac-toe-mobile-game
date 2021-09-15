import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Dimensions} from 'react-native';

import {Board} from "./Board";

import {calculateWinner, botMind} from "../methods";

import X from '../icons/x.svg';
import O from '../icons/o.svg';
import Grid from "../icons/grid.svg";

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
      this.state.stepNumber < 9 ? (
          <View>
            <Text>Current player:</Text>
            <View className='little-sign'>{this.state.xIsNext ? <X/> : <O/>}</View>
          </View>
        ) :
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
          const description = 'Move #' + userMove;
          if (this.state.stepNumber !== move + 1)
            return (
              <TouchableOpacity key={move} className='move-button' onClick={() => this.jumpTo(move + 1)}>
                <Text>{description}</Text>
              </TouchableOpacity>
            )
          else
            return (
              <TouchableOpacity key={move} className='move-button selected'>
                <Text>{description}</Text>
              </TouchableOpacity>
            );
        }
      });

    return (
      <View style={styles.container}>
        <View style={styles.boardContainer}>
          <Board
            squares={current.squares}
            onCellPress={(i) => this.userClick(i)}
          />
        </View>
        <View style={styles.movesBarContainer}>
          <Text>Go to the move:</Text>
          {moves}
        </View>
        <View style={styles.statusContainer}>
          {this.defineStatus(winner)}
        </View>
      </View>
    );
  }
}

export {Game};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    flex: 1,
    width: '67%',
    height: 0.67 * Dimensions.get('window').width,
    position: "absolute",
    alignItems: 'center',
    justifyContent: 'center',
  },
  movesBarContainer: {
    position: "absolute",
    top: 0,
  },
  statusContainer: {
    position: "absolute",
    bottom: '20%',
  }
});
