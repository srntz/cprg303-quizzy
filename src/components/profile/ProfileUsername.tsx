import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import ProfileImage from "./ProfileImage";

interface ProfileUsernameProps {
  username: string;
  imageUrl: string;
  style?: ViewStyle; // Allow passing custom styles for the container
  textStyle?: TextStyle; // Allow custom styles for the username text
  fontSize?: number; // Allow customizing font size
  fontWeight?: TextStyle["fontWeight"]; // Optional font weight
  color?: string; // Optional color for the username
  imageSize?: number; // Allow customizing the profile image size
}

export default function ProfileUsername({
  username,
  imageUrl,
  style,
  textStyle,
  fontSize = 16, // Default font size
  fontWeight = "500", // Default font weight
  color = "#333", // Default text color
  imageSize = 80, // Default image size
}: ProfileUsernameProps) {
  return (
    <View style={[styles.container, style]}>
      <ProfileImage imageUrl={imageUrl} size={imageSize} />
      <Text
        style={[
          styles.username,
          textStyle,
          { fontSize, fontWeight, color }, // Dynamic styles for font size, weight, and color
        ]}
      >
        {username}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center", // Center the image and text
    paddingVertical: 10,
  },
  username: {
    textAlign: "center",
    fontSize: 16, // Default font size
    fontWeight: "500",
    marginTop: 10,
    color: "#333", // Neutral color
  },
});
