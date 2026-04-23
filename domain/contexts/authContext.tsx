import { createContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (newToken: string | null) => void;
};

const initValue = {
  token: null,
  setToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(initValue);

export function AuthContextProivder({ children }: any) {
  const [token, setToken] = useState<string | null>("asdasd");

  const value = {
    token: token,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
