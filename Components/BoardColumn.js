import { useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Card from "./Card";
import { CreateCard, CreatingCardInput } from "./Card";
import { BoardSessionDataContext } from "../Contexts/BoardContext";
import { Priority } from "../Enums/priority";

export default function BoardColumn(props) {
  const BoardSessionData = useContext(BoardSessionDataContext);

  function GetCreateCardJsxByCreatingData(creatingData, columnName, columnId) {
    if (creatingData && creatingData.isCreating) {
      return (
        <CreatingCardInput
          columnName={columnName}
          columnId={columnId}
        ></CreatingCardInput>
      );
    } else {
      return (
        <CreateCard columnName={columnName} columnId={columnId}></CreateCard>
      );
    }
  }

  function RenderCard({ item }) {
    return (
      <Card
        key={item.id}
        cardId={item.id}
        name={item.title}
        description={item.description}
        priority={item.priority}
        status={props.columnName}
        columnId={props.columnId}
      ></Card>
    );
  }

  return (
    <View style={styles.column}>
      <View style={styles.columnHeaderContainer}>
        <View style={styles.columnHeader}>
          <Text style={styles.columnTitle}>{props.columnName}</Text>
          <Text style={styles.columnTitle}>({props.cards.length})</Text>
        </View>
      </View>
      <View style={styles.columnContent}>
        <View style={{ width: "90%", height: "90%" }}>
          <FlatList
            data={props.cards}
            renderItem={RenderCard}
            ListFooterComponent={GetCreateCardJsxByCreatingData(
              BoardSessionData.creatingCardsData[props.columnName],
              props.columnName,
              props.columnId,
            )}
          ></FlatList>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    minWidth: 225,
    height: "100%",
    width: "19%",
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },

  columnHeaderContainer: {
    width: "100%",
    height: "10%",

    justifyContent: "center",
    alignItems: "center",
  },
  columnHeader: {
    width: "90%",
    height: "100%",
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
  },

  hoveringOverColumnContent: {
    backgroundColor: "rgba(184, 237, 229, 0.46)",
    borderColor: "rgb(102, 135, 255)",
  },
  columnContent: {
    width: "97%",
    height: "93%",
    backgroundColor: "#cccccc54",
    borderColor: "#cccccc",
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 8,
    

    justifyContent: "center",
    alignItems: "center",
  },

  columnTitle: {
    color: "black",
    fontWeight: 500,
  },
});
