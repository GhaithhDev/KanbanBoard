import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../enums/screenNames";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { FetchRequestTypes } from "../enums/fetchRequestTypes";
import { useApiRequest } from "./apiRequestHook";
import { Alert } from "react-native";
import { ExceptionData } from "react-native/types_generated/Libraries/Core/NativeExceptionsManager";

type useAuthType = {
  token: string | null,
  isAuthenticated: boolean;
  username: string | null;
  writingUsername: string;
  writingPassword: string;
  authenticate: (token: string) => void;
  logout: () => void;
  navigateToSignInPage: () => void;
  navigateToSignUpPage: () => void;
  setWritingUsername: (newtWritingName: string) => void;
  setWritingPassword: (newWritingPassword: string) => void;
  signIn: (username: string, password: string) => void;
};

const API_CALLS = {
  SignIn: {
    endpoint: "/auth/signIn",
    requestType: FetchRequestTypes.POST,
  },
};

export default function useAuth() {
  const { token, setToken, username, setUsername } = useContext(AuthContext);
  const [writingUsername, setWritingUsername] = useState<string>("");
  const [writingPassword, setWritingPassword] = useState<string>("");
  const { sendApiRequest } = useApiRequest();

  function authenticate(token: string) {
    setToken(token);
  }

  async function signIn() {
    if (
      typeof writingUsername !== "string" ||
      typeof writingPassword !== "string"
    ) {
      console.error("username and password must be strings");
      return;
    }

    try {
      const result = await sendApiRequest(
        API_CALLS.SignIn.endpoint,
        API_CALLS.SignIn.requestType,
        {
          username: writingUsername,
          password: writingPassword,
        },
        "Signing you in...",
      );
      console.log(result);
      setUsername(result.username);
      authenticate(result.accessToken);
    } catch (error: ExceptionData) {
      console.log("errored");
      //do an alert with the error
      if (!error ) {
        console.error("error trying to log user in");
        return;
      }
      
      Alert.alert("Sign in error", error.message, [{ text: "OK" }]);
    } finally {
      setWritingPassword("");
      setWritingUsername("");
    }
  }

  function logout() {
    setToken(null);
  }

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

  return {
    token: token,
    isAuthenticated: !!token,
    username,
    writingPassword,
    writingUsername,
    setWritingUsername,
    setWritingPassword,
    navigateToSignInPage,
    navigateToSignUpPage,
    signIn,
    authenticate,
    logout,
  } satisfies useAuthType;
}
