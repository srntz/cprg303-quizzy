import { Quiz, QuizApi } from "@/api/generated";
import { Colors } from "@/constants/Colors";
import QuizCard from "@/src/components/card/QuizCard";
import ProfileImage from "@/src/components/profile/ProfileImage";
import SectionTitle from "@/src/components/text/SectionTitle";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { getItem } from "expo-secure-store";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [popularQuizzes, setPopularQuizzes] = useState<Quiz[]>();
  const [userName, setUserName] = useState("");

  async function fetchPopularQuizzes() {
    const api = new QuizApi();
    const res = await api.popularQuizzesGet();
    return res;
  }

  async function fetchRandomQuiz() {
    const api = new QuizApi();
    const res = await api.randomQuizGet();
    router.push(`../quiz/${res.data.id}`);
  }

  async function getUsername(){
  setUserName( await  getItem("username") ?? "");
  }

  useEffect(() => {
    getUsername();
    fetchPopularQuizzes().then((res) => {
      setPopularQuizzes(res.data);
      console.log(res.data);
    });
  }, []);

  function handleNavigate(quizId: string) {
    router.push(`../quiz/${quizId}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}> WELCOME </Text>
          <Text style={styles.nameText}>{userName}</Text>
        </View>
        <ProfileImage />
      </View>
      <View style={styles.randomQuizContainer}>
        <View style={{}}>
          <Text style={styles.quickQuizText}>QUICK QUIZ</Text>
          <Text style={styles.startQuizText}>Start Random Quiz</Text>
        </View>
        <TouchableOpacity onPress={fetchRandomQuiz}>
          {/* <Text style={styles.quizIcon}>▶</Text> */}
          <Ionicons name="play-circle-outline" size={40} />
        </TouchableOpacity>
      </View>
      <View style={styles.popularContainer}>
        <ScrollView style={{ marginBottom: 30 }}>
          <SectionTitle style={styles.sectionTitle} sectionTitle="Most Popular" />
          {popularQuizzes &&
            popularQuizzes.map((item) => {
              return (
                <QuizCard
                  key={item.id}
                  title={item?.name ?? ""}
                  imageUrl={item.imageUrl ?? ""}
                  onPress={() => handleNavigate(item.id ?? "")}
                  numberOfQuestions={item.questions?.length ?? 0}
                />
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    paddingHorizontal: 10,
  },
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
