import { QuizApi, QuizCategory } from "@/api/generated";
import { Colors } from "@/constants/Colors";
import CategoryCard from "@/src/components/card/CategoryCard";
import PageTitle from "@/src/components/text/PageTitle";
import SectionTitle from "@/src/components/text/SectionTitle";
import SearchBox from "@/src/SearchBox";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function SearchScreen() {
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  async function fetchCategories() {
    const api = new QuizApi();
    const res = await api.quizCategoriesGet();
    return res;
  }
  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handlePress = () => {
    console.log("Pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PageTitle pageTitle="Category" />
        <SearchBox />
      </View>
      <View style={styles.categoryContainer}>
        <ScrollView>
          <SectionTitle sectionTitle="Categories" />
          <View style={styles.categoryCardContainer}>
            {categories.map((item) => (
              <View key={item.id} style={styles.categoryCard}>
                <CategoryCard
                  categoryName={item.name ?? ""}
                  onPress={handlePress}
                  numberOfQuestions={1}
                  imageUrl={item.imageUrl ?? ""}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.accent,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    marginTop: 30,
    paddingVertical: 30,
    gap: 20,
    width: "80%",
  },
  categoryContainer: {
    width: "100%",
    height: "75%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  categoryCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "45%",
  },
});
