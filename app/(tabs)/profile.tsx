import { Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

export default function SearchScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.accent,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontFamily: "Rubik_600SemiBold", color: "white" }}>Profile Page</Text>
    </View>
  );
}
