import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";


import { BOARD_COLORS } from "../../domain/consts/boardColors";

export default function CreateBoardModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Create New Board</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <View style={styles.closeX}>
                <View
                  style={[
                    styles.closeLine,
                    { transform: [{ rotate: "45deg" }] },
                  ]}
                />
                <View
                  style={[
                    styles.closeLine,
                    { transform: [{ rotate: "-45deg" }] },
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.cardSubtitle}>
            Give your board a name to get started
          </Text>

          {/* Board Name Input */}
          <Text style={styles.label}>Board Name</Text>
          <TextInput
            placeholder="e.g. Sprint Planning, Marketing Q3…"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />

          {/* Color Picker */}
          <Text style={styles.label}>Board Color</Text>
          <View style={styles.colorRow}>
            {BOARD_COLORS.map((c, i) => (
              <TouchableOpacity
                key={c.id}
                style={[
                  styles.colorSwatch,
                  { backgroundColor: c.hex },
                  i === 0 && styles.colorSwatchSelected,
                ]}
                activeOpacity={0.8}
              >
                {i === 0 && <View style={styles.colorCheck} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* Preview */}
          <View style={styles.previewBox}>
            <View
              style={[styles.previewStrip, { backgroundColor: "#2563EB" }]}
            />
            <View style={styles.previewBody}>
              <View
                style={[styles.previewIcon, { backgroundColor: "#2563EB18" }]}
              >
                <View
                  style={[
                    styles.previewIconInner,
                    { backgroundColor: "#2563EB" },
                  ]}
                />
              </View>
              <Text style={styles.previewTitle}>Board Name</Text>
              <View style={styles.previewMeta}>
                <View style={styles.metaPill}>
                  <Text style={styles.metaText}>0 columns</Text>
                </View>
                <View style={styles.metaDot} />
                <View style={styles.metaPill}>
                  <Text style={styles.metaText}>0 tasks</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createText}>Create Board</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  closeX: {
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  closeLine: {
    position: "absolute",
    width: 14,
    height: 2,
    backgroundColor: "#6B7280",
    borderRadius: 1,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
    color: "#111827",
    marginBottom: 20,
  },

  colorRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  colorSwatch: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  colorSwatchSelected: {
    borderWidth: 2.5,
    borderColor: "#111827",
  },
  colorCheck: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },

  previewBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    marginBottom: 24,
  },
  previewStrip: {
    width: 5,
    alignSelf: "stretch",
  },
  previewBody: {
    flex: 1,
    padding: 14,
  },
  previewIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  previewIconInner: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9CA3AF",
    marginBottom: 6,
  },
  previewMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaPill: {
    backgroundColor: "#E5E7EB",
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

  actions: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cancelText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 15,
  },
  createButton: {
    flex: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#2563EB",
  },
  createText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});
