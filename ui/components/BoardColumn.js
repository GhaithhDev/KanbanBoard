import { StyleSheet, Text, View, FlatList } from "react-native";
import Card from "./Card";
import { CreateButton, CreatingInput } from "./CreateComponents";
import { useColumn } from "../../domain/hooks/columnHook";
import { Trash2 } from "lucide-react-native/icons";

function CreateCardSection({
  isCreating,
  columnId,
  setIsCreating,
  createCard,
  onCreateCardButtonPressed,
}) {
  function onSubmit(writtenText) {
    setIsCreating(false);

    createCard({
      title: writtenText,
      parentColumnId: columnId,
    });
  }

  if (isCreating) {
    return <CreatingInput placeHolder="What is the task?" submit={onSubmit}  excludeBorder={true}/>;
  }
  return (
    <CreateButton
      excludeBackground={true}
      excludeBorder={true}
      creatingItem="Card"
      onCreatePressed={onCreateCardButtonPressed}
    />
  );
}

export default function BoardColumn(props) {
  console.log("Loading components/BoardColumn");
  const { columnId } = props;
  const {
    title,
    isCreating,
    cards,
    setIsCreating,
    isReady,
    createCard,
    deleteCard,
  } = useColumn(props.columnId);
  //console.log("got its hook data",title,cards);

  if (!isReady) {
    return;
  }

  function onCreateCardButtonPressed() {
    setIsCreating(true);
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
        deleteCard={deleteCard}
      ></Card>
    );
  }

  return (
    <View style={styles.column}>
      <View style={styles.columnHeaderContainer}>
        <View style={styles.columnHeader}>
          <Text style={styles.columnTitle}>{title}  ({cards.length})</Text>
          <Trash2 size = {17} onPress={() => props.deleteColumn(props.columnId)}/>
        </View>
      </View>
      <View style={styles.columnContent}>
        <View style={{ width: "90%", height: "90%" }}>
          <FlatList
            data={cards}
            renderItem={RenderCard}
            ListFooterComponent={
              <CreateCardSection
                createCard={createCard}
                isCreating={isCreating}
                columnId={columnId}
                setIsCreating={setIsCreating}
                onCreateCardButtonPressed={onCreateCardButtonPressed}
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
