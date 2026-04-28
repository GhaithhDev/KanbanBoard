import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Column } from "../objects/column.object";

export type columnContextData = {
  boardId: string | null;
  columns: Column[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
  setBoardId: Dispatch<SetStateAction<string | null>>;
};

const initValue: columnContextData = {
  boardId: null,
  columns: [],
  setColumns: () => {},
  setBoardId: () => {},
}

export const ColumnContext = createContext<columnContextData>(initValue);

export function ColumnProvider({children} : any) {
 const [ columns , setColumns ] = useState<Column[]>([]);
 const [boardId, setBoardId] = useState<string | null>(null);

  const value = {
    boardId: boardId,
    columns: columns,
    setColumns,
    setBoardId
  };

  return <ColumnContext.Provider value = {value}>{children}</ColumnContext.Provider>;
}
