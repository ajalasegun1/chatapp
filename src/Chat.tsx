import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import {RFValue} from 'react-native-responsive-fontsize';

const Chat: FC<ChatScreenProp> = ({navigation}) => {
  const {user, client, setCurrentChannel} = useUserContext();
  const [userSet, setUserSet] = useState(false);

  useEffect(() => {
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

  const onPlus = () => {
    navigation.push('UsersList');
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
            <Pressable style={styles.float} onPress={onPlus}>
              <Text style={styles.plus}>+</Text>
            </Pressable>
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
  float: {
    width: RFValue(40),
    aspectRatio: 1,
    borderRadius: RFValue(40) / 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: RFValue(15),
    bottom: RFValue(30),
  },
  plus: {
    fontSize: RFValue(30),
    color: 'black',
  },
});
