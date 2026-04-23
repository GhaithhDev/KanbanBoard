
import { AuthContextProivder } from "./authContext";
import { LoadingProvider } from "./loadingContext";


export function AppContextsProvider({ children }) {
  return (
    <AuthContextProivder>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </AuthContextProivder>
  );
}
