import { View, Text, TextInput, StyleSheet, ViewStyle, Pressable } from "react-native";
import StatusBarMarginLayout from "@/src/components/utils/StatusBarMarginLayout";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function LoginPage() {
  const router = useRouter();
  return (
    <StatusBarMarginLayout backgroundColor={Colors.light.accent} theme={"light"}>
      <View
        style={{
          backgroundColor: Colors.light.accent,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "Rubik_600SemiBold",
            color: "white",
            fontSize: 40,
          }}
        >
          Quizzy
        </Text>
        <TextInput style={styles.input} placeholder={"Email"}></TextInput>
        <TextInput style={styles.input} placeholder={"Password"}></TextInput>
        <Pressable style={styles.button} onPress={() => router.replace("/screens")}>
          <Text style={{ color: "white" }}>Login</Text>
        </Pressable>
      </View>
    </StatusBarMarginLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.light.background,
    width: 250,
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#483D99",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 45,
    borderRadius: 10,
  },
});
