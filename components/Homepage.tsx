import React, { Component, useEffect, useState } from "react";

import { Text, View, StyleSheet, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Axios from "axios";
export default function Homepage({ navigation }) {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Addidas",
      address: "Addidas street",
      phone_number: "+3540430022",
      website: "https://www.addidas.com/",
      longlatt: "",
    },
    {
      id: 2,
      name: "istanbul university",
      address: "cakmakli mah masuk sok bin no 4",
      phone_number: "05537913079",
      website: "https://www.mocktarissa.com\\",
      longlatt: "",
    },
    {
      id: 3,
      name: "istanbul university",
      address: "cakmakli mah masuk sok bin no 4",
      phone_number: "3334455",
      website: "https://movs4u.tv",
      longlatt: "",
    },
    {
      id: 4,
      name: "istanbul university",
      address: "cakmakli mah masuk sok bin no 4",
      phone_number: "055379130793",
      website: "https://www.dmocktarissa.com\\",
      longlatt: "",
    },
    {
      id: 7,
      name: "istanbul university",
      address: "cakmakli mah masuk sok bin no 4",
      phone_number: "256521725712",
      website: "https://jdsds.cid",
      longlatt: "",
    },
  ]);

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
  return (
    <View style={styles.container}>
      <Text>Hello from the Home Page </Text>
      {companies.map((p) => (
        <Text key={p.id}>{p.name}</Text>
      ))}
      <View style={styles.bottom}>
        <Button
          title="Scan QR"
          onPress={() =>
            navigation.navigate("Scan", {
              companies: companies,
              handleChange: handleChange,
            })
          }
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
