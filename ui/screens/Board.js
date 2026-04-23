import { useEffect } from "react";
import { StyleSheet, Text, View, Modal, FlatList } from "react-native";
import BoardColumn from "../components/BoardColumn";

import * as ScreenOrientation from "expo-screen-orientation";
import { useBoard } from "../../domain/hooks/boardHook";

import { CreatingInput, CreateButton } from "../components/CreateComponents";

function CreateColumnSection({
  isCreating,
  setIsCreating,
  onCreateButtonPressed,
  boardId,
  createColumn
}) {
  function onSubmit(writtenText) {
    setIsCreating(false);
    createColumn(writtenText,boardId);
  }

  if (isCreating) {
    return (
      <CreatingInput placeHolder="What is the list name?" submit={onSubmit} />
    );
  }
  console.log(onCreateButtonPressed);
  return <CreateButton creatingItem="list" onCreatePressed = {onCreateButtonPressed} />;
}

export default function Board({ route }) {
  console.log("loading screens/Board");
  const { isReady, title, columnIds, setIsCreating, isCreating, createColumn, deleteColumn } = useBoard(
    "4d5a9c09-b32a-4ca4-99c0-097872ae4412",
  ); //TODO: get board id from route  static for now (create board feature not done yet)

  // console.log(title,columnIds);
  //get an array of columns from board id

  function RenderColumn({ item }) {
    return <BoardColumn key={item} columnId={item} deleteColumn = {deleteColumn} ></BoardColumn>;
  }

  function closeCreatingModal() {
    setIsCreating(false);
  }

  function toggleCreatingModal() {
    setIsCreating((prev) => !prev);
  }

  function onCreateButtonPressed(){
    console.log("pressed")
    setIsCreating(true);
  }

  

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  if (!isReady) {
    // if its ready then it is already loading
    return;
  }
  return (
    <>
      <View style={styles.Page}>
        <View style={styles.kanbanBoard}>
          <View style={styles.boardHeader}>
            <View style={styles.headerLeft}>
              <Text style={styles.boardTitle}>{title}</Text>
              <Text style={styles.kanbanBoardText}>
                tracking the tasks of the kanbanboard development
              </Text>
            </View>
            <View style={styles.headerRight}>
              {/*<AddButton
              itemName={"Card"}
              onPress={toggleCreatingModal}
            ></AddButton>*/}
            </View>
          </View>

          <View style={styles.downArea}>
            <FlatList
              data={columnIds}
              renderItem={RenderColumn}
              keyExtractor={(item) => item}
              bounces={false} // iOS
              overScrollMode="never" // Android
              style={styles.columnsContainer}
              horizontal={true}
              contentContainerStyle={{ alignItems: "flex-start" }}
              ListFooterComponent={
                <CreateColumnSection
                  isCreating={isCreating}
                  setIsCreating={setIsCreating}
                  onCreateButtonPressed={onCreateButtonPressed}
                  createColumn = {createColumn}
                  boardId="4d5a9c09-b32a-4ca4-99c0-097872ae4412"
                />
              }
            ></FlatList>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Page: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  kanbanBoard: {
    width: "96%",
    height: "90%",
    backgroundColor: "rgb(255, 255, 255)",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "#bd0000",
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
    width: "95%",

    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(56, 55, 55)",
    //backgroundColor: "#00ff73",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  downArea: {
    flex: 9,

    width: "95%",
    justifyContent: "center",
    //backgroundColor: "#006eff",
    alignItems: "stretch",
  },

  columnsContainer: {
    flexDirection: "row",
    height: "100%",
  },
});
