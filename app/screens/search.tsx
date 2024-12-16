import { Quiz, QuizApi, QuizCategory } from "@/api/generated";
import { Colors } from "@/constants/Colors";
import CategoryCard from "@/src/components/card/CategoryCard";
import QuizCard from "@/src/components/card/QuizCard";
import PageTitle from "@/src/components/text/PageTitle";
import SectionTitle from "@/src/components/text/SectionTitle";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchScreen() {
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [filteredItems, setFilteredItems] = useState<any[]>([]); 
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null); 

  // Fetch categories from API
  async function fetchCategories() {
    const api = new QuizApi();
    const res = await api.quizCategoriesGet();
    return res;
  }

  // Fetch quizzes for a specific category
  async function fetchQuizzes(categoryId: string) {
    const api = new QuizApi();
    const res = await api.quizzesByCategoryGet(categoryId);
    return res;
  }

  // Initialize categories on mount
  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.data);
      setFilteredItems(res.data); // Display all categories by default
    });
  }, []);

  function handleNavigate(quizId: string) {
      router.push(`../quiz/${quizId}`);
    }

  // Filter items (categories or quizzes) based on search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    if (selectedCategory) {
      const filtered = quizzes.filter((quiz) =>
        quiz.name?.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredItems(filtered);
    } else {
      const filtered = categories.filter((category) =>
        category.name?.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, selectedCategory, categories, quizzes]);

  // Handle category selection
  const handleCategorySelect = (category: QuizCategory) => {
    setSelectedCategory(category);
    fetchQuizzes(category.id!).then((res) => {
      setQuizzes(res.data);
      setFilteredItems(res.data); 
      setSearchQuery(""); 
    });
  };

  // Handle returning to category view
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setFilteredItems(categories); 
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PageTitle pageTitle="Search" />
        <TextInput
          style={styles.searchBox}
          placeholder={selectedCategory ? "Search by quiz" : "Search by category"}
          placeholderTextColor={Colors.light.text}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.contentContainer}>
        <ScrollView style={{ marginBottom: 60 }}>
          {selectedCategory ? (
            <>
              <Pressable onPress={handleBackToCategories}>
                <Text style={styles.backButton}>Back to Categories</Text>
              </Pressable>
              <SectionTitle sectionTitle={`Quizzes under "${selectedCategory.name}"`} />
              <View style={styles.quizCardContainer}>
                {filteredItems.map((quiz) => (
                  <View key={quiz.id} style={styles.quizCard}>
                    <QuizCard
                      title={quiz.name ?? ""}
                      imageUrl={quiz.imageUrl}
                      numberOfQuestions={quiz.questions?.length ?? 0}
                      category={quiz.category_id ?? ""}
                      onPress={() => handleNavigate(quiz.id)} 
                    />
                  </View>
                ))}
              </View>
            </>
          ) : (
            <>
              <SectionTitle sectionTitle="Categories" />
              <View style={styles.categoryCardContainer}>
                {filteredItems.map((category) => (
                  <View key={category.id} style={styles.categoryCard}>
                    <CategoryCard
                      categoryName={category.name ?? ""}
                      onPress={() => handleCategorySelect(category)}
                     
                      imageUrl={category.imageUrl ?? ""}
                    />
                  </View>
                ))}
              </View>
            </>
          )}
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
    paddingVertical: 20,
    width: "80%",
  },
  searchBox: {
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
    color: Colors.light.text,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  backButton: {
    color: Colors.light.icon,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "45%",
    marginBottom: 15,
  },
  quizCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quizCard: {
    width: "100%",
    marginBottom: 15,
  },
});
