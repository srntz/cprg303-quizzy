import { Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import ProfileUsername from "@/src/components/profile/ProfileUsername";
import ProfileImage from "@/src/components/profile/ProfileImage";

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
      <ProfileImage imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca" />
      <ProfileUsername
        imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"
        username="John Doe"
      />
    </View>
  );
}
