import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardTitle from "../text/CardTitle";
import CardContainer from "./CardContainer";
import CardImage from "./ImageCard";

export default function QuizCard({
  title,
  imageUrl,
  onPress,
  category,
  numberOfQuestions,
}: {
  title: string;
  imageUrl: string;
  onPress?: () => void;
  category: string;
  numberOfQuestions: number;
}) {
  return (
    <CardContainer onPress={onPress} style={styles.cardContainer}>
      <CardImage style={styles.imageContainer} imageUrl={imageUrl} />
      <View style={styles.infoContainer}>
        <CardTitle cardTitle={title} />
        <Text style={styles.details}>
          {category} | {numberOfQuestions} Questions
        </Text>
      </View>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
  },
  imageContainer: {
    marginRight: 10,
  },
  infoContainer: {
    justifyContent: "center",
    flexShrink: 1,
  },
  details: {
    fontSize: 12,
    color: "gray",
  },
});
