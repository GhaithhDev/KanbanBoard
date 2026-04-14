import { View, Text, TextInput, StyleSheet } from "react-native";

export function InputField(props) {
  return (
    <View style={[styles.inputContainer, props.spaceBelow && styles.spaceBelow]}>
      <Text style={styles.inputTitle}>{props.title}</Text>
      <View style={[styles.inputContent, !props.noBorder && styles.border, !props.noCenter && styles.centeredChildren]}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    
    marginBottom: 12,
    width: "90%",
    justifyContent: "space-between",
  },
  inputTitle: {
    color: "#9e9797",
    fontSize: 13,
    marginBottom: 5,
  },
  border: {
    borderColor: "#9e9797",
    borderWidth: 1,
  },
  inputContent: {
   
    borderRadius: 12,
    
    justifyContent: "center",
  },

  centeredChildren: {
    alignItems: "center",
  },

  spaceBelow: {
    marginBottom: 15,
  },
});
