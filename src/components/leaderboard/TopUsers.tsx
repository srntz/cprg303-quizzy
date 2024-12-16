import { LeaderboardsInnerTopPlayersInner } from "@/api/generated";
import React from "react";
import { StyleSheet } from "react-native";
import CardContainer from "../card/CardContainer";
import ProfileUsername from "../profile/ProfileUsername";

interface TopUsersProps {
  leaderboardId: string,
  topPlayers: LeaderboardsInnerTopPlayersInner[]; // Make topPlayers optional
}


export default function TopUsers({ topPlayers, leaderboardId }: TopUsersProps) {
  return (
    <CardContainer style={styles.contaier} disabled={true}>
      {topPlayers.map((player, index) => {
        console.log(player);
        return (
          <ProfileUsername
            key={`${leaderboardId}_${player.username}`}
            rank={index + 1}
            imageSize={60}
            fontSize={12}
            username={player.username ?? ''}
            imageUrl={player.avatar ?? ''} />
        );
      })}
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  contaier: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  uesr: {},
});
