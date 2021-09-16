import React from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";

import X from '../icons/x.svg';
import O from '../icons/o.svg';
import NewGameIcon from '../icons/newGame.svg';

class SettingsBar extends React.Component {
  getPlayAsButtonStyle(isSelected) {
    return {
      marginBottom: 8,
      marginRight: 10,
      backgroundColor: '#000f44',
      borderRadius: 8,
      borderWidth: isSelected ? 2 : 0,
      borderColor: '#4b74ff',
      height: 46,
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 0,
      flex: 0,
    }
  }

  getModeButtonStyle(isSelected) {
    return {
      marginBottom: 8,
      marginRight: 10,
      backgroundColor: '#000f44',
      borderRadius: 8,
      borderWidth: isSelected ? 2 : 0,
      borderColor: '#4b74ff',
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 46,
      paddingTop: isSelected ? 7 : 9,
    }
  }

  render() {
    return (
      <View style={styles.bar}>
        <View>
          <Text style={styles.commonText}>Play as:</Text>
          <View style={styles.alignCenter}>
            <TouchableOpacity
              disabled={!this.props.firstIsO || this.props.gameHasStarted}
              onPress={this.props.changeFirst}
              style={this.getPlayAsButtonStyle(!this.props.firstIsO)}>
              <X width={26} height={26}/>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.props.firstIsO || this.props.gameHasStarted}
              onPress={this.props.changeFirst}
              style={this.getPlayAsButtonStyle(this.props.firstIsO)}>
              <O width={26} height={26}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flex}>
          <Text style={styles.commonText}>Game mode</Text>
          <TouchableOpacity
            disabled={!this.props.hardMode}
            onPress={this.props.changeMode}
            style={this.getModeButtonStyle(!this.props.hardMode)}>
            <Text style={styles.commonText}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={this.props.hardMode}
            onPress={this.props.changeMode}
            style={this.getModeButtonStyle(this.props.hardMode)}>
            <Text style={styles.commonText}>Hard</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.justifyCenter}>
          <TouchableOpacity onPress={this.props.newGame}>
            <NewGameIcon />
          </TouchableOpacity>
        </View>
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
    padding: 16,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 180,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  commonText: {
    fontFamily: 'Manjari',
    color: 'white',
    fontSize: 20,
    textAlign: "center",
    padding: 6,
    paddingBottom: 8,
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  noGrow: {
    flex: 0,
    flexGrow: 0
  }
});

export {SettingsBar};
