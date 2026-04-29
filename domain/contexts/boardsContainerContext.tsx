import { createContext, Dispatch, SetStateAction, useState } from "react";
import { BoardCard } from "../objects/board-card.object";

export type boardsContainerContextData = {
  ownedBoards: BoardCard[]
  sharedBoards: BoardCard[]
  setOwnedBoards: Dispatch<SetStateAction<BoardCard[]>>;
  setSharedBoards: Dispatch<SetStateAction<BoardCard[]>>;
};

const initValue: boardsContainerContextData = {
  ownedBoards: [],
  sharedBoards: [],
  setOwnedBoards: () => {},
  setSharedBoards: () => {}
}

export const boardsContainerContext = createContext<boardsContainerContextData>(initValue);

export function BoardsContainerProvider({children} : any) {
  const [ownedBoards, setOwnedBoards] = useState<BoardCard[]>([]);
   const [sharedBoards, setSharedBoards] = useState<BoardCard[]>([]);

  const value = {
    ownedBoards: ownedBoards,
    sharedBoards: sharedBoards,
    setOwnedBoards,
    setSharedBoards
  };

  return <boardsContainerContext.Provider value = {value}>{children}</boardsContainerContext.Provider>;
}
