import React, { Component, useState, useEffect, useRef } from "react";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Right,
  Item,
  Spinner,
} from "native-base";

import {
  Input,
  Layout,
  Icon,
  Button,
  Text,
  IconRegistry,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Col, Row, Grid } from "react-native-easy-grid";

import {
  StyleSheet,
  Linking,
  Image,
  View,
  ScrollView,
  TextInput,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNav from "../FooterTab";
import axios from "axios";
import Loading from "../Loading";
import ListCompany from "../Company/ListCompany";
import CompanyDetails from "../Company/CompanyDetails";
import PoiProfile from "../POI/PoiProfile";
import ShowPoiFromScan from "../Scan/ShowPoiFromScan";
import { FlatList } from "react-native-gesture-handler";
export default function Search({ navigation }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({ companies: [], pois: [] });
  const [company, setCompany] = useState([]);
  const [searching, setSearching] = useState(false);
  const [isFound, setIsFound] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(
  //       "http://myguideapi.herokuapp.com/api/search/"
  //     );
  //     setCompany(result.data);
  //   };
  //   fetchData();
  // }, []);

  function search() {
    setSearching(true);
    const fetchData = async () => {
      const searchResult = await axios(
        `http://myguideapi.herokuapp.com/api/search?query=${query}`
      );
      setResult(searchResult.data);
    };
    fetchData();

    setSearching(false);
    setQuery("");
    console.log(result);
  }

  function cancel() {
    setQuery("");
  }

  return (
    <Layout style={styles.container}>
      <Layout style={styles.inputLAyout}>
        <Input
          accessoryRight={() => (
            <Icon style={styles.input} name="close-outline"></Icon>
          )}
          accessoryLeft={() => <Icon style={styles.input} name="search"></Icon>}
          captionIcon={() => <Icon style={styles.input} name="search"></Icon>}
          style={styles.input}
          placeholder="Search Item"
          onChangeText={(text) => setQuery(text)}
          value={query}
          onEndEditing={() => search()}
        />

        {searching ? (
          <Spinner />
        ) : (
          <Layout style={styles.results}>
            {result.companies.map((item) => {
              return <Text>{item.name}</Text>;
            })}
          </Layout>
        )}
      </Layout>
    </Layout>
  );
}

{
  /* <Col style={{ height: "100%", width: "29%" }}>
  <Button
    onPress={() => Linking.openURL("google.navigation:q=100+101")}
    style={styles.btnRed}
  >
    <Text style={styles.BtnText}>Show in map</Text>
  </Button>
  <Button
    style={{
      borderRadius: 8,
      height: 30,
      width: "100%",
      textAlign: "center",
    }}
    onPress={() => callNumber(item.phone_number)}
  >
    <Text>Call</Text>
  </Button>
</Col>; */
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
  input: {
    height: 10,
    marginHorizontal: 4,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  inputLAyout: {
    marginTop: 40,
    flex: 1,
    alignItems: "center",
  },
  layout: {
    marginTop: 40,
  },
  results: {
    flex: 1,
    marginTop: 100,
    marginLeft: 2,
  },
});
