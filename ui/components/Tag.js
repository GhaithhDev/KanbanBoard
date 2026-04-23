import { View, Text, Pressable, StyleSheet } from "react-native";

export function Tag(props) {
  return(
    <Text
    style={[
      styles.tagContainer,
      
      {
        color: props.textColor,
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
      },
    ]}
  >
    {props.text}
  </Text>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    borderWidth: 1,
    padding: 3,
    borderRadius: 12,
    justifyContent: "center",
    alignContent: "center",
    fontSize: 9,
  },

  
});
