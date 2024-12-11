import React from "react";
import { StyleSheet } from "react-native";
import CardContainer from "../card/CardContainer";
import ProfileUsername from "../profile/ProfileUsername";

interface Player {
  username: string;
  rank: number;
  score: number;
}

interface TopUsersProps {
  topPlayers: Player[];
}

export default function TopUsers({ topPlayers }: TopUsersProps) {
  return (
    <CardContainer style={styles.contaier} disabled={true}>
      {topPlayers.map((player) => (
        <ProfileUsername
          key={player.rank}
          username={player.username}
          imageUrl={`https://www.aiscribbles.com/img/variant/large-preview/${player.rank}/?v=7ce9ca`}
        />
      ))}
      <ProfileUsername
        username="John Doe"
        imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"
      />
      <ProfileUsername
        username="Madely Dias"
        imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"
      />
      <ProfileUsername
        username="Justin Bator"
        imageUrl="https://www.aiscribbles.com/img/variant/large-preview/32046/?v=7ce9ca"
      />
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
