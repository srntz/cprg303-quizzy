import { Colors } from "@/constants/Colors";
import CategoryCard from "@/src/components/card/CategoryCard";
import QuizCard from "@/src/components/card/QuizCard";
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
      <QuizCard
        title={"Statistic Quiz"}
        imageUrl={"https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"}
        onPress={handlePress}
        category={"Math"}
        numberOfQuestions={"12 Questions"}
      />
    </View>
  );
}
