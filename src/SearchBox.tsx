import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBoxProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBox({ placeholder, value, onChangeText }: SearchBoxProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.text}
        value={value}
        onChangeText={onChangeText}
      />
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
