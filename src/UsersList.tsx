import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useUserContext} from './context/UserContext';
import {UserResponse, DefaultGenerics} from 'stream-chat';
import {RFValue} from 'react-native-responsive-fontsize';
import {UsersListScreenProp} from './navigation/types';

const UsersList: FC<UsersListScreenProp> = ({navigation}) => {
  const {client, user, setCurrentChannel} = useUserContext();
  const [allUsers, setAllUsers] = useState<UserResponse<DefaultGenerics>[]>();
  useEffect(() => {
    if (client && user) {
      const getUsers = async () => {
        const users = await client.queryUsers({});
        setAllUsers(
          users.users
            .filter(item => item.role !== 'admin')
            .filter(
              item2 => item2.name?.toLowerCase() !== user.name.toLowerCase(),
            ),
        );
      };
      getUsers();
    }
  }, [client, user]);

  const proceedToChat = async (user2: string) => {
    if (client && user) {
      const channel = client.channel('messaging', {
        members: [user.name, user2],
      });
      try {
        await channel.create();
        setCurrentChannel(channel);
        navigation.push('Chatroom');
      } catch (error) {
        console.log({error});
      }
    }
  };

  if (!client) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {allUsers?.map((item, index) => (
        <Pressable
          style={styles.item}
          key={index}
          onPress={() => proceedToChat(item.name ? item.name : 'guest')}>
          <View>
            <Image source={{uri: item.image as string}} style={styles.img} />
            {item.online && <View style={styles.online} />}
          </View>
          <Text style={styles.name}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RFValue(5),
    paddingHorizontal: RFValue(10),
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    gap: RFValue(10),
  },
  img: {
    width: RFValue(30),
    aspectRatio: 1,
    borderRadius: RFValue(30) / 2,
  },
  online: {
    width: RFValue(8),
    aspectRatio: 1,
    borderRadius: RFValue(8) / 2,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 0,
    right: RFValue(3),
    borderWidth: 1,
    borderColor: 'white',
  },
  name: {
    fontSize: RFValue(14),
    textTransform: 'capitalize',
    fontWeight: '500',
    color: 'black',
  },
});
