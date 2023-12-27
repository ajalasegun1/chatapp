/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import RootStack from './src/navigation/RootStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import UserContextProvider, {useUserContext} from './src/context/UserContext';
import {StreamChat} from 'stream-chat';
import Config from 'react-native-config';
const client = StreamChat.getInstance(
  Config.STREAM_KEY ? Config.STREAM_KEY : '',
);

function App(): React.JSX.Element {
  const {setChatClient, updateChatClient} = useUserContext();

  useEffect(() => {
    // console.log('client from home', client);
    if (!client) return;
    activateClient();
  }, [client]);

  const activateClient = () => {
    updateChatClient();

    setChatClient(client);
  };
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
