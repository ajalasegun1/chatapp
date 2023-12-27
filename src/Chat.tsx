import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useUserContext} from './context/UserContext';
import {
  ChannelList,
  Chat as ChatComponent,
  DefaultStreamChatGenerics,
  OverlayProvider,
} from 'stream-chat-react-native';
import {Channel} from 'stream-chat';
import {ChatScreenProp} from './navigation/types';

const Chat: FC<ChatScreenProp> = ({navigation}) => {
  const {user, client, setCurrentChannel} = useUserContext();
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
        image: 'https://i.pravatar.cc/300',
      });
      await globalChannel?.watch();
    };

    createChannel();
  }, [userSet]);

  const onSelect = (channel: Channel<DefaultStreamChatGenerics>) => {
    setCurrentChannel(channel);
    navigation.push('Chatroom');
  };

  return (
    <OverlayProvider>
      {!client ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <ChatComponent client={client}>
          <View style={styles.container}>
            <ChannelList onSelect={onSelect} />
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
