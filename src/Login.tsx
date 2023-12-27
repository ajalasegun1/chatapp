import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import {useUserContext} from './context/UserContext';
import {StreamChat} from 'stream-chat';
import Config from 'react-native-config';
const client = StreamChat.getInstance(
  Config.STREAM_KEY ? Config.STREAM_KEY : '',
);
const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const {setOnlineUser, setChatClient} = useUserContext();

  const onLogin = () => {
    setChatClient(client);
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!name || !email) {
      Toast.show(
        "Please make sure you've entered both name and email",
        Toast.LONG,
      );
      return;
    }
    if (!email.match(validRegex)) {
      Toast.show('Please enter a valid email address', Toast.LONG);
      return;
    }

    setOnlineUser({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      image: 'https://i.pravatar.cc/300',
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Demo Chat App</Text>
      <Image source={{uri: 'https://i.pravatar.cc/300'}} style={styles.img} />
      <TextInput
        placeholder="Name"
        style={styles.input}
        placeholderTextColor={'gray'}
        selectionColor={'black'}
        onChangeText={val => setName(val)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor={'gray'}
        selectionColor={'black'}
        onChangeText={val => setEmail(val)}
        keyboardType="email-address"
      />
      <Pressable style={styles.btn} onPress={onLogin}>
        <Text style={styles.btnText}>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: RFValue(20),
    gap: RFValue(20),
    paddingTop: RFValue(50),
  },
  title: {
    color: 'black',
    fontSize: RFValue(20),
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: RFValue(40),
    paddingVertical: Platform.OS === 'ios' ? RFValue(10) : RFValue(7),
    paddingHorizontal: RFValue(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: RFValue(20),
    color: 'black',
  },
  img: {
    width: RFValue(70),
    aspectRatio: 1,
    borderRadius: RFValue(70) / 2,
  },
  btn: {
    backgroundColor: 'black',
    width: '100%',
    height: RFValue(45),
    borderRadius: RFValue(45) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: RFValue(16),
    fontWeight: '500',
  },
});
