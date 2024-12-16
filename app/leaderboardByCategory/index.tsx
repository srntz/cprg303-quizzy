import { LeaderboardsInner } from "@/api/generated";
import { Colors } from "@/constants/Colors";
import TopUserCardByCategory from "@/src/components/leaderboard/TopUserCardByCategory";
import PageTitle from "@/src/components/text/PageTitle";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function LeaderBoardByCategory() {
  const { leaderboard } = useLocalSearchParams();

  const parsedLeaderboard: LeaderboardsInner | null = leaderboard
    ? JSON.parse(leaderboard as string)
    : null;

  if (!parsedLeaderboard) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", marginTop: 20 }}>Error: No leaderboard data provided.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PageTitle pageTitle={`${JSON.parse(leaderboard as string).category} leaderboard`} />
      </View>
      <ScrollView
        style={styles.leaderboardContainer}
        contentContainerStyle={styles.scrollContainer}
      >
        {parsedLeaderboard.top_players?.map((player) => (
          <TopUserCardByCategory key={player.userId} player={player} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.accent,
    alignItems: "center",
  },
  headerContainer: {
    paddingTop: 5,
    paddingBottom: 20,
    gap: 20,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  leaderboardContainer: {
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
});
