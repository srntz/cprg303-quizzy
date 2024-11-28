import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileImage from "./ProfileImage";

export default function ProfileUsername({
  username,
  imageUrl,
}: {
  username: string;
  imageUrl: string;
}) {
  return (
    <View style={styles.container}>
      <ProfileImage imageUrl={imageUrl} />
      <Text style={styles.username}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  username: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
  },
});
