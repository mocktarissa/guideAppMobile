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
  Item,
  Input,
  Spinner,
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
import { FlatList } from "react-native-gesture-handler";
export default function Search({ navigation }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({ name: "Search" });
  const [company, setCompany] = useState([]);
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://myguideapi.herokuapp.com/api/company/"
      );
      setCompany(result.data);
    };
    fetchData();
  }, []);
  function search() {
    setSearching(true);
    let isfound = company.find((e) => 
    e.name === query
    
    );
    if (isfound) {
      setResult(isfound);
    } else setResult({ name: "Not Found" });
    setSearching(false);
  }
  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onChangeText={(text) => setQuery(text.toUpperCase())}
          />
          <Icon name="ios-people" />
        </Item>
      </Header>
      {searching ? <Spinner /> : <></>}

      <Button onPress={() => search()}>
        <Text>Search</Text>
      </Button>
      <Container>
        <Text style={{ padding: 10, fontSize: 42 }}>
          {result.name ? (
            <Item>
              <Text style={{ textAlign: "center" }}>{result.name}</Text>
            </Item>
          ) : (
            ""
          )}
        </Text>
      </Container>
    </Container>
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
