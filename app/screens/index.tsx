import { Colors } from "@/constants/Colors";
import QuizCard from "@/src/components/card/QuizCard";
import SectionTitle from "@/src/components/text/SectionTitle";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const handlePress = () => {
    console.log("Pressed");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.accent,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <View style={styles.quizContainer}>
        <ScrollView style={styles.scrollView}>
          <SectionTitle sectionTitle="Most Popular" />
          <QuizCard
            title={"Statistic Quiz"}
            imageUrl={"https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"}
            onPress={handlePress}
            category={"Math"}
            numberOfQuestions={12}
          />
          <QuizCard
            title={"Statistic Quiz"}
            imageUrl={"https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"}
            onPress={handlePress}
            category={"Math"}
            numberOfQuestions={12}
          />
          <QuizCard
            title={"Statistic Quiz"}
            imageUrl={"https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"}
            onPress={handlePress}
            category={"Math"}
            numberOfQuestions={12}
          />
          <QuizCard
            title={"Statistic Quiz"}
            imageUrl={"https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"}
            onPress={handlePress}
            category={"Math"}
            numberOfQuestions={12}
          />
          <QuizCard
            title={"Statistic Quiz"}
            imageUrl={"https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"}
            onPress={handlePress}
            category={"Math"}
            numberOfQuestions={12}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
  },

  quizContainer: {
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
  },
});
