import { useContext, useState } from "react";
import { FetchRequestTypes } from "../enums/fetchRequestTypes";
import { useApiRequest } from "./apiRequestHook";
import { useBoardsContainer } from "./boardsContainerHook";
import { Column } from "../objects/column.object";
import { ColumnContext } from "../contexts/columnContext";

const API_CALLS = {
  createColumn: {
    endpoint: "/column/create",
    requestType: FetchRequestTypes.POST,
  },
  deleteColumn: {
    endpoint: "/column/",
    requestType: FetchRequestTypes.DELETE,
  },
  getBoardColumns: {
    endpoint: "/column/",
    requestType: FetchRequestTypes.GET,
  },
};

export function useColumn(receivedBoardId?: string) {
  //const [cards, setCards] = useState<Card[]>([]);
  const { sendApiRequest } = useApiRequest();

  const { columns, setColumns, boardId, setBoardId } =
    useContext(ColumnContext);
  const [isColumnsReady, setReady] = useState(false);

  const { updateBoardChildrenAmount } = useBoardsContainer();

  function updateColumns(columnData: any) {
    const newColumns: Column[] = [];
    for (let i = 0; i < columnData.length; i++) {
      const colulmnData = columnData[i];
      const newColumn: Column = {
        id: colulmnData.id,
        title: colulmnData.title,
        parentBoardId: colulmnData.parentBoardId,
        isCreating: false,
      };
      newColumns.push(newColumn);
    }
    setColumns(newColumns);
    if (boardId) {
      updateBoardChildrenAmount(boardId, true, newColumns.length);
    }
  }

  async function createColumn(columnName: string, boardId: string) {
    try {
      const result = await sendApiRequest(
        API_CALLS.createColumn.endpoint,
        API_CALLS.createColumn.requestType,
        {
          columnName: columnName,
          boardId: boardId,
        },
        "creating column...",
      );
      updateColumns(result);
    } catch (error) {
      console.error("error creating column", error);
    }
  }

  function setColumnCreating(columnId: string, newState: boolean) {
    setColumns((prev: Column[]) =>
      prev.map((column: Column) => {
        if (column.id === columnId) column.isCreating = newState;
        return column;
      }),
    );
  }

  function getBoardColumns(boardId: string){
    return columns.filter( (column: Column) => column.parentBoardId === boardId );
  }

  async function deleteColumn(columnId: string) {
    try {
      const result = await sendApiRequest(
        API_CALLS.deleteColumn.endpoint + columnId,
        API_CALLS.deleteColumn.requestType,
        null,
        "deleting column...",
      );

      const newColumns = columns.filter(
        (column: Column) => column.id !== columnId,
      );
      setColumns(newColumns);
      if (boardId) {
        updateBoardChildrenAmount(boardId, true, newColumns.length);
      }
    } catch (error) {
      console.error("error creating column", error);
    }
  }

  async function initColumns() {
    if(!receivedBoardId){
      return;
    }
    try {
      const result = await sendApiRequest(
        API_CALLS.getBoardColumns.endpoint + receivedBoardId,
        API_CALLS.getBoardColumns.requestType,
        null,
        "Loading columns...",
      );
      updateColumns(result);
      setBoardId(receivedBoardId);
      setReady(true);
    } catch (error) {
      console.error(
        `failed to retrieve board columns for board with id: ${receivedBoardId} `,
      );
    }
  }

  return {
    initColumns,
    columns,
    isColumnsReady,

    createColumn,
    deleteColumn,
    setColumnCreating,
    getBoardColumns
  };
}
