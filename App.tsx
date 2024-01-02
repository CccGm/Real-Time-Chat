/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
  },
};

function App(): React.JSX.Element {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'lightgreen'} />
        <SafeAreaView style={{flex: 1}}>
          <SignUpScreen />
        </SafeAreaView>
      </PaperProvider>
    </>
  );
}

export default App;
