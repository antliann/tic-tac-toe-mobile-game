import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Platform} from "react-native";
import {Dimensions} from 'react-native';

import {Board} from "./Board";
import {SettingsBar} from "./SettingsBar";

import {calculateWinner, botMind} from "../methods";

import X from '../icons/x.svg';
import O from '../icons/o.svg';

const MOVE_BUTTON_WIDTH = 0.9 * Dimensions.get('window').width / 6 - 15;
const BOT_MOVE_TIMEOUT = 600;

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
      gameHasStarted: false,
      buttonsDisabled: false,
    };
  }

  handleClick(i) {
    if ((
      !this.state.gameHasStarted && !this.state.firstIsO) || (
      this.state.firstIsO && this.state.stepNumber === 1)
    ) {
      this.setState({gameHasStarted: true});
    }

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
      this.setState({buttonsDisabled: true})
      setTimeout(() => {
        this.botMove();
        this.setState({buttonsDisabled: false});
      }, BOT_MOVE_TIMEOUT);
  }

  jumpTo(step, withReset = false) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
    if (withReset) {
      this.setState({
        history: [{
          squares: Array(9).fill(null),
        }],
        gameHasStarted: false,
      }, () => {
        if (this.state.firstIsO) this.botMove()
      });
    }
  }

  defineStatus(winner) {
    return winner ? (
        <View style={[styles.row, styles.statusTextContainer]}>
          {((winner === 'X') === this.state.firstIsO) ?
            <Text style={styles.redText}>You lose</Text> :
            <Text style={styles.greenText}>You won</Text>
          }
        </View>
      ) : (
      this.state.stepNumber < 9 ? (
          <View style={[styles.row, styles.alignCenter]}>
            <View style={styles.statusTextContainer}>
              <Text style={styles.commonText}>Current player:</Text>
            </View>
            <View>{this.state.xIsNext ? <X width={26} height={26}/> : <O width={26} height={26}/>}</View>
          </View>
        ) :
        <Text style={styles.blueText}>Draw</Text>
  )}

  getMoveButtonStyle(isSelected) {
    return {
      width: MOVE_BUTTON_WIDTH,
      height: 46,
      marginTop: 8,
      marginRight: 10,
      backgroundColor: '#000f44',
      borderRadius: 8,
      borderWidth: isSelected ? 2 : 0,
      borderColor: '#4b74ff',
      paddingTop: isSelected ? 9 : 11,
    }
  }

  renderMovesButtons() {
    if (!this.state.gameHasStarted) return <View height={54}/>

    return this.state.history.map(
      (step, move) => {
        if ((move % 2 === 0) !== this.state.firstIsO) {
          let userMove;
          if (this.state.firstIsO) userMove = (move + 1) / 2;
          else userMove = (move + 2) / 2;

          const isSelected = this.state.stepNumber === move;

          return (
            <TouchableOpacity
              key={move}
              disabled={isSelected}
              style={this.getMoveButtonStyle(isSelected)}
              onPress={() => this.jumpTo(move)}
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
            buttonsDisabled={this.state.buttonsDisabled}
          />
        </View>
        <View style={styles.movesBar}>
          <Text style={styles.commonText}>Go to the move:</Text>
          <View style={styles.row}>{this.renderMovesButtons()}</View>
        </View>
        <SettingsBar
          changeFirst={() => {
            this.setState({firstIsO: !this.state.firstIsO});
            this.jumpTo(0, true);
          }}
          changeMode={() => {
            this.setState({hardMode: !this.state.hardMode});
            this.jumpTo(0, true);
          }}
          firstIsO={this.state.firstIsO}
          hardMode={this.state.hardMode}
          newGame={() => {
            this.jumpTo(0, true)
          }}
          gameHasStarted={this.state.gameHasStarted}
        />
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
  movesBar: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 50 : 5,
    backgroundColor: '#001250',
    width: '90%',
    padding: 20,
    borderRadius: 10,
  },
  statusContainer: {
    position: "absolute",
    top: 205,
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
    fontSize: 23,
  },
  greenText: {
    fontFamily: 'Manjari',
    color: '#00b533',
    fontSize: 23,
  },
  blueText: {
    fontFamily: 'Manjari',
    color: '#4b74ff',
    fontSize: 23,
  },
  movesText: {
    fontFamily: 'Manjari',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  moveContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  statusTextContainer: {
    marginTop: 7,
    marginRight: 8,
  },
});
