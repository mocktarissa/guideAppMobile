import React, { Component, useState } from "react";

import { Text, View, StyleSheet, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
export default function Homepage({ navigation }) {
  const [places, setPlaces] = useState([
    {
      name: "Viasea",
      location: "112112",
      id: 1,
    },
  ]);
  return (
    <View style={styles.container}>
      <Text>Hello from the Home Page sa</Text>
      {places.map((p) => (
        <Text key={p.id}>{p.name}</Text>
      ))}
      <View style={styles.bottom}>
        <Button
          title="Scan QR"
          onPress={() => navigation.navigate("Scan")}
        ></Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
    width: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
});
