import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardTitle from "../title/CardTitle";
import CardContainer from "./CardContainer";
import CardImage from "./CardImage";

export default function CategoryCard({
  categoryName,
  imageUrl,
  onPress,
  numberOfQuestions,
}: {
  categoryName: string;
  imageUrl: string;
  onPress: () => void;
  numberOfQuestions: string;
}) {
  return (
    <View>
      <CardContainer onPress={onPress}>
        <CardImage imageUrl={imageUrl} />
        <View style={styles.infoContainer}>
          <CardTitle cardTitle={categoryName} />
          <Text style={styles.details}>{numberOfQuestions}</Text>
        </View>
      </CardContainer>
    </View>
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
