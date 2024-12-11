import { Colors } from "@/constants/Colors";
import QuizCard from "@/src/components/card/QuizCard";
import ProfileImage from "@/src/components/profile/ProfileImage";
import SectionTitle from "@/src/components/text/SectionTitle";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useEffect, useState } from "react";
import { QuizApi } from "@/api/generated";
import { IPopularQuiz } from "@/src/interfaces/IPopularQuiz";
import { Link, router } from "expo-router";

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
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.accent,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={styles.mainContainer}>
        <View style={{ justifyContent: "center", gap: 10 }}>
          <Text style={{ color: "#FFD6DD", fontWeight: "500" }}> WELCOME </Text>
          <Text style={{ color: "white", fontWeight: "500", fontSize: 25 }}>John Doe</Text>
        </View>
        <ProfileImage imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca" />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
          backgroundColor: "#FFCCD5",
          padding: 20,
          borderRadius: 20,
          marginBottom: 40,
        }}
      >
        <View style={{}}>
          <Text style={{ color: "#db7185", fontWeight: "500", marginBottom: 5 }}>QUICK QUIZ</Text>
          <Text style={{ color: "#660012", fontWeight: "600", fontSize: 18 }}>
            Start Random Quiz
          </Text>
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
      <View style={styles.quizContainer}>
        <ScrollView style={styles.scrollView}>
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
  scrollView: {
    marginHorizontal: 10,
  },
  mainContainer: {
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quizContainer: {
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
