import { useState } from "react";
import { Priority } from "../enums/priority";

type cardUsage = {
  title: string;
  description: string;
  priority: Priority;
  setTitle: (newTitle: string) => void;
  setDescription: (newDescription: string) => void;
  setPriority: (newPriority: Priority) => void;
};

export function useCard() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>(Priority.NORMAL);

  return {
    title,
    description,
    priority,
    setTitle,
    setDescription,
    setPriority,
  } satisfies cardUsage;
}

/*async function updateCardDataFromPreview(updated) {
        const newCardData = {
          title: updated.title,
          cardId: updated.cardId,
          description: updated.description,
          priority: updated.priority,
          columnId: updated.columnId,
        };
    
        try {
          const result = await END_POINTS.Card.Post.editCard(
            newCardData,
            () => loadingData.setLoading(true, "Editing card..."),
            () => loadingData.setLoading(false),
          );
          console.log(result);
          if (result && result["columns"]) {
            setColumnsData(result["columns"]);
            console.log(columnsData);
          }
        } catch (error) {
          console.warn("request to the card API failed" + error);
        }
      }*/
