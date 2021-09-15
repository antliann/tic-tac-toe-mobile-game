import React from "react";
import {Button, View} from "react-native";

import X from '../icons/x.svg';
import O from '../icons/o.svg';

class Board extends React.Component {
  renderSquare(i) {
    const onCellPress = () => this.props.onCellPress(i);
    return (
      <Button
        onPress={onCellPress}
        key={'square' + i}
      >
        {this.props.squares[i] === 'X' && <X/>}
        {this.props.squares[i] === 'O' && <O/>}
      </Button>
    );
  }

  render() {
    let result = [];
    for (let row = 0; row < 3; row++) {
      let currentRow = [];
      for (let col = 0; col < 3; col++) {
        currentRow.push(this.renderSquare(row * 3 + col));
      }
      result.push(<View>{currentRow}</View>);
    }
    return result;
  }
}

export {Board};
