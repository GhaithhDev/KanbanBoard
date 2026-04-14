import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Board from "./Components/Board";

import { BoardApi } from "./ApiRequests/BoardRequests";
import { CardAPI } from "./ApiRequests/CardRequests";
import { CardDetails } from "./Components/CardDetails";
import { BoardSessionDataContext } from "./Contexts/BoardContext";
import { CreateCardModal } from "./Components/CreateCardModal";
import { Priority } from "./Enums/priority";

export default function App() {
  const dummyData = [
    { columnName: "To do", cards: [] ,columnId: "1"},
    { columnName: "Development", cards: [] ,columnId: "2"},
    { columnName: "QA", cards: [] ,columnId: "3"},
    { columnName: "Needs fixes", cards: [] ,columnId: "4"},
    { columnName: "Production ready", cards: [] ,columnId: "5"},
  ];

  const previewCardDummyData = {
    title: "Card details page",
    status: "To do",
    priority: Priority.NORMAL,
    description: "",
    cardId: "",
    columnId: "",
  };

  async function fetchBoardData() {
    const boardData = await BoardApi.createBoard({ name: "secondApp" });

    if (!boardData || !boardData["columns"]) {
      console.error(
        "backend didn't return valid data, make sure it is started",
      );
      return;
    }
    setColumnsData(boardData["columns"]);
    setCreatingCardsData(GetCreatingCardsData());
  }

  async function updateCardDataFromPreview(updated) {
    try {
      const result = await CardAPI.editCard({
        title: updated.title,
        cardId: updated.cardId,
        description: updated.description,
        priority: updated.priority,
        columnId: updated.columnId,
      });
      console.log(result);
      if (result && result["columns"]) {
        setColumnsData(result["columns"]);
        console.log(columnsData);
      }
    } catch (error) {
      console.warn("request to the card API failed" + error);
    }
  }
  function GetCreatingCardsData() {
    let newCreatingCardsData = {};

    for (const columnData of columnsData) {
      const newTable = {
        creatingText: "",
        isCreating: false,
      };
      newCreatingCardsData[columnData.columnName] = newTable;
    }
    return newCreatingCardsData;
  }

  async function AddCardTolist(
    columnId,
    cardTitle,
    cardDescription,
    cardPriority,
  ) {
    try {
      const result = await CardAPI.createCard({
        columnId: columnId,
        title: cardTitle,
        ...(cardDescription !== undefined && { description: cardDescription }),
        ...(cardPriority !== undefined && { priority: cardPriority }),
      });
      setColumnsData(result["columns"]);
    } catch (error) {
      console.warn("request to the card API failed" + error);
    }
  }

  function SetCreatingCardState(columnName, newState) {
    const thisColumnCreatingCardsData = creatingCardsData[columnName];
    if (!thisColumnCreatingCardsData) {
      console.warn("invalid column name");
      return;
    }
    setCreatingCardsData({
      ...creatingCardsData,
      [columnName]: {
        ...thisColumnCreatingCardsData,
        creatingText: "", //also need to reset the creating text on toggle
        isCreating: newState,
      },
    });
  }

  function GetFirstColumnId() {
    return columnsData[0] && columnsData[0].columnId;
  }

  const boardActions = {
    ["AddCardTolist"]: AddCardTolist,
    ["SetCreatingCardState"]: SetCreatingCardState,
    ["GetFirstColumnId"]: GetFirstColumnId,
  };

  const [columnsData, setColumnsData] = useState(dummyData);

  const [creatingCardsData, setCreatingCardsData] = useState(
    GetCreatingCardsData(),
  );

  const [isCardDetailsVisible, setCardDetailsVisibility] = useState(false);
  function toggleCardDetails() {
    setCardDetailsVisibility((prev) => !prev);
  }
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  function toggleCreateModal() {
    setCreateModalVisible((prev) => !prev);
  }

  const [previewCardData, setPreviewCardData] = useState(previewCardDummyData);

  useEffect(() => {
    fetchBoardData();
  }, []);
  return (
    
      <View style={styles.Page1}>
        {/*One board only for now*/}
        <BoardSessionDataContext.Provider
          value={{
            boardActions,
            columnsData,
            creatingCardsData,
            toggleCardDetails,
            toggleCreateModal,
            previewCardData,
            setPreviewCardData,
            updateCardDataFromPreview,
          }}
        >
          <Board
            boardName="App development"
            columns={columnsData}
            creatingCards={creatingCardsData}
            boardActions={boardActions}
          ></Board>
          <CardDetails
            cardModalVisible={isCardDetailsVisible}
            closeModal={() => setCardDetailsVisibility(false)}
          />
          <CreateCardModal
            visible={isCreateModalVisible}
            close={() => setCreateModalVisible(false)}
          />
        </BoardSessionDataContext.Provider>
      </View>
  );
}

const styles = StyleSheet.create({
  Page1: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
