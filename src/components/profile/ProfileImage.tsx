import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <View style={styles.imageContianer}>
      <Image
        source={{ uri: imageUrl }}
        alt="Profile Image"
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContianer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "lightgray",
    overflow: "hidden",
  },
});
