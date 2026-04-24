import { createContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  username: string | null;
  setToken: (newToken: string | null) => void;
  setUsername: (newUsername: string | null) => void;
};

const initValue = {
  token: null,
  username: null,
  setToken: () => {},
  setUsername: () => {},
};

export const AuthContext = createContext<AuthContextType>(initValue);

export function AuthContextProivder({ children }: any) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const value = {
    token: token,
    username,
    setToken,
    setUsername
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
