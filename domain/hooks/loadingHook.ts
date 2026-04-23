import { useContext } from "react";
import { loadingContext } from "../contexts/loadingContext";

type useLoadingType = {
  isLoading: boolean;
  loadingMessage: string | null;
  setLoading: (newLoadingState: boolean, loadingMessage: string) => void;
};

export function useLoading() {
  const { loadingMessage, setLoadingMessage } = useContext(loadingContext);

  function setLoading(newLoadingState: boolean, loadingMessage: string) {
    if (!newLoadingState) {
      setLoadingMessage(null);
      return;
    }
    setLoadingMessage(loadingMessage);
  }

  return {
    isLoading: !!loadingMessage,
    loadingMessage: loadingMessage,
    setLoading,
  } satisfies useLoadingType;
}
