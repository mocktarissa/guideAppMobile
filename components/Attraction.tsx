import React, { Component, useState } from "react";

import { Text, View, StyleSheet, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
export default function Attraction({ navigation, route }) {
  const { attraction } = route.params;

  return (
    <View style={styles.container}>
      <Text>
        Hello from the Attraction Page
        {attraction}
      </Text>

      <View style={styles.bottom}>
        <Button
          title="Home Page"
          onPress={() => navigation.navigate("Homepage")}
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
