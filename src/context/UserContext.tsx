import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {UserContextType, UserType} from './types';

const UserContext = createContext<UserContextType>({
  user: undefined,
  setOnlineUser: () => {},
});

const UserContextProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>();

  const setOnlineUser = (user: UserType) => setUser(user);
  return (
    <UserContext.Provider value={{user, setOnlineUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
