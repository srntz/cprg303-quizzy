import { Text, View } from "react-native";
import React from "react";

export default function QuizTimer({ timer }: { timer: number }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 15, color: "white" }}>Remaining Time</Text>
      <Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold", color: "white" }}>
        {timer}
      </Text>
    </View>
  );
}
