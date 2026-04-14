import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { X } from "lucide-react-native/icons";
import { InputField } from "./InputField";
import { Dropdown } from "react-native-element-dropdown";
import { Priority } from "../Enums/priority";
import { useState, useContext } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AddButton } from "./AddButton";
import {BoardSessionDataContext} from '../Contexts/BoardContext'
import { Keyboard } from "react-native";

import { priorityOptions } from "../Consts/priorityOptions";

export function CreateCardModal(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState(Priority.NORMAL);
  const BoardSessionData = useContext(BoardSessionDataContext);

  function Submit() {
    
    if (enteredTitle.trim().length === 0) {
      Alert.alert("Error", "Title is required!", [
        {
          text: "Ok"
        },
      ]);
      return;
    }

    BoardSessionData.boardActions.AddCardTolist(BoardSessionData.boardActions.GetFirstColumnId(),enteredTitle,enteredDescription,selectedPriority);
    setEnteredTitle('');
    setEnteredDescription('');
    setSelectedPriority(Priority.NORMAL)
    props.close();
  }

   function OnOutAreaPressed() {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    } else {
      props.close();
    }
  }

  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={OnOutAreaPressed}
      supportedOrientations={["portrait", "landscape"]}
    >
      <Pressable style={styles.cardDetailsModal} onPress={OnOutAreaPressed} >
        <Pressable style={styles.cardDetailsContainer } >
          <View style={styles.header}>
            <Text style={styles.title}>{"Add New Card"}</Text>
            <Pressable onPress={props.close}>
              <X></X>
            </Pressable>
          </View>
          <InputField title={"Title *"}>
            <TextInput
              value={enteredTitle}
              multiline={true}
              style={styles.titleInput}
              returnKeyType="done"
              submitBehavior={"blurAndSubmit"}
              onChangeText={(text) => setEnteredTitle(text)}
            />
          </InputField>
          <InputField title={"Description"}>
            <TextInput
              value={enteredDescription}
              multiline={true}
              style={styles.descriptionInput}
              returnKeyType="done"
              submitBehavior={"blurAndSubmit"}
              onChangeText={(text) => setEnteredDescription(text)}
            />
          </InputField>
          <InputField title={"Priority"}>
            <Dropdown
              data={priorityOptions}
              labelField="label"
              valueField="value"
              value={selectedPriority}
              onChange={(item) => setSelectedPriority(item.value)}
              style={styles.dropdown}
            />
          </InputField>

          <View style={styles.downArea}>
            <View style={styles.buttonsContainer}>
              <Button title={"Cancel"} onPress={props.close}></Button>
              <AddButton itemName={"Card"} onPress = {Submit} ></AddButton>
            </View>
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

    justifyContent: "center",
    alignItems: "center",
  },

  cardDetailsContainer: {
    minWidth: 250,
    maxHeight: 350,
    width: "25%",
    height: "90%",
    backgroundColor: "#eae7e7",
    borderRadius: 10,

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

  title: {
    fontWeight: 500,
    fontSize: 16,
  },

  titleInput: {
    width: "90%",
    height: 30,
  },

  descriptionInput: {
    width: "90%",
    height: 60,
  },

  dropdown: {
    width: "100%",

    borderRadius: 12,
    paddingHorizontal: 10,
    height: 40,
  },

  downArea: {
    width: "90%",
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  buttonsContainer: {
    width: "90%",
    height: "80%",
   
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
