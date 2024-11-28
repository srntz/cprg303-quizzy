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
    <View>
      <ProfileImage imageUrl={imageUrl} />
      <Text style={styles.username}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  username: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 15,
  },
});
