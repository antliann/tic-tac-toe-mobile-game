import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import Grid from './src/icons/grid.svg'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#000b32"/>
      </SafeAreaView>
      <View style={styles.container}>
        <Grid width="65%" height="65%"/>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000b32',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
