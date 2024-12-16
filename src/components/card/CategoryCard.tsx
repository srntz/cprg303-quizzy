import React from "react";
import { StyleSheet, View } from "react-native";
import CardTitle from "../text/CardTitle";
import CardContainer from "./CardContainer";
import CardImage from "./ImageCard";

export default function CategoryCard({
  categoryName,
  imageUrl,
  onPress,
}: {
  categoryName: string;
  imageUrl: string;
  onPress: () => void;
}) {
  return (
    <CardContainer onPress={onPress}>
      <CardImage imageUrl={imageUrl} />
      <View style={styles.infoContainer}>
        <CardTitle cardTitle={categoryName} />
      </View>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 10,
  },
  details: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
});
