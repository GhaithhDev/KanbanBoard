import { useContext, useState } from "react";
import { BoardCard } from "../objects/board-card.object";
import { useApiRequest } from "./apiRequestHook";
import { FetchRequestTypes } from "../enums/fetchRequestTypes";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../enums/screenNames";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { boardsContainerContext } from "../contexts/boardsContainerContext";

type RootStackParamList = {
  [ScreenNames.Board]: { boardId: string };
  [ScreenNames.BoardsContainer]: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const API_CALLS = {
  getUserBoards: {
    endpoint: "/board/owned",
    requestType: FetchRequestTypes.GET,
  },
  getSharedBoards: {
    endpoint: "/board/shared",
    requestType: FetchRequestTypes.GET,
  },
  createBoard: {
    endpoint: "/board/create",
    requestType: FetchRequestTypes.POST,
  },
  deleteBoard: {
    endpoint: "/board/",
    requestType: FetchRequestTypes.DELETE,
  },
};

export function useBoardsContainer() {
  const { ownedBoards, setOwnedBoards, sharedBoards, setSharedBoards } =
    useContext(boardsContainerContext);
  const [isReady, setIsReady] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();

  const [isCreating, setCreating] = useState<boolean>(false);
  const [creatingBoardName, setCreatingBoardName] = useState<string | null>();
  const [creatingBoardColorNum, setCreateingBoardColorNum] =
    useState<string>("1");

  const { sendApiRequest } = useApiRequest();

  function updateBoards(boards: any, shared: boolean) {
    const newOwnedBoards: BoardCard[] = [];
    for (let i = 0; i < boards.length; i++) {
      const boardData = boards[i];
      const boardCard: BoardCard = {
        boardId: boardData.boardId,
        title: boardData.title,
        columnIds: boardData.columnIds,
        columnsAmount: boardData.columnsAmount,
        cardsAmount: boardData.cardsAmount,
        colorNum: boardData.colorNum,
        ownerUsername: boardData.ownerUsername,
        isShared: shared,
      };
      newOwnedBoards.push(boardCard);
    }
    if (shared) {
      setSharedBoards(newOwnedBoards);
    } else {
      setOwnedBoards(newOwnedBoards);
    }
  }

  async function createBoard() {
    try {
      const boards = await sendApiRequest(
        API_CALLS.createBoard.endpoint,
        API_CALLS.createBoard.requestType,
        { name: creatingBoardName, colorNum: creatingBoardColorNum },
        "creating your board...",
      );
      //onsole.log(boards);
      updateBoards(boards, false);
      setCreatingBoardName("");
      setCreateingBoardColorNum("1");
      setCreating(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function initUserBoards() {
    try {
      const boards = await sendApiRequest(
        API_CALLS.getUserBoards.endpoint,
        API_CALLS.getUserBoards.requestType,
        null,
        "Loading your boards...",
      );
      const sharedBoards = await sendApiRequest(
        API_CALLS.getSharedBoards.endpoint,
        API_CALLS.getSharedBoards.requestType,
        null,
        "Loading shared boards...",
      );
      //onsole.log(boards);
      updateBoards(boards, false);
      updateBoards(sharedBoards, true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsReady(true);
    }
  }

  function navigateToBoard(pressedBoardId: string) {
    navigation.navigate(ScreenNames.Board, { boardId: pressedBoardId });
  }

  function updateBoardChildrenAmount(
    boardId: string,
    isColumn: boolean,
    newAmount: number,
  ): void {
    const updatingKey = isColumn ? "columnsAmount" : "cardsAmount";
    let found = false;

    setOwnedBoards((prevOwned) => {
      const updated = prevOwned.map((board) => {
        if (board.boardId === boardId) {
          found = true;
          return { ...board, [updatingKey]: newAmount };
        }
        return board;
      });
      return updated;
    });

    if (!found) {
      setSharedBoards((prevShared) =>
        prevShared.map((board) =>
          board.boardId === boardId
            ? { ...board, [updatingKey]: newAmount }
            : board,
        ),
      );
    }
  }

  async function deleteBoard(boardId: string) {
    try {
      await sendApiRequest(
        API_CALLS.deleteBoard.endpoint + boardId,
        API_CALLS.deleteBoard.requestType,
        null,
        "deleting board...",
      );
      setOwnedBoards((prev) =>
        prev.filter((board) => board.boardId !== boardId),
      );
    } catch (error) {
      console.error("error while deleting board;", error);
    }
  }

  async function init() {
    await initUserBoards();
  }

  return {
    init,
    ownedBoards,
    sharedBoards,
    isReady,
    isCreating,
    creatingBoardName,
    creatingBoardColorNum,
    navigateToBoard,
    updateBoardChildrenAmount,
    setCreating,
    setCreatingBoardName,
    setCreateingBoardColorNum,
    createBoard,
    deleteBoard,
  };
}
