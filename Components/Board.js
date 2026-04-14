import { useState, useContext } from "react";
import { StyleSheet, Text, View, Modal, FlatList } from "react-native";
import BoardColumn from "./BoardColumn";
import { AddButton } from "./AddButton";
import { BoardSessionDataContext } from "../Contexts/BoardContext";

export default function Board(props) {
  const boardSessionData = useContext(BoardSessionDataContext);

  function RenderColumn({ item }) {
    return (
      <BoardColumn
        key={item.columnName}
        columnName={item.columnName}
        columnId={item.columnId}
        cards={item.cards}
      ></BoardColumn>
    );
  }
  return (
    <View style={styles.kanbanBoard}>
      <View style={styles.boardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.boardTitle}>{props.boardName}</Text>
          <Text style={styles.kanbanBoardText}>
            tracking the tasks of the kanbanboard development
          </Text>
        </View>
        <View style={styles.headerRight}>
          <AddButton
            itemName={"Card"}
            onPress={boardSessionData.toggleCreateModal}
          ></AddButton>
        </View>
      </View>

      <View style={styles.downArea}>
        <FlatList
          data={props.columns}
          renderItem={RenderColumn}
          keyExtractor={(item) => item.columnId}
          bounces={false} // iOS
          overScrollMode="never" // Android
          style={styles.columnsContainer}
          horizontal={true}
          contentContainerStyle={{ alignItems: "center" }}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kanbanBoard: {
    width: "97%",
    height: "90%",
    backgroundColor: "rgb(255, 255, 255)",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  boardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  kanbanBoardText: {
    maxWidth: 250,
    fontSize: 12,
  },

  headerLeft: {
    justifyContent: "space-between",
  },

  boardHeader: {
    flex: 2.5,
    width: "100%",
    paddingLeft: 10,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(56, 55, 55)",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  downArea: {
    flex: 9,
    paddingRight: 10,
    paddingLeft: 10,

    justifyContent: "center",
    alignItems: "stretch",
  },

  columnsContainer: {
    flexDirection: "row",
    height: "100%",
  },
});
