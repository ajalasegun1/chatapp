import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {UserContextType, UserType} from './types';
import {StreamChat, Channel} from 'stream-chat';

const UserContext = createContext<UserContextType>({
  user: undefined,
  setOnlineUser: () => {},
  client: undefined,
  setChatClient: () => {},
  currentChannel: undefined,
  setCurrentChannel: () => {},
});

const UserContextProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>();
  const [client, setClient] = useState<StreamChat>();
  const [currentChannel, setCurrentChannel] = useState<Channel>();

  const setOnlineUser = (user: UserType) => {
    setUser(user);
  };
  const setChatClient = (client: StreamChat) => {
    setClient(client);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setOnlineUser,
        client,
        setChatClient,
        currentChannel,
        setCurrentChannel,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
