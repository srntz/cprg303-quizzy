import React from "react";
import { View, Text } from "react-native";
import { Colors } from "@/constants/Colors";

export default function QuizzySplashScreen({ ready }: { ready: boolean }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.accent,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {ready && (
        <Text
          style={{
            fontFamily: "Rubik_600SemiBold",
            color: "white",
            fontSize: 40,
          }}
        >
          Quizzy
        </Text>
      )}
    </View>
  );
}
