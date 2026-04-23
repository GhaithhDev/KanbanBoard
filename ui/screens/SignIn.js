import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import useAuth from "../../domain/hooks/authHook";

export default function SignIn() {
  const { navigateToSignUpPage } = useAuth();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoBox}>
        <View style={styles.logoInner} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Kanban Board</Text>
      <Text style={styles.subtitle}>
        Welcome back! Please sign in to continue
      </Text>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sign In</Text>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="you@example.com"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          style={styles.input}
        />

        {/* Row */}
        <View style={styles.row}>
          <View style={styles.remember}>
            <View style={styles.checkbox} />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>

          <Text style={styles.link}>Forgot password?</Text>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style = {styles.authInstruction}>Don't have an account? </Text>
          <Pressable
            onPress={navigateToSignUpPage}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Text style={styles.link}>Create account</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoBox: {
    width: 60,
    height: 60,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoInner: {
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
    color: "#111827",
  },
  subtitle: {
    color: "#6B7280",
    marginBottom: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#374151",
    marginRight: 6,
  },
  rememberText: {
    color: "#374151",
  },
  link: {
    color: "#2563EB",
  },
  pressed: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  authInstruction:{
    color: "#6B7280",
  },
  footer: {
    textAlign: "center",
    marginTop: 16,

    flexDirection: 'row'
    
  },
});
