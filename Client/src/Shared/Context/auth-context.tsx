import { createContext } from 'react';

interface AuthContextInterface {
  isLoggedIn: boolean;
  userId: boolean | undefined;
  userName: string | undefined;
  token: boolean | undefined;
  login: any;
  logout: any;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);
