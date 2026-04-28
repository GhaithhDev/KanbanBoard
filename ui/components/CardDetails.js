import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Text,
  Keyboard,
} from "react-native";
import { X } from "lucide-react-native/icons";
import { InputField } from "./InputField";
import { priorityOptions } from "../../domain/consts/priorityOptions";
import { Dropdown } from "react-native-element-dropdown";
import { useCard } from "../../domain/hooks/cardHook";
import { CardKeys } from "../../domain/enums/cardKeysEnum";

export function CardDetails({
  closeModal,
  previewCardId,
  boardId,
  cardModalVisible,
}) {
  const {
    getCardById,
    getCardState,
    getAvailableCardStates,
    updateCardLocally,
    updateCardGlobally,
    onCopyIdPressed,
    copiedId
  } = useCard();
  const cardStates = getAvailableCardStates(boardId);
  const card = getCardById(previewCardId);
  if (!card) {
    return;
  }
  const cardState = getCardState(card);
  if (!cardState) {
    return;
  }

  function OnOutAreaPressed() {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    } else {
      closeModal();
      updateCardGlobally(card);
    }
  }

  return (
    <Modal
      transparent={true}
      visible={cardModalVisible}
      animationType="fade"
      onRequestClose={OnOutAreaPressed}
    >
      <Pressable style={styles.cardDetailsModal} onPress={OnOutAreaPressed}>
        <Pressable style={styles.cardDetailsContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{"Task details"}</Text>
              <Pressable onPress={OnOutAreaPressed}>
                <X></X>
              </Pressable>
            </View>
            <InputField title={"Title *"} noBorder={true} spaceBelow={true}>
              {/* props.cardTitle */}
              <TextInput
                value={card.title}
                multiline={true}
                style={styles.titleInput}
                returnKeyType="done"
                submitBehavior={"blurAndSubmit"}
                onChangeText={(text) => {
                  updateCardLocally(card.id, CardKeys.title, text);
                }}
              />
            </InputField>
            <InputField title={"Description"} noBorder={true} noCenter={true}>
              <TextInput
                value={card.description}
                multiline={true}
                style={styles.descriptionInput}
                returnKeyType="done"
                submitBehavior={"blurAndSubmit"}
                onChangeText={(text) => {
                  updateCardLocally(card.id, CardKeys.description, text);
                }}
              />
            </InputField>
            <InputField
              title={"Status"}
              noBorder={true}
              style={styles.spaceBelow}
              noCenter={true}
            >
              <Dropdown
                data={cardStates}
                labelField="label"
                valueField="value"
                value={cardState}
                onChange={(item) => {
                  updateCardLocally(
                    card.id,
                    CardKeys.parentColumnId,
                    item.columnId,
                  );
                }}
                style={styles.dropdown}
              />
            </InputField>
            <InputField title={"Priority"} noBorder={true} noCenter={true}>
              <Dropdown
                data={priorityOptions}
                labelField="label"
                valueField="value"
                value={card.priority}
                onChange={(item) => {
                  updateCardLocally(card.id, CardKeys.priority, item.value);
                }}
                style={styles.dropdown}
              />
            </InputField>
            <InputField
              title={"External worker"}
              noBorder={true}
              spaceBelow={true}
            >
              {/* props.cardTitle */}
              <Text
                style={[styles.titleInput, { marginTop: 10, marginLeft: 15 }]}
              >
                {card.externalWorker ? card.externalWorker : "None"}
              </Text>
            </InputField>
            <Pressable onPress={() => onCopyIdPressed(card)} style={styles.copyIdButton}>
              <Text style={[styles.copyIdText, copiedId && styles.copiedText]}>
                {copiedId ? "Copied!" : "Copy task ID"}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cardDetailsModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#2424247b",
    height: "100%",
    flex: "100%",
    flexDirection: "row-reverse",
  },

  cardDetailsContainer: {
    width: "70%",
    height: "100%",
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    width: "90%",
    marginTop: 10,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#9e9797",
    borderBottomWidth: 1,
    marginBottom: 15,
  },

  dropdown: {
    padding: 5,
    borderRadius: 12,
    marginLeft: 2,

    height: 40,
  },

  downArea: {
    width: "90%",
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontWeight: 600,
    fontSize: 16,
  },

  contentContainer: {
    height: "100%",
    width: "90%",
  },

  buttonsContainer: {
    width: "90%",
    height: "80%",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleInput: {
    fontSize: 15,
    fontWeight: 500,
    width: "98%",
  },

  descriptionInput: {
    marginLeft: 5,
    fontSize: 12,
    minHeight: 80,
  },
  copyIdButton: {
  marginTop: 30,
  alignSelf: "flex-start",
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#9e9797",
},

copyIdText: {
  fontSize: 13,
  color: "#555",
},

copiedText: {
  color: "#22c55e",
  fontWeight: "600",
},
});
