import { useContext, useState } from "react";
import { Card } from "../objects/card.object";
import { FetchRequestTypes } from "../enums/fetchRequestTypes";
import { useApiRequest } from "./apiRequestHook";
import { CreateCardDto } from "../objects/create-card.dto";
import { CardContext } from "../contexts/cardContext";
import { useBoardsContainer } from "./boardsContainerHook";
import { Column } from "../objects/column.object";
import { useColumn } from "./columnHook";
import { CardKeys } from "../enums/cardKeysEnum";
import * as Clipboard from 'expo-clipboard';



const API_CALLS = {
  getColumnCards: {
    endpoint: "/card/",
    requestType: FetchRequestTypes.GET,
  },
  getBoardCards: {
    endpoint: "/card/boardId/",
    requestType: FetchRequestTypes.GET,
  },
  createCard: {
    endpoint: "/card/create",
    requestType: FetchRequestTypes.POST,
  },
  deleteCard: {
    endpoint: "/card/",
    requestType: FetchRequestTypes.DELETE,
  },
  editCard: {
    endpoint: "/card/editCard",
    requestType: FetchRequestTypes.PATCH,
  },
};

const COPY_ID_COOLDOWN = 2000 //MS

export function useCard(receviedBoardId?: string) {
  const { sendApiRequest } = useApiRequest();

  const {
    cards,
    setCards,
    boardId,
    setBoardId,
    previewCardId,
    setPreviewCardId,
    isPreviewingCard,
    setPreviewingCard,
  } = useContext(CardContext);

  const { updateBoardChildrenAmount } = useBoardsContainer();
  const { getBoardColumns, columns } = useColumn();

  const [isCardsReady, setCardsReady] = useState<boolean>();
  const [ copiedId, setCopiedId ] = useState<boolean>();

  function updateCardLocally(updatingCardId: string, updatingCardKey: CardKeys, updatingCardValue: any){
    const newCards: Card[] = cards.map( (card: Card) => {
     if (card.id === updatingCardId){
      card[updatingCardKey] = updatingCardValue;
     }
     return card;
    } )
    setCards(newCards);
  }

  async function updateCardGlobally(newCardDetails: Card){ //will send a request to the api to update card data
    try {
      const result = await sendApiRequest(
        API_CALLS.editCard.endpoint,
        API_CALLS.editCard.requestType,
        newCardDetails,
        "updating card...",
      );
      updateCards(result);
    } catch (error) {
      console.log(error);
      console.log("error editing card");
    }
  }

  function updateCards(cardData: any) {
    const newCards: Card[] = [];
    for (let i = 0; i < cardData.length; i++) {
      const thisCardData = cardData[i];
      const newCard: Card = {
        id: thisCardData.id,
        title: thisCardData.title,
        description: thisCardData.description,
        priority: thisCardData.priority,
        parentColumnId: thisCardData.parentColumnId,
        externalWorker: thisCardData.externalWorker
      };
      newCards.push(newCard);
    }
    setCards(newCards);
    if (boardId) {
      updateBoardChildrenAmount(boardId, false, newCards.length);
    }
  }

  async function createCard(createCardDto: CreateCardDto) {
    try {
      const result = await sendApiRequest(
        API_CALLS.createCard.endpoint,
        API_CALLS.createCard.requestType,
        createCardDto,
        "creating card...",
      );
      updateCards(result);
    } catch (error) {
      console.log(error);
      console.log("error creating card");
    }
  }

  async function deleteCard(cardId: string) {
    try {
      const result = await sendApiRequest(
        API_CALLS.deleteCard.endpoint + cardId,
        API_CALLS.deleteCard.requestType,
        null,
        "deleting card...",
      );

      const newCards = cards.filter((card: Card) => card.id !== cardId);
      setCards(newCards);

      if (boardId) {
        updateBoardChildrenAmount(boardId, false, newCards.length);
      }
    } catch (error) {
      console.log(error);
      console.log("error creating card");
    }
  }

  function getColumnCards(columnId: string): Card[] {
    return cards.filter((card: Card) => card.parentColumnId === columnId);
  }

  function getCardById(cardId: string): Card | undefined{
    return cards.find( (card: Card) => card.id === cardId );
  }


  function getAvailableCardStates(boardId: string) {
    const columns: Column[] = getBoardColumns(boardId);

    return columns.map((column: Column) => ({
      label: column.title,
      value: column.title,
      columnId: column.id,
    }));
  }

   function getCardState(card: Card): string | undefined {
    const parentColumn: Column | undefined = columns.find( (column: Column) => card.parentColumnId === column.id );
    if(!parentColumn){
      console.error("card doesn't have a parent");
      return;
    }
    return parentColumn.title;

  }

  async function initCards() {
    if (!receviedBoardId) {
      return;
    }
    try {
      const result = await sendApiRequest(
        API_CALLS.getBoardCards.endpoint + receviedBoardId,
        API_CALLS.getBoardCards.requestType,
        null,
        "Loading cards...",
      );
      updateCards(result);
      setBoardId(receviedBoardId);
      setCardsReady(true);
    } catch (error) {
      console.error(
        `failed to retrieve board cards for board with id: ${boardId} `,
      );
    }
  }

  async function onCopyIdPressed(card: Card){
    if(copiedId) return;
    setCopiedId(true);
    await Clipboard.setStringAsync(card.id);
    setTimeout( () => setCopiedId(false), COPY_ID_COOLDOWN )
  }

  return {
    cards,
    isCardsReady,
    previewCardId,
    isPreviewingCard,
    copiedId,

    initCards,
    createCard,
    deleteCard,
    getColumnCards,
    setPreviewCardId,
    setPreviewingCard,
    getCardById,
    getCardState,
    getAvailableCardStates,
    updateCardLocally,
    updateCardGlobally,
    onCopyIdPressed
  };
}
