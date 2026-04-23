import { createContext, useState } from "react";

export type loadingContextData = {
  loadingMessage: string | null
  setLoadingMessage: (newLoadingMessage : string | null) => void
};

const initValue: loadingContextData = {
  loadingMessage: null,
  setLoadingMessage: () => {}
}

export const loadingContext = createContext<loadingContextData>(initValue);

export function LoadingProvider({children} : any) {
  const [ loadingMessage , setLoadingMessage ] = useState<string | null>(null);

  const value = {
    loadingMessage: loadingMessage,
    setLoadingMessage,
  };

  return <loadingContext.Provider value = {value}>{children}</loadingContext.Provider>;
}
