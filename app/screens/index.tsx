import { Colors } from "@/constants/Colors";
import QuizCard from "@/src/components/card/QuizCard";
import ProfileImage from "@/src/components/profile/ProfileImage";
import SectionTitle from "@/src/components/text/SectionTitle";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
        position: "relative",
      }}
    >
      <View style={styles.mainContainer}>
        <View style={{ justifyContent: "center", gap: 10 }}>
          <Text style={{ color: "#FFD6DD", fontWeight: "500" }}> WELCOME </Text>
          <Text style={{ color: "white", fontWeight: "500", fontSize: 25 }}>John Doe</Text>
        </View>
        <ProfileImage imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca" />
      </View>
      <View></View>
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
  mainContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    paddingVertical: 30,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quizContainer: {
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
