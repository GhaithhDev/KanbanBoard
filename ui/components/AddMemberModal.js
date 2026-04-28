// ── AddMemberModal.js ──
import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

function ExistingMember({color, name}) {
  return (
    <View style={styles.existingRow} >
      <View style={[styles.existingAvatar, { backgroundColor: color }]}>
        <Text style={styles.existingAvatarText}>{name.slice(0,2)}</Text>
      </View>
      <Text style={styles.existingName}>{name}</Text>
      <View style={styles.accessBadge}>
        <Text style={styles.accessBadgeText}>Member</Text>
      </View>
    </View>
  );
}
export function AddMemberModal({ visible, onClose, board, addingUserText, setAddingUserText, addBoardToUser }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Centered card */}
      <View style={styles.centeredWrapper} pointerEvents="box-none">
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Add to board</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <View style={styles.closeX1} />
              <View style={styles.closeX2} />
            </TouchableOpacity>
          </View>

          <Text style={styles.cardSubtitle}>
            Enter the username of the person you'd like to share this board
            with.
          </Text>

          {/* Input row */}
          <View style={styles.inputRow}>
            <View style={styles.previewAvatar}>
              <Text style={styles.previewAvatarText}>??</Text>
            </View>
            <TextInput
              value = {addingUserText}
              style={styles.input}
              placeholder="e.g. Voranox"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onChangeText={(newText) => setAddingUserText(newText)}
            />
          </View>

          {/* Existing members */}
          <View style={styles.existingSection}>
            <Text style={styles.existingLabel}>Already has access</Text>
            {board.authorizedUsers.map( (user) => <ExistingMember color = {user.color} name = {user.username} key ={user.username} /> )}
          </View>

          {/* CTA */}
          <TouchableOpacity style={styles.inviteButton} activeOpacity={0.8} onPress={ () => addBoardToUser(addingUserText,board.id)} >
            <Text style={styles.inviteButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  centeredWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  closeX1: {
    position: "absolute",
    width: 12,
    height: 1.5,
    backgroundColor: "#6B7280",
    borderRadius: 1,
    transform: [{ rotate: "45deg" }],
  },
  closeX2: {
    position: "absolute",
    width: 12,
    height: 1.5,
    backgroundColor: "#6B7280",
    borderRadius: 1,
    transform: [{ rotate: "-45deg" }],
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 18,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  previewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  previewAvatarText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9CA3AF",
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
  existingSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 16,
  },
  existingLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  existingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  existingAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  existingAvatarText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  existingName: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  accessBadge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  accessBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4F46E5",
  },
  inviteButton: {
    marginTop: 20,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  inviteButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
});
