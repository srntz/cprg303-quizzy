import { QuizApi, QuizCategory } from "@/api/generated";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const quizApi = new QuizApi();
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [loading, setLoading] = useState(false);

  async function getCategories() {
    setLoading(true); // Show spinner
    try {
      const response = await quizApi.quizCategoriesGet();
      setCategories(response.data); // Update categories state
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // Hide spinner
    }
  }

  const renderCategoryItem = ({ item }: { item: QuizCategory }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Get Categories" onPress={getCategories} />
      {loading ? (
        <ActivityIndicator size="large" color={Colors.light.text} style={styles.spinner} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item!.id!.toString()}
          renderItem={renderCategoryItem}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.accent,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  spinner: {
    marginTop: 16,
  },
  list: {
    marginTop: 16,
    width: "100%",
  },
  categoryItem: {
    backgroundColor: Colors.light.background,
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  categoryText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});
