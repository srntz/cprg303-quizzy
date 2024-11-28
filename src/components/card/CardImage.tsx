import React from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";

export default function CardImage({ imageUrl, style }: { imageUrl: string; style?: ViewStyle }) {
  return (
    <View style={[styles.imageContainer, style]}>
      <Image source={{ uri: imageUrl }} style={styles.image}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
