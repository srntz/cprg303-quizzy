import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import ProfileImage from "./ProfileImage";

export default function ProfileUsername({
  username,
  imageUrl,
  style,
}: {
  username: string;
  imageUrl: string;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.container, style]}>
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
