import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import LeadCategory from "@/src/components/leaderboard/LeadCategory";
import TopUsers from "@/src/components/leaderboard/TopUsers";
import User from "@/src/components/leaderboard/User";
import PageTitle from "@/src/components/text/PageTitle";
import leaderboards from "@/api/populate/data/leaderboards.json";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PageTitle pageTitle="Leaderboard" />
      </View>
      {/* {leaderboards.map((leaderboard) => (
        <View key={leaderboard.id} style={styles.leaderboardContainer}>
          <LeadCategory leadCategory={leaderboard.category} />
          <TopUsers topPlayers={leaderboard.top_players} />
        </View>
      ))} */}
      <View style={styles.leaderboardContainer}>
        <LeadCategory leadCategory="Math" />
        {/* <TopUsers topPlayers={leaderboard.top_players} /> */}
        <LeadCategory leadCategory="Science" />
        <User userName="John Doe" points={2569} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.accent,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    marginTop: 30,
    paddingVertical: 30,
    gap: 20,
  },
  leaderboardContainer: {
    width: "100%",
    height: "85%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
