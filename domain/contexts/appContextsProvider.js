import { AuthContextProivder } from "./authContext";
import { BoardProvider } from "./boardContext";
import { BoardsContainerProvider } from "./boardsContainerContext";
import { CardProvider } from "./cardContext";
import { ColumnProvider } from "./columnContext";
import { LoadingProvider } from "./loadingContext";

export function AppContextsProvider({ children }) {
  return (
    <AuthContextProivder>
      <LoadingProvider>
        <BoardsContainerProvider>
          <BoardProvider>
            <ColumnProvider>
              <CardProvider>{children}</CardProvider>
            </ColumnProvider>
          </BoardProvider>
        </BoardsContainerProvider>
      </LoadingProvider>
    </AuthContextProivder>
  );
}
