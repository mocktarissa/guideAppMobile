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

import { StyleSheet, Linking, Image } from "react-native";

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
  const [result, setResult] = useState([]);
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
    let isfound = company.find((e) => e.name === query);
    if (isfound) {
      setResult([isfound]);
    } else setResult([{ name: "Not Found" }]);
    setSearching(false);
  }
  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onChangeText={(text) => setQuery(text)}
            onEndEditing={() => search()}
          />
          <Button onPress={() => search()} transparent>
            <Icon name="ios-search" />
          </Button>
        </Item>
      </Header>
      {searching ? <Spinner /> : <></>}

      <Container>
        <List>
          {result.map((item) => {
            return (
              <ListItem
                onPress={() =>
                  navigation.navigate("CompanyDetails", {
                    companyId: item.id,
                  })
                }
              >
                <Grid style={styles.listItem}>
                  <Col style={styles.ImgaeWrapper}>
                    {item.logo == "placeholder.jpg" ? (
                      <Image
                        style={styles.Image}
                        source={require("./placeholder.png")}
                      />
                    ) : (
                      <Image
                        style={styles.Image}
                        source={{
                          uri: item.logo,
                        }}
                      />
                    )}
                  </Col>
                  <Col style={{ height: 20, width: "50%" }}>
                    <Text style={styles.TextCenter}>{item.name}</Text>
                  </Col>
                  <Col></Col>
                </Grid>
              </ListItem>
            );
          })}
        </List>
      </Container>
    </Container>
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
  btnRed: {
    backgroundColor: "red",
    borderRadius: 8,
    height: 30,
    width: "100%",
  },
  listItem: {
    flex: 1,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  listItemNotImage: {},

  BtnText: {
    fontSize: 8,
    textAlign: "center",
    width: "100%",
    height: "100%",
  },
  TextCenter: {
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  Image: {
    height: "100%",
    width: "100%",
  },
  ImgaeWrapper: {
    backgroundColor: "grey",
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  blue: {
    backgroundColor: "white",
  },
});
