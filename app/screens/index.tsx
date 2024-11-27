import { View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.accent,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontFamily: "Rubik_600SemiBold", color: "white" }}>Home Page</Text>
    </View>
  );
}
