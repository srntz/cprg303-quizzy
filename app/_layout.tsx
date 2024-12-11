import { useColorScheme } from "@/hooks/useColorScheme";
import QuizzySplashScreen from "@/src/components/utils/QuizzySplashScreen";
import { AuthenticationContext } from "@/src/context/AuthenticationContext";
import { IUserData } from "@/src/interfaces/IUserData";
import { getItem } from "@/src/utils/secure_storage";
import { Rubik_600SemiBold, useFonts } from "@expo-google-fonts/rubik";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter(); // Use the router to navigate programmatically
  const [loaded] = useFonts({ Rubik_600SemiBold });
  const [customSplashScreen, setCustomSplashScreen] = useState(false);

  const [currentUser, setCurrentUser] = useState<IUserData | undefined>(undefined);

  useEffect(() => {
    async function initializeApp() {
      try {
        // Check if a userId is stored
        const userId = await getItem("userId");

        if (userId) {
          // If userId exists, navigate to /screens
          router.replace("/screens");
        } else {
          // Otherwise, show the splash screen for 2 seconds
          setCustomSplashScreen(true);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        setCustomSplashScreen(false);
        SplashScreen.hideAsync();
      }
    }

    if (loaded) {
      initializeApp();
    }
  }, [loaded]);

  if (customSplashScreen) {
    return <QuizzySplashScreen ready={true} />;
  } else {
    return (
      <AuthenticationContext.Provider value={{ data: currentUser, setCurrentUser: setCurrentUser }}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme} children={undefined}>
          <Stack>
            <Stack.Screen name={"login"} options={{ headerShown: false }} />
            <Stack.Screen name={"screens"} options={{ headerShown: false }} />
            <Stack.Screen name={"quiz"} options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthenticationContext.Provider>
    );
  }
}
