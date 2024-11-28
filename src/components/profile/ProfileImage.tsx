import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <View style={styles.imageContianer}>
      <Image
        // src="https://www.shutterstock.com/image-vector/head-european-girl-profile-portrait-600nw-1494154307.jpg"
        source={{ uri: imageUrl }}
        alt="Profile Image"
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContianer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "lightgray",
    overflow: "hidden",
  },
});
