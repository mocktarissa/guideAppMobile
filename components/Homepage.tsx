import React, { Component, useState, useEffect } from "react";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Button,
  Text,
  Icon,
  Right,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import { StyleSheet, Linking } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNav from "./FooterTab";
import axios from "axios";
import Loading from "./Loading";
import ListCompany from "./ListCompany";
import CompanyDetails from "./CompanyDetails";
import PoiProfile from "./PoiProfile";
import ShowPoiFromScan from "./ShowPoiFromScan";
export default function Homepage({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://myguideapi.herokuapp.com/api/company/"
      );
      setPlaces(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  function handleChange(newValue) {
    setCompanies(newValue);
  }

  // async function fetchItem() {
  //   let res = JSON.parse(
  //     (await Axios.get("http://192.168.1.13:8000/api/company/")).data
  //   );
  //   setCompanies(res);
  //   alert(res.length);
  // }
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Attraction List"
        component={ListCompany}
        options={{ tabBarLabel: "Home!" }}
      />
      <HomeStack.Screen
        name="Company Details"
        component={CompanyDetails}
        options={{ tabBarLabel: "Home!" }}
      />

      <HomeStack.Screen
        name="Poi Profile"
        component={PoiProfile}
        options={{ tabBarLabel: "Home!" }}
      />
      <HomeStack.Screen
        name="Scanned Item"
        component={ShowPoiFromScan}
        options={{ tabBarLabel: "Home!" }}
      />
    </HomeStack.Navigator>
  );
}

// <View style={styles.container}>
//   <Text>{places.length}</Text>
//   {isLoading ? <Text> Loading</Text> : <Text>Loaded</Text>}
//   <FlatList
//     data={places}
//     renderItem={({ item }) => (
//       <Text
//         style={styles.item}
//         onPress={() =>
//           navigation.navigate("CompanyDetails", {
//             companyId: item.id,
//           })
//         }
//       >
//         {item.name}
//       </Text>
//     )}
//   />

//   <View style={styles.bottom}>
//     <Button
//       title="Scan QR"
//       onPress={() =>
//         navigation.navigate("Scan", {
//           places: places,
//           handleChange: handleChange,
//         })
//       }
//     ></Button>
//   </View>
// </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listRow: {
    position: "absolute",
    height: 20,
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
