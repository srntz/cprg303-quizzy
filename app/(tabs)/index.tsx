import { QuizApi, QuizCategory } from "@/api/generated";
import { Colors } from "@/constants/Colors";
import CategoryCard from "@/src/components/card/CategoryCard";
import QuizCard from "@/src/components/card/QuizCard";
import ProfileImage from "@/src/components/profile/ProfileImage";
import ProfileUsername from "@/src/components/profile/ProfileUsername";
import { useState } from "react";
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


  const handlePress = () => {
    console.log("Pressed");
  };

  const renderCategoryItem = ({ item }: { item: QuizCategory }) => (
    <View style={styles.categoryItem}>

      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.accent,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Get Categories" onPress={getCategories} />
      {loading ? (
        <ActivityIndicator size="large" color={Colors.light.background} style={styles.spinner} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item!.id!.toString()}
          renderItem={renderCategoryItem}
          style={styles.list}
        />
      )}
      <ProfileImage imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca" />
      <ProfileUsername
        imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"
        username="John Doe"
      />
      <QuizCard
        title={"Statistic Quiz"}
        imageUrl={"https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"}
        onPress={handlePress}
        category={"Math"}
        numberOfQuestions={"12 Questions"}
      />
      <CategoryCard
        categoryName="Japanese Food"
        onPress={handlePress}
        numberOfQuestions="12 Questions"
        imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"
      />
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


