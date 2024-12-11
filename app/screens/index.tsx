import { Colors } from "@/constants/Colors";
import QuizCard from "@/src/components/card/QuizCard";
import ProfileImage from "@/src/components/profile/ProfileImage";
import SectionTitle from "@/src/components/text/SectionTitle";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { QuizApi } from "@/api/generated";
import { IPopularQuiz } from "@/src/interfaces/IPopularQuiz";
import { router } from "expo-router";

export default function HomeScreen() {
  const [popularQuizzes, setPopularQuizzes] = useState<IPopularQuiz[]>([]);

  useEffect(() => {
    async function fetchPopularQuizzes() {
      const api = new QuizApi();
      const res = await api.popularQuizzesGet();
      return res;
    }

    fetchPopularQuizzes().then((res) => {
      setPopularQuizzes(res.data);
    });
  }, []);

  const handlePress = () => {
    console.log("Pressed");
  };

  function handleNavigate(quizId: string) {
    router.push(`../quiz/${quizId}`);
  }

  return (
    <View style={styles.container}>
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
            style={{ width: 70, height: 70, borderRadius: 50 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.popularContainer}>
        <ScrollView>
          <SectionTitle sectionTitle="Most Popular" />
          {popularQuizzes.map((item) => {
            return (
              <QuizCard
                key={item.id}
                title={item.name}
                imageUrl={"https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"}
                category={item.category_id}
                onPress={() => handleNavigate(item.id)}
                numberOfQuestions={item.questions.length}
              />
            );
          })}
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
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
});
