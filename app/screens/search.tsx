import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import CategoryCard from "@/src/components/card/CategoryCard";
import SectionTitle from "@/src/components/text/SectionTitle";
import PageTitle from "@/src/components/text/PageTitle";
import SearchBox from "@/src/SearchBox";

const data = [
  {
    id: "1",
    categoryName: "Food",
    numberOfQuestions: 12,
    imageUrl: "https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca",
  },
  {
    id: "2",
    categoryName: "Math",
    numberOfQuestions: 20,
    imageUrl: "https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca",
  },
  {
    id: "3",
    categoryName: "History",
    numberOfQuestions: 9,
    imageUrl: "https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca",
  },
  {
    id: "4",
    categoryName: "Science",
    numberOfQuestions: 11,
    imageUrl: "https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca",
  },
  {
    id: "5",
    categoryName: "Technology",
    numberOfQuestions: 19,
    imageUrl: "https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca",
  },
  {
    id: "6",
    categoryName: "Sport",
    numberOfQuestions: 15,
    imageUrl: "https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca",
  },
];

export default function SearchScreen() {
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
            {data.map((item) => (
              <View key={item.id} style={styles.categoryCard}>
                <CategoryCard
                  categoryName={item.categoryName}
                  onPress={handlePress}
                  numberOfQuestions={item.numberOfQuestions}
                  imageUrl={item.imageUrl}
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
