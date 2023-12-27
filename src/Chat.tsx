import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useUserContext} from './context/UserContext';
import {
  ChannelList,
  Chat as ChatComponent,
  OverlayProvider,
} from 'stream-chat-react-native';

const Chat = () => {
  const {user, client} = useUserContext();
  const [userSet, setUserSet] = useState(false);

  useEffect(() => {
    // console.log({user, client});
    if (!client) return;
    if (!user) return;

    const connectUser = async () => {
      try {
        await client.connectUser(
          {id: user.name, name: user.name, image: user.image},
          client.devToken(user.name),
        );
        setUserSet(true);
      } catch (error) {
        console.log({error});
      }
    };
    connectUser();

    const disconnectUser = async () => {
      await client.disconnectUser();
    };

    return () => {
      disconnectUser();
    };
  }, []);

  useEffect(() => {
    if (!userSet) return;
    const createChannel = async () => {
      const globalChannel = client?.channel('livestream', 'global', {
        name: "Segun's Group",
      });
      await globalChannel?.watch();
    };

    createChannel();
  }, [userSet]);

  return (
    <OverlayProvider>
      {!client ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <ChatComponent client={client}>
          <View style={styles.container}>
            <ChannelList />
          </View>
        </ChatComponent>
      )}
    </OverlayProvider>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
