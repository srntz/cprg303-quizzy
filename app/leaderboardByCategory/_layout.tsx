import { Stack } from "expo-router";

export default function LeaderBoardByCategoryLayout() {
  return (
    <Stack>
      <Stack.Screen name={"index"} options={{ headerShown: false }} />
    </Stack>
  );
}
