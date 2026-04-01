import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BoardColumn from "./BoardColumn";


export default function Board(props) {
 

  return (
    <View style={styles.kanbanBoard}>
      <View style={styles.boardHeader}>
        <Text style={styles.boardTitle}>{props.boardName}</Text>
        <Text style={styles.whiteText}>Kanban Board</Text>
      </View>
      <View style ={styles.gap} ></View>
      <View style={styles.downArea}>
        <View style={styles.columnsContainer}>
          {
             props.columns.map(
                (columnData) => (
                    <BoardColumn
                     key = {columnData.columnName}
                     columnName ={columnData.columnName}
                     cards ={columnData.cards}
                    >
                    </BoardColumn>
                ) 
            )
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kanbanBoard: {
    width: '97%',
    height: '90%',
    backgroundColor: "rgb(30, 29, 29)",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  gap: {
    flex: .5
  },
  boardTitle: {
    color: "white",
  },

  whiteText: {
    color: "white",
  },

  boardHeader: {
    flex: 1.2,
    width: '100%',
    //backgroundColor: "rgb(201, 46, 46)",
    justifyContent: 'space-evenly',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(56, 55, 55)",
  },
  downArea: {
    flex: 9.5,
    paddingRight: 10,
    paddingLeft: 10,
    //backgroundColor: "rgb(46, 201, 80)",

    justifyContent: 'center',
    alignItems: 'center',
  },

   columnsContainer: {
    flexDirection: 'row',
    width: '97%',
    height: '100%',
   // backgroundColor: "rgb(0, 0, 0)",
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  },
});
