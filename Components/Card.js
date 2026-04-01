import { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { BoardSessionDataContext } from "../App";

function CreateCard(props) {
  const boardSessionData = useContext(BoardSessionDataContext);

  function OnCreateCardButtonPressed() {
    boardSessionData.boardActions.SetCreatingCardState(props.columnName, true);
  }

  return (
    <Pressable
      style={styles.createCard}
      onPress={() => OnCreateCardButtonPressed()}
    >
      <Text style={styles.createCardText}> + Create</Text>
    </Pressable>
  );
}

function CreatingCardInput(props) {
  const boardSessionData = useContext(BoardSessionDataContext);

  function OnFinishWriting(finalText) {
    console.log("finishedWriting " + finalText);
    boardSessionData.boardActions.SetCreatingCardState(props.columnName, false);
    boardSessionData.boardActions.AddCardTolist(props.columnName, finalText);
  }
  return (
    <View style={styles.creatingCard}>
      <TextInput
        onSubmitEditing={(e) => OnFinishWriting(e.nativeEvent.text)}
        style={styles.textInput}
        placeholder={"What is the task?"}
        placeholderTextColor={"#cccccc"}
      ></TextInput>
    </View>
  );
}

export default function Card(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{props.name}</Text>
    </View>
  );
}

export { CreateCard, CreatingCardInput };

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgb(34,34,34)",
    height: 50,
    width: "100%",
    borderRadius: 10,

    marginBottom: 5,

    justifyContent: "center",
    alignItems: "center",
  },

  createCard: {
    height: 25,
    width: "100%",
    borderRadius: 10,

    marginBottom: 5,

    paddingTop: 2,
    paddingLeft: 10,
  },

  cardText: {
    color: "white",
  },

  createCardText: {
    color: "white",
    fontSize: 10,
    opacity: 0.5,
  },

  creatingCard: {
    backgroundColor: "rgb(34,34,34)",
    height: 25,
    width: "100%",
    borderRadius: 10,

    marginBottom: 5,

    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    color: "white",
    width: "75%",
    height: "75%",
    fontSize: 12,
  },
});
