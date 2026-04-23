import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../enums/screenNames";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

type useAuthType = {
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
  navigateToSignInPage: () => void;
  navigateToSignUpPage: () => void;
};

export default function useAuth() {
  const { token, setToken } = useContext(AuthContext);

  const navigation = useNavigation();

  function navigateToScreen(targetScreen: string) {
    const screenNameValues: string[] = Object.values(ScreenNames);
    if (!screenNameValues.includes(targetScreen)) {
      console.warn(`Invalid screen name ${targetScreen}`);
      return;
    }

    const state = navigation.getState();
    if (!state) {
      return;
    }
    const previousScreen =
      state.routes.length > 1 && state.routes[state.routes.length - 2].name;

    if (targetScreen === previousScreen) {
      navigation.goBack();
      return;
    }

    navigation.navigate(targetScreen as never);
  }

  function navigateToSignInPage() {
    navigateToScreen(ScreenNames.SignIn);
  }

  function navigateToSignUpPage() {
    navigateToScreen(ScreenNames.SignUp);
  }

  function authenticate(token: string) {
    setToken(token);
  }

  function logout() {
    setToken(null);
  }

  return {
    isAuthenticated: !!token,
    navigateToSignInPage,
    navigateToSignUpPage,
    authenticate,
    logout,
  } satisfies useAuthType;
}
