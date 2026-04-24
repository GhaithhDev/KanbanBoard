import { useEffect, useState } from "react";
import { useApiRequest } from "./apiRequestHook";
import { FetchRequestTypes } from "../enums/fetchRequestTypes";

const API_CALLS = {
  getBoardById: {
    endpoint: "/board",
    requestType: FetchRequestTypes.GET,
  },
  createColumn: {
    endpoint: "/column/create",
    requestType: FetchRequestTypes.POST,
  },
  deleteColumn: {
    endpoint: "/column/",
    requestType: FetchRequestTypes.DELETE,
  },
};

type boardUsage = {
  title: string;
  columnIds: string[];
  isReady: boolean;
  isCreating: boolean;
  boardId: string | undefined;
  setTitle: (newTitle: string) => void;
  setColumns: (newColumnIds: string[]) => void;
  setReady: (newState: boolean) => void;
  setIsCreating: (newState: boolean) => void;
  createColumn: (columnName: string, boardId: string) => void;
  deleteColumn: (columnId: string) => void;
  init: () => void;
};

export function useBoard(receviedBoardId: string) {
  const { sendApiRequest } = useApiRequest();
  const [title, setTitle] = useState<string>("");
  const [columnIds, setColumns] = useState<string[]>([]);
  const [isReady, setReady] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [boardId, setBoardId] = useState<string | undefined>();

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
      setColumns((prev) => [...prev, result]);
    } catch (error) {
      console.error("error creating column", error);
    }
  }

  async function deleteColumn(columnId: string) {
    try {
      const result = await sendApiRequest(
        API_CALLS.deleteColumn.endpoint + columnId,
        API_CALLS.deleteColumn.requestType,
        null,
        "deleting column...",
      );
      setColumns((prev) => prev.filter((id) => id !== columnId));
    } catch (error) {
      console.error("error creating column", error);
    }
  }

  async function init() {
    try {
      const result = await sendApiRequest(
        API_CALLS.getBoardById.endpoint + "/" + receviedBoardId,
        API_CALLS.getBoardById.requestType,
        null,
        "Loading board...",
      );

      setTitle(result.name);
      setColumns(result.columnIds);
      setBoardId(receviedBoardId);
      setReady(true);
    } catch (error) {
      console.error(`failed to retrieve data for board with id: ${boardId} `);
    }
  }

  return {
    title,
    columnIds,
    isReady,
    isCreating,
    boardId,
    setTitle,
    setColumns,
    setReady,
    setIsCreating,
    createColumn,
    deleteColumn,

    init,
  } satisfies boardUsage;
}
