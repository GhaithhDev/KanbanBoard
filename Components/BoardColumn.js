import { useState, useContext  } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Card from "./Card";
import { CreateCard, CreatingCardInput } from "./Card";
import { BoardSessionDataContext } from "../App";

export default function BoardColumn(props) {
  const BoardSessionData = useContext(BoardSessionDataContext);

  function GetCreateCardJsxByCreatingData(creatingData,columnName) {
    if (creatingData.isCreating) {
      return <CreatingCardInput columnName = {columnName}></CreatingCardInput>;
    } else {
      return <CreateCard columnName = {columnName} ></CreateCard>;
    }
  }

  return (
    <View style={styles.column}>
      <View style={styles.columnHeader}>
        <Text style={styles.columnTitle}>
          {props.columnName} ({props.cards.length})
        </Text>
      </View>
      <View style={styles.columnContent}>
        {props.cards.map((cardName) => (
          <Card key={cardName} name={cardName}></Card>
        ))}
        {GetCreateCardJsxByCreatingData(
          BoardSessionData.creatingCardsData[props.columnName],
          props.columnName
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    backgroundColor: "rgb(0, 0, 0)",
    height: "100%",
    width: "19%",
    borderRadius: 10,

    justifyContent: "space-around",
    alignItems: "center",
  },

  columnHeader: {
    width: "100%",
    height: "10%",

    justifyContent: "center",
    alignItems: "center",
  },

  columnContent: {
    width: "97%",
    height: "87%",
    backgroundColor: "rgb(21, 21, 21)",
    borderRadius: 8,
  },

  columnTitle: {
    color: "white",
  },
});
