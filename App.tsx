import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Alert,
  View,
  TouchableOpacity,
  Button,
} from "react-native";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BarCodeScanner } from "expo-barcode-scanner";

import Homepage from "./components/Homepage";
import Search from "./components/Search/Search";
import Scan from "./components/Scan/Scan";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);

  const [gezzi, setGezzi] = useState([{}]);
  const [qrCode, SetqrCode] = useState(false);
  const [isAllerted, setisAlerted] = useState(false);
  const [isFirstOpening, SetIsFirstOpening] = useState(true);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <></>;
  }
  if (hasPermission === false) {
    return <></>;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home Page"
            component={Homepage}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <Icon name="home"></Icon>;
              },
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <Icon name="ios-search"></Icon>;
              },
            }}
          />
          <Tab.Screen
            name="Scan"
            component={Scan}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <Icon name="camera"></Icon>;
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
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
