import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {UserContextType, UserType} from './types';
import {StreamChat} from 'stream-chat';

const UserContext = createContext<UserContextType>({
  user: undefined,
  setOnlineUser: () => {},
  client: undefined,
  setChatClient: () => {},
  updateChatClient: () => {},
});

const UserContextProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>();
  const [client, setClient] = useState<StreamChat>();

  const setOnlineUser = (user: UserType) => {
    console.log('User was set');
    setUser(user);
  };
  const setChatClient = (client: StreamChat) => {
    console.log('I was fired');
    setClient(client);
  };
  const updateChatClient = () => {
    console.log('AM UPDATING');
  };
  return (
    <UserContext.Provider
      value={{user, setOnlineUser, client, setChatClient, updateChatClient}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
