import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import StatusBarMarginLayout from "@/src/components/utils/StatusBarMarginLayout";
import { router } from "expo-router";
import { QuizApi } from "@/api/generated";

export default function Quiz() {
  const { quizId } = useLocalSearchParams();

  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    async function getQuizData() {
      const api = new QuizApi();
      try {
        const data = await api.questionsGet("category1");
        return data;
      } catch (e) {
        return "Error";
      }
    }

    getQuizData().then((data) => console.log(data));
  }, []);

  return (
    <StatusBarMarginLayout backgroundColor={Colors.light.accent} theme={"light"}>
      <View style={{ backgroundColor: Colors.light.accent, flex: 1, alignItems: "center" }}>
        <View style={{ flex: 1, width: "100%", paddingHorizontal: 12 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: "20%",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Text style={{ color: "white" }}>Back</Text>
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "white" }}>
              Remaining Time
            </Text>
            <Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold", color: "white" }}>
              30
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Colors.light.background,
            height: "80%",
            width: "96%",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        ></View>
      </View>
    </StatusBarMarginLayout>
  );
}
