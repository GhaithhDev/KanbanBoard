import { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { BoardSessionDataContext } from "../Contexts/BoardContext";
import { FileAxis3D, Snowflake, Trash2 } from "lucide-react-native";
import { Tag } from "./Tag";
import { PriorityTag } from "./PriorityTag";
import { Priority } from "../Enums/priority";

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
    boardSessionData.boardActions.SetCreatingCardState(props.columnName, false);

    boardSessionData.boardActions.AddCardTolist(props.columnId, finalText);
  }
  return (
    <View style={styles.creatingCard}>
      <TextInput
        onSubmitEditing={(e) => OnFinishWriting(e.nativeEvent.text)}
        style={styles.textInput}
        placeholder={"What is the task?"}
        placeholderTextColor={"#3f3e3e60"}
      ></TextInput>
    </View>
  );
}

export default function Card(props) {
  const boardSessionData = useContext(BoardSessionDataContext);

  function OpenPreviewCardDetails() {
    boardSessionData.setPreviewCardData({
      title: props.name,
      description: props.description,
      priority: props.priority,
      status: props.status,
      cardId: props.cardId,
      columnId: props.columnId
    })
    boardSessionData.toggleCardDetails();
  }

  return (
    <Pressable style={styles.card} onPress={OpenPreviewCardDetails}>
      <View style={styles.cardHeader}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {props.name}
        </Text>
        <Trash2 color={"red"} size={13}></Trash2>
      </View>

      {props.description.length > 0 && (
        <Text numberOfLines={2} style={styles.cardDescription}>
          {props.description}
        </Text>
      )}
      <View style={[styles.tagsContainer, styles.marginTop]}>
        <PriorityTag priority={props.priority} />
      </View>
    </Pressable>
  );
}

export { CreateCard, CreatingCardInput };

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgb(255, 255, 255)",
    
    width: "100%",
    borderRadius: 5,

    marginBottom: 5,

    justifyContent: "center",
    alignItems: "center",
  },

  tagsContainer: {
    width: "90%",
    flexDirection: "row",
    marginBottom: 5,
  },
  marginTop: {
    marginTop: 5,
  },

  cardHeader: {
    marginTop: 5,
    marginBottom: 2,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    color: "black",
    width: "70%",

    fontSize: 15,
  },

  cardDescription: {
    color: "#312f2f6c",
    width: "90%",
    fontSize: 12,
  },

  createCard: {
    height: 25,
    width: "100%",
    borderRadius: 10,

    marginBottom: 5,

    paddingTop: 2,
    paddingLeft: 10,
  },

  createCardText: {
    color: "black",
    fontSize: 10,
    opacity: 0.5,
  },

  creatingCard: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 25,
    width: "85%",
    borderRadius: 5,

    marginBottom: 5,

    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    color: "#3f3e3e",
    width: "75%",
    height: "75%",
    fontSize: 12,
  },
});
