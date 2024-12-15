import { LeaderboardsApi, LeaderboardsInner } from "@/api/generated";
import { Colors } from "@/constants/Colors";
import LeadCategory from "@/src/components/leaderboard/LeadCategory";
import TopUsers from "@/src/components/leaderboard/TopUsers";
import PageTitle from "@/src/components/text/PageTitle";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Leaderboard() {
  const leaderboardsApi = new LeaderboardsApi();
  const [leaderboards, setLeaderboards] = useState<LeaderboardsInner[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchLeaderboards() {
    const res = await leaderboardsApi.leaderboardsGet();
    setLeaderboards(res.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  if(loading)
    return(<View><p>Loading....</p></View>)

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PageTitle pageTitle="Leaderboard" />
      </View>
      <ScrollView style={styles.leaderboardContainer} contentContainerStyle={styles.scrollContainer}>
        {leaderboards.map((leaderboard) => (
          <TouchableOpacity onPress={() =>
            router.push({
              pathname: "../leaderboardByCategory", // Adjust to match your route
              params: { leaderboard: JSON.stringify(leaderboard) }, // Pass parameters
            })
          }>
            <View key={leaderboard.id} >
              <LeadCategory leadCategory={leaderboard.category ?? ""} />
              <TopUsers topPlayers={leaderboard.top_players?.slice(0, 3) ?? []} />
            </View>

          </TouchableOpacity>

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
    marginTop: 30,
    paddingVertical: 30,
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
