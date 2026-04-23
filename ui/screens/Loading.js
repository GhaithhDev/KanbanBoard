import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Loading(props) {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.text}</Text>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "white",

    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 0.07,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  text: {
    fontSize: 15,
  },
});
