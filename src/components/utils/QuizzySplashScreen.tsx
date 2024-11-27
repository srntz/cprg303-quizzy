import React from "react";
import { View, Text } from "react-native";

export default function QuizzySplashScreen({ ready }: { ready: boolean }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#6A5AE0",
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
