import { Colors } from "@/constants/Colors";
import QuizCard from "@/src/components/card/QuizCard";
import ProfileImage from "@/src/components/profile/ProfileImage";
import SectionTitle from "@/src/components/text/SectionTitle";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const handlePress = () => {
    console.log("Pressed");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.accent,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={styles.mainContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}> WELCOME </Text>
          <Text style={styles.nameText}>John Doe</Text>
        </View>
        <ProfileImage imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca" />
      </View>
      <View style={styles.randomQuizContainer}>
        <View style={{}}>
          <Text style={styles.quickQuizText}>QUICK QUIZ</Text>
          <Text style={styles.startQuizText}>Start Random Quiz</Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Image
            src="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"
            alt="start quiz"
            width={60}
            style={{ borderRadius: 50 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.popularContainer}>
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
    marginTop: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  welcomeContainer: {
    justifyContent: "center",
    gap: 10,
  },
  welcomeText: {
    color: "#FFD6DD",
    fontWeight: "500",
  },
  nameText: {
    color: "white",
    fontWeight: "500",
    fontSize: 25,
  },
  randomQuizContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#FFCCD5",
    padding: 20,
    borderRadius: 20,
    marginBottom: 40,
  },
  quickQuizText: {
    color: "#db7185",
    fontWeight: "500",
    marginBottom: 5,
  },
  startQuizText: {
    color: "#660012",
    fontWeight: "600",
    fontSize: 18,
  },
  popularContainer: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
