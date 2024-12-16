import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.accent,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {
            backgroundColor: Colors.light.background,
            height: 60,
            paddingTop: 11,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Ionicons size={22} name={"home"} color={color} />,
          animation: "shift",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Ionicons size={22} name="search" color={color} />,
          animation: "shift",
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Ionicons size={22} name="stats-chart" color={color} />,
          animation: "shift",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Ionicons size={22} name="person" color={color} />,
          animation: "shift",
        }}
      />
    </Tabs>
  );
}
