import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import BoardColumn from "../components/BoardColumn";
import { useBoard } from "../../domain/hooks/boardHook";
import { CreatingInput, CreateButton } from "../components/CreateComponents";
import { useRoute, useNavigation } from "@react-navigation/native";

function CreateColumnSection({
  isCreating,
  setIsCreating,
  onCreateButtonPressed,
  boardId,
  createColumn,
}) {
  function onSubmit(writtenText) {
    setIsCreating(false);
    createColumn(writtenText, boardId);
  }

  if (isCreating) {
    return (
      <View style={styles.createColumnWrapper}>
        <CreatingInput placeHolder="What is the list name?" submit={onSubmit} />
      </View>
    );
  }

  return <CreateButton creatingItem="list" onCreatePressed = {onCreateButtonPressed} />;
}

export default function Board() {
  const route = useRoute();
  const id = route.params.boardId;
  const navigation = useNavigation();

  const {
    isReady,
    title,
    columnIds,
    setIsCreating,
    isCreating,
    createColumn,
    deleteColumn,
    boardId,
    init,
  } = useBoard(id);

  useEffect(() => {
    init();
  }, [boardId]);

  function RenderColumn({ item }) {
    return (
      <BoardColumn key={item} columnId={item} deleteColumn={deleteColumn} />
    );
  }

  function onCreateButtonPressed() {
    setIsCreating(true);
  }

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.chevronLeft} />
          <Text style={styles.backText}>My Boards</Text>
        </TouchableOpacity>
        <Text style={styles.boardTitle}>{title}</Text>
      </View>

      {/* Columns */}
      <View style={styles.columnsArea}>
        <FlatList
          data={columnIds}
          renderItem={RenderColumn}
          keyExtractor={(item) => item}
          bounces={false}
          overScrollMode="never"
          horizontal={true}
          contentContainerStyle={styles.columnsList}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            <CreateColumnSection
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              onCreateButtonPressed={onCreateButtonPressed}
              createColumn={createColumn}
              boardId={boardId}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  // ── Header ──
  header: {
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    //backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    paddingVertical: 4,
    marginBottom: 10,
  },
  chevronLeft: {
    width: 7,
    height: 7,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#2563EB",
    transform: [{ rotate: "45deg" }],
  },
  backText: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "600",
  },
  boardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  // ── Columns area ──
  columnsArea: {
    flex: 1,
    paddingTop: 16,
  },
  columnsList: {
    paddingHorizontal: 16,
    alignItems: "flex-start",
    paddingBottom: 16,
  },

  // ── Add list inline card ──
  createColumnWrapper: {
    marginLeft: 8,
  },
  addListButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: 180,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  plusIcon: {
    width: 18,
    height: 18,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  plusH: {
    position: "absolute",
    width: 14,
    height: 2,
    backgroundColor: "#2563EB",
    borderRadius: 1,
  },
  plusV: {
    position: "absolute",
    width: 2,
    height: 14,
    backgroundColor: "#2563EB",
    borderRadius: 1,
  },
});
