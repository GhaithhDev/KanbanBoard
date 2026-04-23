import { Plus } from "lucide-react-native";
import { StyleSheet, Pressable, Text, View, TextInput } from "react-native";

export function CreatingInput(props) {
  function OnFinishWriting(finalText) {
    props.submit(finalText);
  }

  return (
    <View
      style={[styles.contianer, !props.excludeBackground && styles.background,!props.excludeBorder && styles.border]}
    >
      <TextInput
        onSubmitEditing={(e) => OnFinishWriting(e.nativeEvent.text)}
        style={{ marginLeft: 10 }}
        placeholder={props.placeHolder}
        placeholderTextColor={"#3f3e3e60"}
      ></TextInput>
    </View>
  );
}

export function CreateButton(props) {
  return (
    <Pressable
      style={[styles.contianer, !props.excludeBackground && styles.background, !props.excludeBorder && styles.border]}
      onPress={props.onCreatePressed}
    >
      <Plus size={15} style={{ marginLeft: 10 }}></Plus>
      <Text style={{ marginLeft: 8, opacity: 0.5 }}>
        Create a {props.creatingItem}{" "}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contianer: {
    height: 35,
    width: 215,
    borderRadius: 10,

    flexDirection: "row",
    alignItems: "center",
  },

  border: {
    marginTop: 25,
    borderColor: "#cccccc",
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 8,
  },

  background: {
    backgroundColor: "#cccccc54",
  },
});
