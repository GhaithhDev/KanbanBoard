import { useContext, useState } from "react";
import { BoardCard } from "../objects/board-card.object";
import { SharedBoardCard } from "../objects/sharedBoardCard.object";
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
};

export function useBoardsContainer() {
  const { ownedBoards, setOwnedBoards, sharedBoards, setSharedBoards } = useContext(boardsContainerContext);
  const [isReady, setIsReady] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();

  const [isCreating, setCreating] = useState<boolean>(false);
  const [creatingBoardName, setCreatingBoardName] = useState<string | null>();
  const [creatingBoardColorNum, setCreateingBoardColorNum] =
    useState<string>("1");

  const { sendApiRequest } = useApiRequest();

  function updateBoards(boards: any,shared: boolean){
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
          isShared: shared
        };
        newOwnedBoards.push(boardCard);
      }
      if(shared){
        setSharedBoards(newOwnedBoards)
      }else{
        setOwnedBoards(newOwnedBoards);
      }
      
  }

  async function createBoard() {
    try {
      const boards = await sendApiRequest(
        API_CALLS.createBoard.endpoint,
        API_CALLS.createBoard.requestType,
        {name: creatingBoardName, colorNum: creatingBoardColorNum},
        "creating your board...",
      );
      //onsole.log(boards);
      updateBoards(boards,false);
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
      updateBoards(boards,false);
      updateBoards(sharedBoards,true);
      
    } catch (error) {
      
      console.log(error);
    }finally{
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

    let found: boolean = false;
    const newOwnedBoards: BoardCard[] = ownedBoards.map(
      (board: BoardCard): BoardCard => {
        if (board.boardId === boardId) {
          const updatingKey = isColumn ? "columnsAmount" : "cardsAmount";
          board[updatingKey] = newAmount;
          found = true;
          return board;
        } else {
          return board;
        }
      },
    );

    setOwnedBoards(newOwnedBoards);
    if(found){
      return;
    }

    const newSharedBoards: BoardCard[] = sharedBoards.map(
      (board: BoardCard): BoardCard => {
        if (board.boardId === boardId) {
          const updatingKey = isColumn ? "columnsAmount" : "cardsAmount";
          board[updatingKey] = newAmount;
          found = true;
          return board;
        } else {
          return board;
        }
      },
    );
    setSharedBoards(newSharedBoards);
    
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
    createBoard
  };
}
