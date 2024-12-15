import { LeaderboardsInnerTopPlayersInner } from "@/api/generated";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";


interface TopUserCardByCategoryProps {
    player: LeaderboardsInnerTopPlayersInner; // Make topPlayers optional
}

export default function TopUserCardByCategory({ player }: TopUserCardByCategoryProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.rank}>{player.rank}</Text>
            <Image source={{ uri: player.avatar }} style={styles.avatar} />
            <View style={styles.detailsContainer}>
                <Text style={styles.username}>{player.username}</Text>
                <Text style={styles.points}>{player.score} points</Text>
            </View>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    rank: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#4A4A4A",
        marginRight: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    detailsContainer: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    points: {
        fontSize: 14,
        color: "#888",
    },
    badgeContainer: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    crownIcon: {
        width: 20,
        height: 20,
        backgroundColor: "#FFD700",
        borderRadius: 10,
    },
});


// Sample Usage Example
// <TopUserCard rank={1} username="Davis Curtis" points={2569} avatar="https://example.com/avatar.png" />
