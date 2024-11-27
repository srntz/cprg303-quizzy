import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import {useFonts} from "@expo-google-fonts/rubik";
import {Rubik_600SemiBold} from "@expo-google-fonts/rubik";
import QuizzySplashScreen from "@/src/components/utils/QuizzySplashScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({Rubik_600SemiBold})
  const [customSplashScreen, setCustomSplashScreen] = useState(false);

  useEffect(() => {
    async function splashScreenTimeout() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCustomSplashScreen(false)
    }

    if (loaded) {
      SplashScreen.hideAsync();
      setCustomSplashScreen(true);
      splashScreenTimeout();
    }
  }, [loaded]);

  if (customSplashScreen) {
    return <QuizzySplashScreen ready={true}/>
  } else {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }
}
