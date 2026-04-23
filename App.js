//ui components
import { Text } from "react-native";
import Board from "./ui/screens/Board";
/*import { CardDetails } from "./ui/components/CardDetails";
import { CreateCardModal } from "./ui/components/CreateCardModal";*/
import SignIn from "./ui/screens/SignIn";
import SignUp from "./ui/screens/SignUp";
import Loading from "./ui/screens/Loading";

//packages
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//enums
import { ScreenNames } from "./domain/enums/screenNames";

//context providers
import { AppContextsProvider } from "./domain/contexts/appContextsProvider";

//hooks
import { useLoading } from "./domain/hooks/loadingHook";
import { useIsAuthenticated } from "./domain/hooks/isAuthenticatedHook";
import { useEffect } from "react";

const stackNavigator = createNativeStackNavigator();

function AuthenticatedNavigator() {
  console.log("loading App.js/AuthenticatedNavigator");
  return (
    <stackNavigator.Navigator>
      <stackNavigator.Screen
        name={ScreenNames.Board}
        component={Board}
        options={{
          headerShown: false,
        }}
      />
    </stackNavigator.Navigator>
  );
}

function AuthNavigator() {
   console.log("loading App.js/AuthNavigator");
  return (
    <stackNavigator.Navigator>
      <stackNavigator.Screen name={ScreenNames.SignIn} component={SignIn} />
      <stackNavigator.Screen name={ScreenNames.SignUp} component={SignUp} />
    </stackNavigator.Navigator>
  );
}

function Navigation() {
  console.log("loading App.js/Navigation");
  const isAuthenticated = useIsAuthenticated();
  
  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedNavigator /> : <AuthNavigator />}
      
    </NavigationContainer>
  );
}

function AppUI() {
  console.log("loading App.js/AppUI");
  const { isLoading, loadingMessage } = useLoading();
  
  return (
    <>
      <Navigation></Navigation>
      {isLoading && <Loading text={loadingMessage} />}
    </>
  );
}

export default function App() {
  console.log("app start");

  /*const [isCardDetailsVisible, setCardDetailsVisibility] = useState(false);
  function toggleCardDetails() {
    setCardDetailsVisibility((prev) => !prev);
  }
    const [previewCardData, setPreviewCardData] = useState(previewCardDummyData);
  */ //move to cardDetailsHook

  /*const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  function toggleCreateModal() {
    setCreateModalVisible((prev) => !prev);
  }*/ //move to create card modal hook

  /*useEffect(() => {
    if (hasInitted.current) return;
    hasInitted.current = true;

    async function run() {
      await init();
      isReady.current = true;
    }

    run();

  }, []);*/

  /*if (!isReady) {
    return <Loading text={"App is loading.."} />;
  }*/

  return (
    <AppContextsProvider>
      <AppUI />
    </AppContextsProvider>
  );
}
