import React from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";

import X from '../icons/x.svg';
import O from '../icons/o.svg';

class SettingsBar extends React.Component {
  getButtonStyle(isSelected) {
    return {
      marginTop: 8,
      marginRight: 10,
      backgroundColor: '#000f44',
      borderRadius: 5,
      borderWidth: isSelected ? 2 : 0,
      borderColor: '#4b74ff',
      padding: isSelected ? 8 : 10,
      alignItems: 'center',
      flexGrow: 0,
    }
  }

  render() {
    return (
      <View style={styles.bar}>
        <View>
          <Text style={styles.commonText}>Play as:</Text>
          <View style={styles.row}>
            <TouchableOpacity
              disabled={!this.props.firstIsO || this.props.gameHasStarted}
              onPress={this.props.changeFirst}
              style={this.getButtonStyle(!this.props.firstIsO)}>
              <X width={30}/>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.props.firstIsO || this.props.gameHasStarted}
              onPress={this.props.changeFirst}
              style={this.getButtonStyle(this.props.firstIsO)}>
              <O width={30}/>
            </TouchableOpacity>
          </View>
        </View>
        <Text>Game mode</Text>
        <View>
          <TouchableOpacity disabled={!this.props.hardMode} onPress={this.props.changeMode}>
            <Text>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={this.props.hardMode} onPress={this.props.changeMode}>
            <Text>Hard</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.props.newGame}>
          <Text>New game</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    bottom: 0,
    backgroundColor: '#001250',
    width: '90%',
    padding: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 150,
    flexDirection: 'row',
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
});

export {SettingsBar};
