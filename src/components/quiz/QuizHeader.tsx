import { Pressable, Text, View } from "react-native";
import React from "react";

export default function QuizHeader({
  quizName,
  onNavigateBack,
}: {
  quizName: string;
  onNavigateBack: () => void;
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        height: "20%",
        alignItems: "center",
        paddingVertical: 5,
        marginTop: 10,
      }}
    >
      <Pressable
        onPress={onNavigateBack}
        style={{
          backgroundColor: "white",
          height: 30,
          width: 70,
          justifyContent: "center",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "black", textAlign: "center", fontWeight: "semibold" }}>Back</Text>
      </Pressable>
      <Text style={{ flex: 1, textAlign: "center", color: "white", fontWeight: "bold" }}>
        {quizName}
      </Text>
      <View style={{ width: 70 }}></View>
    </View>
  );
}
