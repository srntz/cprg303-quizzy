import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardContainer from "../card/CardContainer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function LeadCategory({ leadCategory }: { leadCategory: string }) {
  return (
    <CardContainer style={styles.container} onPress={() => router.push("/screens/search")}>
      <Text style={styles.text}>{leadCategory}</Text>
      <View style={styles.arrowButton}>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </View>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6D4F4",
    width: "100%",
    borderRadius: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  arrowButton: {
    position: "absolute",
    right: 10,
  },
});
