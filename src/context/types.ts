import {StreamChat, Channel} from 'stream-chat';

export type UserType = {
  name: string;
  email: string;
  image: string;
};

export type UserContextType = {
  user: UserType | undefined;
  setOnlineUser: (user: UserType) => void;
  client?: StreamChat;
  setChatClient: (client: StreamChat) => void;
  currentChannel?: Channel;
  setCurrentChannel: (channel: Channel) => void;
};
