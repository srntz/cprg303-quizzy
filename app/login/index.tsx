import { AuthenticationApi, UserApi } from "@/api/generated";
import { Colors } from "@/constants/Colors";
import StatusBarMarginLayout from "@/src/components/utils/StatusBarMarginLayout";
import { useAuthenticationContext } from "@/src/context/AuthenticationContext";
import { saveItem } from "@/src/utils/secure_storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface ILoginData {
  id: string;
  email: string;
}

export default function LoginPage() {
  const authApi = new AuthenticationApi();
  const userApi = new UserApi();

  const router = useRouter();
  const { setCurrentUser } = useAuthenticationContext();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    error: false,
  });

  async function handleLogin() {
    let login;
    try {
      login = await authApi.loginPost({ email: formState.email });
  
      console.log(login.data);
    } catch (e) {
      console.log(`error: ${e}`);
      setFormState((prev) => {
        return { ...prev, error: true };
      });
      setCurrentUser(undefined);
      return;
    }

    const userId = (login.data as ILoginData).id;
    await saveItem("userId", userId);
    const userData = await userApi.userProfileGet(userId);
    if(userData != null){

      saveItem("avatar", userData!.data!.avatar!);
      saveItem("username", userData!.data!.username!);
      saveItem("email", userData!.data!.email!);
      router.replace("/screens");
    }
  


  }

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

        {/* Email input box */}
        <TextInput
          style={styles.input}
          placeholder={"Email"}
          value={formState.email}
          onChangeText={(text) =>
            setFormState((prev) => {
              return { ...prev, email: text };
            })
          }
        ></TextInput>

        {/* Password input box */}
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          value={formState.password}
          onChangeText={(text) =>
            setFormState((prev) => {
              return { ...prev, password: text };
            })
          }
        ></TextInput>

        {formState.error && (
          <View style={{ backgroundColor: "rgba(255, 0, 0, 0.8)", padding: 10, borderRadius: 10 }}>
            <Text style={{ color: "white" }}>Email or password is incorrect</Text>
          </View>
        )}

        <Pressable style={styles.button} onPress={handleLogin}>
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
