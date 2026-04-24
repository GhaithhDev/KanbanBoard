import { useState } from "react";
import { BoardCard } from "../objects/board-card.object";
import { SharedBoardCard } from "../objects/sharedBoardCard.object";
import { useApiRequest } from "./apiRequestHook";
import { FetchRequestTypes } from "../enums/fetchRequestTypes";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../enums/screenNames";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
};

export function useBoardsContainer() {
  const [ownedBoards, setOwnedBoards] = useState<BoardCard[]>([]);
  const [sharedBoards, setSharedBoards] = useState<SharedBoardCard[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();

  const [creatingBoardName, setCreatingBoardName] = useState<string | null>();
  const [creatingBoardColorNum, setCreateingBoardColorNum] =
    useState<number>(1);

  const { sendApiRequest } = useApiRequest();

  async function initUserBoards() {
    try {
      const boards = await sendApiRequest(
        API_CALLS.getUserBoards.endpoint,
        API_CALLS.getUserBoards.requestType,
        null,
        "Loading your boards...",
      );
      //onsole.log(boards);
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
        };
        newOwnedBoards.push(boardCard);
      }
      setOwnedBoards(newOwnedBoards);
      setIsReady(true);
    } catch (error) {
      console.error(error);
    }
  }

  function navigateToBoard(pressedBoardId: string) {
    navigation.navigate(
      ScreenNames.Board,
      {boardId: pressedBoardId}
    );
  }

  async function init() {
    await initUserBoards();
  }

  return {
    init,
    ownedBoards,
    isReady,
    navigateToBoard
  };
}
