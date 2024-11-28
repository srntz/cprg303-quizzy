import React from "react";
import { StyleSheet, View } from "react-native";
import CardContainer from "../card/CardContainer";
import ProfileUsername from "../profile/ProfileUsername";

export default function TopUsers() {
  return (
    <CardContainer style={styles.contaier} disabled={true}>
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
