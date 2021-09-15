import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Dimensions} from 'react-native';

import {Board} from "./Board";

import {calculateWinner, botMind} from "../methods";

import X from '../icons/x.svg';
import O from '../icons/o.svg';

const MOVE_BUTTON_WIDTH = 0.9 * Dimensions.get('window').width / 5 - 16;

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
        <Text style={styles.redText}>You lose</Text> :
        <Text style={styles.greenText}>You won</Text> :
      this.state.stepNumber < 9 ? (
          <View style={styles.row}>
            <Text style={styles.commonText}>Current player:</Text>
            <View>{this.state.xIsNext ? <X width={30}/> : <O width={30}/>}</View>
          </View>
        ) :
        <Text>Draw</Text>;
  }

  getMoveButtonStyle(isSelected) {
    return {
      width: MOVE_BUTTON_WIDTH,
      height: 50,
      marginTop: 8,
      marginRight: 10,
      backgroundColor: '#000f44',
      borderRadius: 5,
      borderWidth: isSelected ? 2 : 0,
      borderColor: '#4b74ff',
      paddingTop: isSelected ? 6 : 8,
    }
  }

  renderMovesButtons() {
    if (!this.state.history.slice(1).length) return <View height={58}/>
    return this.state.history.slice(1).map(
      (step, move) => {
        if ((move % 2 === 0) !== this.state.firstIsO) {
          let userMove;
          if (this.state.firstIsO) userMove = (move + 1) / 2;
          else userMove = (move + 2) / 2;

          const isSelected = this.state.stepNumber === move + 1;

          return (
            <TouchableOpacity
              key={move}
              disabled={isSelected}
              style={this.getMoveButtonStyle(isSelected)}
              onPress={() => this.jumpTo(move + 1)}
            >
              <View style={styles.moveContainer}>
                <Text style={styles.movesText}>{userMove}</Text>
              </View>
            </TouchableOpacity>
          )
        }
      });
  }

  render() {
    const current = this.state.history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    return (
      <View style={styles.container}>
        <View style={styles.boardContainer}>
          <Board
            squares={current.squares}
            onCellPress={(i) => this.userClick(i)}
          />
        </View>
        <View style={styles.movesBarContainer}>
          <Text style={styles.commonText}>Go to the move:</Text>
          <View style={styles.row}>{this.renderMovesButtons()}</View>
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
    top: 50,
    backgroundColor: '#001250',
    width: '90%',
    padding: 20,
    borderRadius: 10,
  },
  statusContainer: {
    position: "absolute",
    bottom: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commonText: {
    fontFamily: 'Manjari',
    color: 'white',
    fontSize: 20,
  },
  redText: {
    fontFamily: 'Manjari',
    color: '#cf0000',
    fontSize: 22,
  },
  greenText: {
    fontFamily: 'Manjari',
    color: '#00b533',
    fontSize: 22,
  },
  movesText: {
    fontFamily: 'Manjari',
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
  moveContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  }
});
