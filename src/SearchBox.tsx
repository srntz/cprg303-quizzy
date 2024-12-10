import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBox() {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="white" style={styles.icon} />
      <TextInput style={styles.input} placeholder="Search" placeholderTextColor="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5B4EC3",
    borderColor: "#a297f7",
    borderRadius: 15,
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    outline: "none",
  },
});
