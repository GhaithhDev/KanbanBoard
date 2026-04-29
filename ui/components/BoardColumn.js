import { StyleSheet, Text, View, FlatList } from "react-native";
import Card from "./Card";
import { CreateButton, CreatingInput } from "./CreateComponents";
import { Trash2 } from "lucide-react-native/icons";
import { useCard } from "../../domain/hooks/cardHook";
import { useEffect } from "react";

function CreateCardSection({
  isCreating,
  submitCreateCard,
  onCreateCardButtonPressed,
}) {
  function onSubmit(writtenText) {
    submitCreateCard(writtenText);
  }

  if (isCreating) {
    return (
      <CreatingInput
        placeHolder="What is the task?"
        submit={onSubmit}
        excludeBorder={true}
        excludeMargin={true}
      />
    );
  }
  return (
    <CreateButton
      excludeBackground={true}
      excludeBorder={true}
      creatingItem="Card"
      onCreatePressed={onCreateCardButtonPressed}
      excludeMargin={true}
    />
  );
}

export default function BoardColumn({
  boardId,
  column,
  setColumnCreating,
  deleteColumn,
}) {
  console.log("Loading components/BoardColumn");
  const { getColumnCards, deleteCard, createCard } = useCard();
  const cards = getColumnCards(column.id);

  function onCreateCardButtonPressed() {
    setColumnCreating(column.id, true);
  }

  function RenderCard({ item }) {
    return <Card key={item.id} card={item} deleteCard={deleteCard}></Card>;
  }

  function submitCreateCard(writtenText) {
    createCard({
      title: writtenText,
      parentColumnId: column.id,
      boardId: boardId
    });

    setColumnCreating(column.id, false);
  }

  return (
    <View style={styles.column}>
      <View style={styles.columnHeaderContainer}>
        <View style={styles.columnHeader}>
          <Text style={styles.columnTitle}>
            {column.title} ({cards.length})
          </Text>
          <Trash2 size={17} onPress={() => deleteColumn(column.id)} />
        </View>
      </View>
      <View style={styles.columnContent}>
        <View style={{ width: "90%", height: "95%" }}>
          <FlatList

            data={cards}
            renderItem={RenderCard}
            ListFooterComponent={
              <CreateCardSection
                isCreating={column.isCreating}
                onCreateCardButtonPressed={onCreateCardButtonPressed}
                submitCreateCard={submitCreateCard}
              />
            }
          ></FlatList>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    width: 240,
    height: "100%",
    borderRadius: 10,
    justifyContent: "space-around",
    marginRight: 20,
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
    height: "90%",
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
