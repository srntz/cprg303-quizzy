import { Pressable, Text, View } from "react-native";
import React from "react";

export default function QuizEndScreen({
  score,
  onContinue,
}: {
  score: number;
  onContinue: () => void;
}) {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 70 }}>
        <View style={{ alignItems: "center", justifyContent: "center", gap: 15 }}>
          <Text
            style={{
              color: "white",
              width: 300,
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            You have completed the quiz!
          </Text>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "semibold" }}>
            Score: {score}
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: "white",
            width: 200,
            height: 50,
            borderRadius: 10,
            justifyContent: "center",
          }}
          onPress={onContinue}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </>
  );
}
