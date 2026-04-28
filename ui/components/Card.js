import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";

import { Trash2 } from "lucide-react-native";
import { PriorityTag } from "./PriorityTag";
import { useCard } from "../../domain/hooks/cardHook";

export default function Card(props) {

  const { setPreviewCardId, setPreviewingCard } = useCard();
  /*const boardSessionData = useContext(BoardSessionDataContext);

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
  }*/

  function onCardPressed(){
    setPreviewCardId(props.card.id);
    setPreviewingCard(true);
  }

  return (
    <Pressable style={styles.card} onPress={onCardPressed}>
      <View style={styles.cardHeader}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {props.card.title}
        </Text>
        <Trash2
          color={"red"}
          size={17}
          onPress={() => props.deleteCard(props.card.id)}
        ></Trash2>
      </View>

      {props.card.description?.length > 0 && (
        <Text numberOfLines={2} style={styles.cardDescription}>
          {props.card.description}
        </Text>
      )}
      <View style={[styles.tagsContainer, styles.marginTop]}>
        <PriorityTag priority={props.card.priority} />
      </View>
    </Pressable>
  );
}

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
