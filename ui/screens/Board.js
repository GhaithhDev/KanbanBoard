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
import { useColumn } from "../../domain/hooks/columnHook";
import { useCard } from "../../domain/hooks/cardHook";
import { AddMemberModal } from "../components/AddMemberModal";
import { CardDetails } from "../components/CardDetails";

function CreateColumnSection({ submit, onCreateButtonPressed, isCreating }) {
  function onSubmit(writtenText) {
    submit(writtenText);
  }

  if (isCreating) {
    return (
      <View style={styles.createColumnWrapper}>
        <CreatingInput placeHolder="What is the list name?" submit={onSubmit} />
      </View>
    );
  }

  return (
    <CreateButton creatingItem="list" onCreatePressed={onCreateButtonPressed} />
  );
}

function MembersBar({ authorizedUsers, onAddPress }) {
  return (
    <View style={styles.membersBar}>
      {authorizedUsers.map((member, index) => (
        <View
          key={member.username}
          style={[
            styles.avatarCircle,
            { backgroundColor: member.color },
            index > 0 && styles.avatarOverlap,
          ]}
        >
          <Text style={styles.avatarText}>
            {member.username.slice(0, 2).toUpperCase()}
          </Text>
        </View>
      ))}
      <TouchableOpacity
        style={[
          styles.addMemberButton,
          authorizedUsers.length > 0 && styles.avatarOverlap,
        ]}
        onPress={onAddPress}
        activeOpacity={0.7}
      >
        <View style={styles.addMemberIcon}>
          <View style={styles.addMemberPlusH} />
          <View style={styles.addMemberPlusV} />
          <View style={styles.addMemberSilhouette} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function Board() {
  const route = useRoute();
  const id = route.params.boardId;
  const navigation = useNavigation();

  const {
    isReady,
    board,
    initBoard,
    isCreating,
    setIsCreating,
    isAddingUser,
    setAdding,
    addingUserText,
    setAddingUserText,
    addBoardToUser,
  } = useBoard(id);

  const {
    isColumnsReady,
    columns,
    initColumns,
    createColumn,
    deleteColumn,
    setColumnCreating,
  } = useColumn(id);

  const { isCardsReady, initCards, isPreviewingCard, previewCardId, setPreviewingCard } = useCard(id);

  useEffect(() => {
    initBoard();
    initColumns();
    initCards();
  }, [id]);

  function RenderColumn({ item }) {
    return (
      <BoardColumn
        key={item}
        column={item}
        setColumnCreating={setColumnCreating}
        deleteColumn={deleteColumn}
        boardId={id}
      />
    );
  }

  function onCreateButtonPressed() {
    setIsCreating(true);
  }

  function onCreateColumnSubmit(writtenText) {
    createColumn(writtenText, board.id);
    setIsCreating(false);
  }

  function closeAddingUserModal() {
    setAdding(false);
  }

  function openAddingUserModal() {
    setAdding(true);
  }



  if (!isReady || !isColumnsReady || !isCardsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <AddMemberModal
          onClose={closeAddingUserModal}
          visible={isAddingUser}
          board={board}
          addingUserText={addingUserText}
          setAddingUserText={setAddingUserText}
          addBoardToUser={addBoardToUser}
        />
        <CardDetails cardModalVisible ={isPreviewingCard}  closeModal = {() => setPreviewingCard(false)} previewCardId = {previewCardId} boardId = { board.id} />
        {/* Header */}
        <View style={styles.header}>
          {/* Back button row */}
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.chevronLeft} />
            <Text style={styles.backText}>My Boards</Text>
          </TouchableOpacity>

          {/* Title + Members row */}
          <View style={styles.titleRow}>
            <Text style={styles.boardTitle} numberOfLines={1}>
              {board.title}
            </Text>
            <MembersBar
              authorizedUsers={board.authorizedUsers}
              onAddPress={openAddingUserModal}
            />
          </View>
        </View>

        {/* Columns */}
        <View style={styles.columnsArea}>
          <FlatList
            data={columns}
            renderItem={RenderColumn}
            keyExtractor={(item) => item.id}
            bounces={false}
            overScrollMode="never"
            horizontal={true}
            contentContainerStyle={styles.columnsList}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={
              <CreateColumnSection
                onCreateButtonPressed={onCreateButtonPressed}
                submit={onCreateColumnSubmit}
                isCreating={board.isCreating}
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
  },
  container: {
    height: "90%",
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
  // ── Title + Members row ──
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  boardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },

  // ── Title + Members row ──
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  boardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  membersBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F3F4F6",
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  addMemberButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  addMemberIcon: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  addMemberPlusH: {
    position: "absolute",
    width: 10,
    height: 1.5,
    backgroundColor: "#6B7280",
    borderRadius: 1,
    top: 3,
    right: 0,
  },
  addMemberPlusV: {
    position: "absolute",
    width: 1.5,
    height: 10,
    backgroundColor: "#6B7280",
    borderRadius: 1,
    top: -1,
    right: 4,
  },
  addMemberSilhouette: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#6B7280",
    bottom: 0,
    left: 0,
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
