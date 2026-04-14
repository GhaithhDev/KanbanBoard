import { Pressable, StyleSheet, Text } from "react-native";

export function AddButton(props) {
  return (
    <Pressable
      style={(pressData) => [
        styles.buttonContainer,
        pressData.pressed && styles.pressed,
      ]}
      onPress = {props.onPress}
    >
      <Text style={styles.text}>
        {"+  Add "}
        {props.itemName}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 40,

    backgroundColor: "#005cf1",
    borderRadius: 8,
    shadowColor: "#03193d",

    justifyContent: "center",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.5,
  },
  text: {
    fontWeight: 500,
    textAlign: "center",
    alignSelf: "center",
    color: "white",
  },
});
