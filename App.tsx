/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import RootStack from './src/navigation/RootStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import UserContextProvider from './src/context/UserContext';
import {StreamChat} from 'stream-chat';
import Config from 'react-native-config';

function App(): React.JSX.Element {
  const client = StreamChat.getInstance('');
  console.log({check: Config.STREAM_KEY, platform: Platform.OS});
  return (
    <SafeAreaProvider>
      <UserContextProvider>
        <RootStack />
      </UserContextProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
