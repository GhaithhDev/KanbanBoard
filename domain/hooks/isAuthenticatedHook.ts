import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export function useIsAuthenticated() {
  const { token } = useContext(AuthContext);
  return !!token;
}