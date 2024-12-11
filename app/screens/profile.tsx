import { UserApi } from "@/api/generated";
import { Colors } from "@/constants/Colors";
import ProfileChartStats from "@/src/components/profile/ProfileChartStats";
import ProfilePerformanceByCategory from "@/src/components/profile/ProfilePerformanceByCategory";
import ProfileStats from "@/src/components/profile/ProfileStats";
import ProfileUsername from "@/src/components/profile/ProfileUsername";
import { deleteItem, getItem } from "@/src/utils/secure_storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const userApi = new UserApi();

  const [user, setUser] = useState<any | undefined>(undefined); // Adjust the type as per your `user` structure
  const [userStats, setUserStats] = useState<any | undefined>(undefined); // Adjust the type as per your `user` structure
  const [loading, setLoading] = useState(true); // To track the loading state


  async function getUser() {
    await getUserProfile();
    await getUserStats();
    setLoading(false);
  }
  async function getUserProfile() {
    try {
      const userId = (await getItem("userId")) as string;
      const res = await userApi.userProfileGet(userId);
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }

  async function getUserStats() {
    try {
      const userId = (await getItem("userId")) as string;
      const res = await userApi.userStatsGet(userId);
      console.log(res.data);
      setUserStats(res.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }
  const handleSignOut = async () => {
    await deleteItem("userId"); 
    router.replace("/login");
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    // Render a loading indicator while the data is being fetched
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ProfileUsername
          imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"
          username={"Loading..."}
          imageSize={100}
          fontSize={24}
        />
      </View>
    );
  }


  if (!user || !userStats) {
    // Handle the case where the user data couldn't be fetched
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ProfileUsername
          imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"
          username={"Error loading user"}
          imageSize={100}
          fontSize={24}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView} // Allows vertical scrolling
      contentContainerStyle={styles.scrollContent} // Ensures proper alignment
    >
      <View style={styles.outerContainer}>
        <View style={styles.profileContainer}></View>

        <View style={styles.profileUsername}>
          <ProfileUsername
            imageUrl={user.avatar}
            username={user.username || ""}
            imageSize={100}
            fontSize={24}
            style={{
              paddingBottom: 20,
            }}
          />
          <ProfileStats points={userStats.totalPoints} worldRank={userStats.worldRank} bestCategory={userStats.bestCategory} />
          <ProfileChartStats data={userStats.quizzesPlayed} />
          <ProfilePerformanceByCategory data={userStats.topPerformanceByCategory} />
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF3B30", // Red for sign out
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 70,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.light.accent,

  },
  outerContainer: {
    paddingBottom: 60,
  },
  scrollContent: {
    alignItems: "center", // Ensures content aligns properly
  },
  profileUsername: {
    alignItems: "center",
    marginTop: "10%",
  },
  profileContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    position: 'absolute',
    alignItems: "center",
    width: screenWidth * 0.95,
    alignSelf: "center",
    marginTop: 100,
    height: 1100,

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
