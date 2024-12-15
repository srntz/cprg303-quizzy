import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import ProfileImage from "./ProfileImage";

interface ProfileUsernameProps {
  username: string;
  imageUrl?: string;
  style?: ViewStyle; // Allow passing custom styles for the container
  textStyle?: TextStyle; // Allow custom styles for the username text
  fontSize?: number; // Allow customizing font size
  fontWeight?: TextStyle["fontWeight"]; // Optional font weight
  color?: string; // Optional color for the username
  imageSize?: number; // Allow customizing the profile image size
  rank?: number; // Rank number to display on the bottom-left
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
  rank,
}: ProfileUsernameProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={{ position: "relative" }}>
        <ProfileImage imageUrl={imageUrl} size={imageSize} />
        {rank !== undefined && (
          <View style={[styles.rankContainer, { width: imageSize / 3, height: imageSize / 3 }]}>
            <Text style={styles.rankText}>{rank}</Text>
          </View>
        )}
      </View>
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
  rankContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#e0e0e0", // Light gray background for the rank
    borderRadius: 50, // Make it circular
    justifyContent: "center",
    alignItems: "center",
  },
  rankText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333", // Neutral color for the rank text
  },
});
