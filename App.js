import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useFonts, Manjari_700Bold} from '@expo-google-fonts/manjari';

import Grid from './src/icons/grid.svg'
import {Game} from "./src/components/Game";

export default function App() {
  const [loaded] = useFonts({
    'Manjari': Manjari_700Bold,
  });

  if (!loaded) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#000b32"/>
        <View style={styles.container}/>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000b32"/>
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          <Grid width="65%" height="65%"/>
        </View>
        <Game/>
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
  gridContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
