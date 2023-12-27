import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Chat: undefined;
  Login: undefined;
  Chatroom: undefined;
};

export type ChatScreenProp = NativeStackScreenProps<RootStackParamList, 'Chat'>;
export type LoginScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;
export type ChatroomScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'Chatroom'
>;
