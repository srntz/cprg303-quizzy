import { Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import CategoryCard from "@/src/components/card/CategoryCard";

export default function SearchScreen() {
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
      <CategoryCard
        categoryName="Japanese Food"
        onPress={handlePress}
        numberOfQuestions="12 Questions"
        imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"
      />
    </View>
  );
}
