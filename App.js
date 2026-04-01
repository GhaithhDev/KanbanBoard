import { createContext, useState, useTransition } from "react";
import { StyleSheet, Text, View } from "react-native";
import Board from "./Components/Board";

export const BoardSessionDataContext = createContext();

export default function App() {
  const dummyData = [
    { columnName: "To do", cards: [] },
    { columnName: "Development", cards: [] },
    { columnName: "QA", cards: [] },
    { columnName: "Needs fixes", cards: [] },
    { columnName: "Production ready", cards: [] },
  ];

  const [columnsData, setColumnsData] = useState(dummyData);

  function GetCreatingCardsStartData() {
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

  const [creatingCardsData, setCreatingCardsData] = useState(
    GetCreatingCardsStartData(),
  );

  function AddCardTolist(columnName, cardContent) {
    const newColumnsData = columnsData.map((thisColumnData) => {
      if (thisColumnData.columnName === columnName) {
        return {
          columnName: thisColumnData.columnName,
          cards: [...thisColumnData.cards, cardContent],
        };
      } else {
        return thisColumnData;
      }
    });
    setColumnsData(newColumnsData);
  }

  function SetCreatingCardState(columnName,newState) {
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

  const boardActions = {
    ["AddCardTolist"]: AddCardTolist,
    ["SetCreatingCardState"]: SetCreatingCardState,
  };

  return (
    <View style={styles.Page1}>
      {/*One board only for now*/}
      <BoardSessionDataContext.Provider value ={{ boardActions, columnsData, creatingCardsData }} >
        <Board
          boardName="Jump for brainrots Board"
          columns={columnsData}
          creatingCards={creatingCardsData}
          boardActions={boardActions}
        ></Board>
      </BoardSessionDataContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  Page1: {
    backgroundColor: "rgb(30, 29, 29)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
