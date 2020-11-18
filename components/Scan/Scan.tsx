import { View, StyleSheet, Button, Text } from "react-native";
import React, { useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { nativeTheme } from "electron";
import PoiProfile from "../POI/PoiProfile";
import axios from "axios";
import Scanner from "./Scanner";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ShowPoiFromScan from "./ShowPoiFromScan";
export default function Scan({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [qrCode, SetqrCode] = useState(false);
  const [isAllerted, setisAlerted] = useState(false);
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Scanner"
        component={Scanner}
        options={{ tabBarLabel: "Home!" }}
      />
      <HomeStack.Screen
        name="ShowPoiFromScan"
        component={ShowPoiFromScan}
        options={{ tabBarLabel: "Home!" }}
      />
    </HomeStack.Navigator>
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
});
