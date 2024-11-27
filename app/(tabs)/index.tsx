import { Colors } from "@/constants/Colors";
import CategoryCard from "@/src/components/card/CategoryCard";
import QuizCard from "@/src/components/card/QuizCard";
import ProfileImage from "@/src/components/profile/ProfileImage";
import ProfileUsername from "@/src/components/profile/ProfileUsername";
import { View } from "react-native";

export default function HomeScreen() {
  const handlePress = () => {
    console.log("Pressed");
  };

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
      <QuizCard
        title={"Statistic Quiz"}
        imageUrl={"https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"}
        onPress={handlePress}
        category={"Math"}
        numberOfQuestions={"12 Questions"}
      />
      <CategoryCard
        categoryName="Japanese Food"
        onPress={handlePress}
        numberOfQuestions="12 Questions"
        imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"
      />
    </View>
  );
}
