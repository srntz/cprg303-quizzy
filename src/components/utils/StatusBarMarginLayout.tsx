import React, { ReactNode } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

interface StatusBarProps {
  children: React.ReactNode;
  theme: "light" | "dark";
  backgroundColor: string;
}

export default function StatusBarMarginLayout({
  children,
  theme,
  backgroundColor,
}: StatusBarProps) {
  return (
    <>
      <View style={{ width: "100%", height: 50, backgroundColor: backgroundColor }}></View>
      {children}
      <StatusBar style={theme} />
    </>
  );
}
