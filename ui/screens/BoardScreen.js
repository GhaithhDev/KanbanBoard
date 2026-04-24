import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import useAuth from "../../domain/hooks/authHook";
import { useBoardsContainer } from "../../domain/hooks/boardsContainerHook";
import { BOARD_COLORS } from "../../domain/consts/boardColors";
import { getColorFromNum } from "../../domain/utils/getColorFromNum";

const yourBoards = [
  {
    id: "1",
    title: "Product Roadmap",
    columns: 4,
    tasks: 18,
    color: "#2563EB",
  },
  { id: "2", title: "Sprint Planning", columns: 3, tasks: 9, color: "#7C3AED" },
  { id: "3", title: "Marketing Q3", columns: 5, tasks: 24, color: "#0891B2" },
];

const sharedBoards = [
  /*{
    id: "4",
    title: "Design System",
    columns: 3,
    tasks: 11,
    color: "#059669",
    owner: "Sarah M.",
  },
  {
    id: "5",
    title: "Backend Infra",
    columns: 4,
    tasks: 7,
    color: "#DC2626",
    owner: "Alex K.",
  },*/
];

function BoardCard({ board, shared, navigateToBoard}) {

  console.log(board);
  const color = getColorFromNum(board.colorNum);
  return (
    <TouchableOpacity style={styles.boardCard} activeOpacity={0.75} onPress={() => navigateToBoard(board.boardId)}>
      {/* Color accent strip */}
      <View style={[styles.cardStrip, { backgroundColor: color }]} />

      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          {/* Board icon */}
          <View
            style={[styles.boardIcon, { backgroundColor: color + "18" }]}
          >
            <View
              style={[styles.boardIconInner, { backgroundColor: color }]}
            />
          </View>

          {shared && (
            <View style={styles.sharedBadge}>
              <Text style={styles.sharedBadgeText}>Shared</Text>
            </View>
          )}
        </View>

        <Text style={styles.boardTitle}>{board.title}</Text>

        {shared && <Text style={styles.ownerText}>by {board.ownerUsername}</Text>}

        <View style={styles.cardMeta}>
          <View style={styles.metaPill}>
            <Text style={styles.metaText}>{board.columnsAmount} columns</Text>
          </View>
          <View style={styles.metaDot} />
          <View style={styles.metaPill}>
            <Text style={styles.metaText}>{board.cardsAmount} tasks</Text>
          </View>
        </View>
      </View>

      {/* Arrow */}
      <View style={styles.cardArrow}>
        <View style={styles.arrowLine} />
        <View style={styles.arrowHead} />
      </View>
    </TouchableOpacity>
  );
}

export default function BoardsScreen() {
  const { username } = useAuth();
  const { init, ownedBoards , isReady, navigateToBoard } = useBoardsContainer();

  useEffect(() => {
    init();
  }, []);

  if (!isReady){
    return;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning {username} 👋</Text>
            <Text style={styles.headerTitle}>My Boards</Text>
          </View>

          {/* New Board Button */}
          <TouchableOpacity style={styles.newButton} activeOpacity={0.8}>
            <View style={styles.plusIcon}>
              <View style={styles.plusH} />
              <View style={styles.plusV} />
            </View>
            <Text style={styles.newButtonText}>New</Text>
          </TouchableOpacity>
        </View>

        {/* ── Your Boards ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Boards</Text>
            <Text style={styles.sectionCount}>{ownedBoards.length}</Text>
          </View>

          {ownedBoards.map((board) => (
            <BoardCard key={board.boardId} board={board} shared={false} navigateToBoard ={navigateToBoard}/>
          ))}
        </View>

        {/* ── Has Access To ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Has Access To</Text>
            <Text style={styles.sectionCount}>{sharedBoards.length}</Text>
          </View>

          <Text style={styles.sectionSubtitle}>
            Boards others have shared with you
          </Text>

          {sharedBoards.map((board) => (
            <BoardCard key={board.id} board={board} shared={true} navigateToBoard ={navigateToBoard}/>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },

  // ── Header ──
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
    marginTop: 8,
  },
  greeting: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  newButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  plusIcon: {
    width: 14,
    height: 14,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  plusH: {
    position: "absolute",
    width: 14,
    height: 2,
    backgroundColor: "white",
    borderRadius: 1,
  },
  plusV: {
    position: "absolute",
    width: 2,
    height: 14,
    backgroundColor: "white",
    borderRadius: 1,
  },
  newButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },

  // ── Sections ──
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  sectionCount: {
    backgroundColor: "#E5E7EB",
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    overflow: "hidden",
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 12,
  },

  // ── Board Card ──
  boardCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardStrip: {
    width: 5,
    alignSelf: "stretch",
  },
  cardBody: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  boardIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  boardIconInner: {
    width: 14,
    height: 14,
    borderRadius: 4,
  },
  sharedBadge: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  sharedBadgeText: {
    color: "#15803D",
    fontSize: 11,
    fontWeight: "600",
  },
  boardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  ownerText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 6,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  metaPill: {
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  metaText: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },

  // ── Arrow ──
  cardArrow: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
  },
  arrowLine: {
    width: 10,
    height: 2,
    backgroundColor: "#D1D5DB",
    borderRadius: 1,
  },
  arrowHead: {
    width: 6,
    height: 6,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: "#D1D5DB",
    transform: [{ rotate: "45deg" }],
    marginLeft: -3,
  },
});
