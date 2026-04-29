import { useContext, useState } from "react";
import { useApiRequest } from "./apiRequestHook";
import { FetchRequestTypes } from "../enums/fetchRequestTypes";
import { boardContext } from "../contexts/boardContext";
import { Board } from "../objects/board.object";
import { USER_COLORS } from "../consts/userColors";
import { useColumn } from "./columnHook";

const API_CALLS = {
  getBoardById: {
    endpoint: "/board",
    requestType: FetchRequestTypes.GET,
  },
  addUserToBoard: {
    endpoint: "/board/add/user",
    requestType: FetchRequestTypes.POST,
  },
};

export function useBoard(receviedBoardId?: string) {
  const { sendApiRequest } = useApiRequest();

  const { board, setBoard }: { board: Board | null; setBoard: any } =
    useContext(boardContext);
  const { getBoardColumns } = useColumn();
  const [isAddingUser, setAdding] = useState(false);
  const [addingUserText, setAddingUserText] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isReady, setReady] = useState(false);

  async function initBoard() {
    try {
      const result = await sendApiRequest(
        API_CALLS.getBoardById.endpoint + "/" + receviedBoardId,
        API_CALLS.getBoardById.requestType,
        null,
        "Loading board...",
      );

      setBoard({
        id: receviedBoardId,
        title: result.name,
        isCreating: false,
        authorizedUsers: result.authorizedUsers.map(
          (authorizedUserData: any) => ({
            username: authorizedUserData.username,
            color: USER_COLORS[authorizedUserData.color - 1],
          }),
        ),
      });

      setReady(true);
    } catch (error) {
      console.error(`failed to retrieve data for board with id: ${board?.id} `);
    }
  }

  async function addBoardToUser(username: string, boardId: string) {
    try {
      const result = await sendApiRequest(
        API_CALLS.addUserToBoard.endpoint,
        API_CALLS.addUserToBoard.requestType,
        {
          username: username,
          boardId: boardId,
        },
        "adding to board...",
      );
      setAdding(false);
      setAddingUserText("");

      setBoard({
        id: boardId,
        title: result.name,
        isCreating: false,
        authorizedUsers: result.authorizedUsers.map(
          (authorizedUserData: any) => ({
            username: authorizedUserData.username,
            color: USER_COLORS[authorizedUserData.color],
          }),
        ),
      });
    } catch (error) {
      console.error(`failed to retrieve data for board with id: ${board?.id} `);
    }
  }

  return {
    board,
    isReady,
    isAddingUser,
    addingUserText,
    isCreating,
    setAdding,
    initBoard,
    setIsCreating,
    setAddingUserText,
    addBoardToUser,
  };
}
