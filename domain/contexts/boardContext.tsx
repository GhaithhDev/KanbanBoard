import { createContext, useState } from "react";
import { Board } from "../objects/board.object";


export type boardContextData = {
  board: Board | null
  setBoard: (newBoard : Board) => void
};

const initValue: boardContextData = {
  board: null,
  setBoard: () => {}
}

export const boardContext = createContext<boardContextData>(initValue);

export function BoardProvider({children} : any) {
 const [ board , setBoard ] = useState<Board | null>(null);

  const value = {
    board: board,
    setBoard,
  };

  return <boardContext.Provider value = {value}>{children}</boardContext.Provider>;
}
