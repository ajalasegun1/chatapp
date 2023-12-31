import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useUserContext} from './context/UserContext';
import {
  OverlayProvider,
  Chat,
  Channel,
  MessageInput,
  MessageList,
  MessageAvatar,
} from 'stream-chat-react-native';
import {ChatroomScreenProp} from './navigation/types';
import {SafeAreaView} from 'react-native-safe-area-context';

const Chatroom: FC<ChatroomScreenProp> = ({navigation}) => {
  const {client, currentChannel} = useUserContext();

  if (!client || !currentChannel) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  useEffect(() => {
    navigation.setOptions({title: 'Chat Room'});
  }, []);
  const SmallAvatar = () => <MessageAvatar size={30} />;
  return (
    <OverlayProvider>
      <Chat client={client}>
        <Channel channel={currentChannel} MessageAvatar={SmallAvatar}>
          <SafeAreaView style={styles.container} edges={['bottom']}>
            <MessageList />
            <MessageInput />
          </SafeAreaView>
        </Channel>
      </Chat>
    </OverlayProvider>
  );
};

export default Chatroom;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
