import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { QuizApi } from "@/api/generated";

export default function QuizLayout() {
  return (
    <Stack>
      <Stack.Screen name={"[quizId]"} options={{ headerShown: false }} />
    </Stack>
  );
}
