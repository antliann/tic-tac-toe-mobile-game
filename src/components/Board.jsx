import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Dimensions} from "react-native";

import X from '../icons/x.svg';
import O from '../icons/o.svg';

const CELL_WIDTH = 0.2 * Dimensions.get('window').width;

class Board extends React.Component {
  renderIcon(sign) {
    switch (sign) {
      case 'X':
        return <X width={CELL_WIDTH}/>;
      case 'O':
        return <O width={CELL_WIDTH}/>;
      default:
        return <View width={CELL_WIDTH} height={CELL_WIDTH}/>;
    }
  }

  renderSquare(i) {
    const onCellPress = () => this.props.onCellPress(i);
    return (
      <View style={styles.cellContainer}>
        <TouchableOpacity
          onPress={onCellPress}
          key={'square' + i}
          disabled={this.props.buttonsDisabled}
        >
          {this.renderIcon(this.props.squares[i])}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let result = [];
    for (let row = 0; row < 3; row++) {
      let currentRow = [];
      for (let col = 0; col < 3; col++) {
        currentRow.push(this.renderSquare(row * 3 + col));
      }
      result.push(<View style={styles.cellsRowContainer}>{currentRow}</View>);
    }
    return result;
  }
}

const styles = StyleSheet.create({
  cellContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellsRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export {Board};
