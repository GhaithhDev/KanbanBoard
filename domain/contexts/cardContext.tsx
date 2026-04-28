import { createContext, useState, Dispatch, SetStateAction } from "react";
import { Card } from "../objects/card.object";

export type cardContextData = {
  boardId: string | null;
  cards: Card[];
  previewCardId: string,
  setPreviewCardId: Dispatch<SetStateAction<string>>;
  isPreviewingCard: boolean,
  setPreviewingCard: Dispatch<SetStateAction<boolean>>;

  setCards: Dispatch<SetStateAction<Card[]>>;
  setBoardId: Dispatch<SetStateAction<string | null>>;
};

const initValue: cardContextData = {
  boardId: null,
  cards: [],
  setCards: () => {},
  setBoardId: () => {},
   previewCardId: '',
  setPreviewCardId: () => {},
  isPreviewingCard: false,
  setPreviewingCard: () => {},
};

export const CardContext = createContext<cardContextData>(initValue);

export function CardProvider({ children }: any) {
  const [cards, setCards] = useState<Card[]>([]);
  const [boardId, setBoardId] = useState<string | null>(null);
  const [ previewCardId, setPreviewCardId ] = useState<string>('');
  const [ isPreviewingCard, setPreviewingCard ] = useState<boolean>(false);

  const value = {
    cards: cards,
    boardId: boardId,
    setCards,
    setBoardId,
    previewCardId: previewCardId,
    setPreviewCardId,
    isPreviewingCard: isPreviewingCard,
    setPreviewingCard
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
