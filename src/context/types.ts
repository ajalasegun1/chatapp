import {Dispatch, SetStateAction} from 'react';

export type UserType = {
  name: string;
  email: string;
  image: string;
};

export type UserContextType = {
  user: UserType | undefined;
  setOnlineUser: (user: UserType) => void;
};
