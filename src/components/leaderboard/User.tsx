import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardContainer from "../card/CardContainer";
import ProfileImage from "../profile/ProfileImage";

export default function User({ userName, points }: { userName: string; points: number }) {
  return (
    <CardContainer disabled={true} style={styles.container}>
      <ProfileImage />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.point}>{points} points</Text>
      </View>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 20,
    gap: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  point: {
    textAlign: "center",
    color: "gray",
  },
});
