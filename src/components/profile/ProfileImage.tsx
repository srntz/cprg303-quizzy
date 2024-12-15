import { getItem } from "@/src/utils/secure_storage";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";

interface ProfileImageProps {
  imageUrl?: string;
  style?: ViewStyle; // Allow custom styles for the container
  size?: number; // Allow customizable size for the profile image
}

export default function ProfileImage({imageUrl, style, size = 80 }: ProfileImageProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(imageUrl);

  useEffect(() => {
    const fetchAvatar = async () => {
      if(!imageUrl){
        const storedUrl = (await getItem("avatar")) as string | undefined;
      setAvatarUrl(storedUrl);
      }
    };
    fetchAvatar();
  }, []);

  return (
    <View style={[styles.imageContainer, style, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image
        source={{ uri: avatarUrl }}
        style={styles.image}
        resizeMode="cover" // Ensure the image covers the container
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "lightgray",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
