import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
  Text,
  Keyboard,
} from "react-native";
import { X } from "lucide-react-native/icons";
import { InputField } from "./InputField";
import { priorityOptions } from "../Consts/priorityOptions";
import { useState, useContext, useRef } from "react";
import { Priority } from "../Enums/priority";
import { BoardSessionDataContext } from "../Contexts/BoardContext";
import { Dropdown } from "react-native-element-dropdown";
import { AddButton } from "./AddButton";
import { PriorityTag } from "./PriorityTag";
import Board from "./Board";

export function CardDetails(props) {
  const boardSessionData = useContext(BoardSessionDataContext);
  const debounceTimer = useRef(null);

  function GetAvailableStatesArray() {
    let availableStates = [];
    for (let i = 0; i < boardSessionData.columnsData.length; i++) {
      const currentColumnData = boardSessionData.columnsData[i];
      availableStates = [
        ...availableStates,
        {
          label: currentColumnData.columnName,
          value: currentColumnData.columnName,
          columnId: currentColumnData.columnId,
        },
      ];
    }
    return availableStates;
  }

  function UpdateCardDetails(updatedPreview,delay) {
    if (delay){
      clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      boardSessionData.updateCardDataFromPreview(updatedPreview);
    }, 200);
    
    }else{
      boardSessionData.updateCardDataFromPreview(updatedPreview);
    }
  }

  function OnOutAreaPressed() {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    } else {
      props.closeModal();
    }
  }
  return (
    <Modal
      transparent={true}
      visible={props.cardModalVisible}
      onRequestClose={OnOutAreaPressed}
      supportedOrientations={["portrait", "landscape"]}
    >
      <Pressable style={styles.cardDetailsModal} onPress={OnOutAreaPressed}>
        <Pressable style={styles.cardDetailsContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{"Task details"}</Text>
              <Pressable onPress={props.closeModal}>
                <X></X>
              </Pressable>
            </View>
            <InputField title={"Title *"} noBorder={true} spaceBelow={true}>
              {/* props.cardTitle */}
              <TextInput
                value={boardSessionData.previewCardData.title}
                multiline={true}
                style={styles.titleInput}
                returnKeyType="done"
                submitBehavior={"blurAndSubmit"}
                onChangeText={(text) => {
                  const updated = {
                    ...boardSessionData.previewCardData,
                    title: text,
                  };
                  boardSessionData.setPreviewCardData(updated);
                  UpdateCardDetails(updated,true);
                }}
              />
            </InputField>
            <InputField title={"Description"} noBorder={true} noCenter={true}>
              <TextInput
                value={boardSessionData.previewCardData.description}
                multiline={true}
                style={styles.descriptionInput}
                returnKeyType="done"
                submitBehavior={"blurAndSubmit"}
                onChangeText={(text) => {
                  const updated = {
                    ...boardSessionData.previewCardData,
                    description: text,
                  };
                  boardSessionData.setPreviewCardData(updated);
                  UpdateCardDetails(updated,true);
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
                data={GetAvailableStatesArray()}
                labelField="label"
                valueField="value"
                value={boardSessionData.previewCardData.status}
                onChange={(item) => {
                  const updated = {
                    ...boardSessionData.previewCardData,
                    status: item.value,
                    columnId: item.columnId,
                  };
                  boardSessionData.setPreviewCardData(updated);
                  UpdateCardDetails(updated);
                }}
                style={styles.dropdown}
              />
            </InputField>
            <InputField title={"Priority"} noBorder={true} noCenter={true}>
              <Dropdown
                data={priorityOptions}
                labelField="label"
                valueField="value"
                value={boardSessionData.previewCardData.priority}
                onChange={(item) => {
                  const updated = {
                    ...boardSessionData.previewCardData,
                    priority: item.value,
                  };
                  boardSessionData.setPreviewCardData(updated);
                  UpdateCardDetails(updated);
                }}
                style={styles.dropdown}
              />
            </InputField>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cardDetailsModal: {
    backgroundColor: "#2424247b",
    height: "100%",
    flex: "100%",
    flexDirection: "row-reverse",
  },

  cardDetailsContainer: {
    width: "50%",
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
});
