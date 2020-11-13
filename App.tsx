import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Alert,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import Homepage from "./components/Homepage";
import Welcome from "./components/Welcome";
import Search from "./components/Search";
import Scan from "./components/Scan";
import Attraction from "./components/Attraction";
import CompanyDetails from "./components/CompanyDetails";
import PoiProfile from "./components/PoiProfile";
import BottomNav from "./components/FooterTab";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
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
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name="Home" component={Homepage} />
    //     <Stack.Screen name="Details" component={DetailsScreen} />
    //   </Stack.Navigator>
    // // </NavigationContainer>
    // <View style={styles.container}>

    // </View>

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
  );
}
// <Stack.Navigator>
//   {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
//   <Stack.Screen name="Homepage" component={Homepage} />
//   <Stack.Screen name="Scan" component={Scan} />
//   <Stack.Screen name="Attraction" component={Attraction} />
//   <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
//   <Stack.Screen name="PoiProfile" component={PoiProfile} />
// </Stack.Navigator>
// <Tab.Navigator>
//   {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
//   <Tab.Screen name="Homepage" component={Homepage} />
//   <Tab.Screen name="Scan" component={Scan} />
//   <Tab.Screen name="Attraction" component={Attraction} />
//   <Tab.Screen name="CompanyDetails" component={CompanyDetails} />
//   <Tab.Screen name="PoiProfile" component={PoiProfile} />
// </Tab.Navigator>;
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
