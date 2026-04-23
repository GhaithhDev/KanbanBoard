import { useEffect, useState } from "react";
import { FetchRequestTypes } from "../enums/fetchRequestTypes";
import { Card } from "../objects/card.object";
import { useApiRequest } from "./apiRequestHook";
import { CreateCardDto } from "../objects/create-card.dto";

const API_CALLS = {
  getColumn: {
    endpoint: "/column",
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
};

type columnUsage = {
  title: string;
  cards: Card[];
  isReady: boolean;
  isCreating: boolean;
  setIsCreating: (newState: boolean) => void;
  setTitle: (newTitle: string) => void;
  setCards: (newCards: Card[]) => void;
  setReady: (newState: boolean) => void;
  createCard: (createCardDto: CreateCardDto) => void;
  deleteCard: (cardId: string) => void
};

export function useColumn(columnId: string) {
  const { sendApiRequest } = useApiRequest();
  const [title, setTitle] = useState<string>("");
  const [cards, setCards] = useState<Card[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isReady, setReady] = useState(false);

  async function createCard(createCardDto: CreateCardDto) {
    try {
      const result = await sendApiRequest(
        API_CALLS.createCard.endpoint,
        API_CALLS.createCard.requestType,
        createCardDto,
        "creating card...",
      );
      const newCard = {
        id: result.id,
        title: result.title,
        description: result.description,
        priority: result.priority,
        parentColumnId: result.parentColumnId,
      };

      setCards((prev) => [...prev, newCard]);
    } catch (error) {
      console.log(error);
      console.log("error creating card");
    }
  }

  async function deleteCard(cardId: string) {
    console.log(cardId);
    try {
      const result = await sendApiRequest(
        API_CALLS.deleteCard.endpoint + cardId,
        API_CALLS.deleteCard.requestType,
        null,
        "deleting card...",
      );
     
      setCards((prev) => prev.filter( (card: Card) => card.id !== cardId ));
    } catch (error) {
      console.log(error);
      console.log("error creating card");
    }
  }

  function editCard() {}

  async function init() {
    try {
      const result = await sendApiRequest(
        API_CALLS.getColumn.endpoint + "/" + columnId,
        API_CALLS.getColumn.requestType,
        null,
        "Loading board...",
      );

      setTitle(result.columnName);
      setCards(result.cards);
      setReady(true);
    } catch (error) {
      console.error(`failed to retrieve data for column with id: ${columnId} `);
    }
  }

  useEffect(() => {
    init();
  }, [columnId]);

  return {
    title,
    cards,
    isCreating,
    isReady,
    setTitle,
    setCards,
    setIsCreating,
    setReady,
    createCard,
    deleteCard
  } satisfies columnUsage;
}
