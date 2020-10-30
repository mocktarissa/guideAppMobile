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
  Spinner,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import { StyleSheet, Linking, Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNav from "./FooterTab";
import axios from "axios";
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
    setPlaces(newValue);
  }
  const Stack = createStackNavigator();
  return isLoading ? (
    <Spinner />
  ) : (
    <Container style={styles.blue}>
      {/* <Header /> */}
      <Content>
        <List>
          <ListItem itemDivider>
            <Text>B</Text>
          </ListItem>
          {places.map((item) => {
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
                    <Image
                      style={styles.Image}
                      source={require("./placeholder.png")}
                    />
                  </Col>
                  <Col style={{ height: 20, width: "50%" }}>
                    <Text style={styles.TextCenter}>{item.name}</Text>
                  </Col>
                  <Col></Col>
                  <Col style={{ height: "100%", width: "29%" }}>
                    <Button
                      onPress={() =>
                        Linking.openURL("google.navigation:q=100+101")
                      }
                      style={styles.btnRed}
                    >
                      <Text style={styles.BtnText}>Show in map</Text>
                    </Button>
                  </Col>
                </Grid>
              </ListItem>
            );
          })}
        </List>
        <Content></Content>
      </Content>
    </Container>
  );
}

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
