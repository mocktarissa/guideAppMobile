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
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import { StyleSheet, Linking } from "react-native";

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
  return (
    <Container>
      {/* <Header /> */}
      <Content>
        <List>
          {places.map((item) => {
            return (
              <ListItem>
                <Grid>
                  <Col style={{ height: 20, width: 20 }}>
                    <Icon
                      name="home"
                      style={{
                        fontSize: 20,
                        height: "100%",
                        width: "100%",
                      }}
                    ></Icon>
                  </Col>
                  <Col style={{ height: 20, width: "60%" }}>
                    <Text
                      onPress={() =>
                        navigation.navigate("CompanyDetails", {
                          companyId: item.id,
                        })
                      }
                    >
                      {item.name}
                    </Text>
                  </Col>
                  <Col style={{ height: 20, width: "10%" }}>
                    <Icon
                      name="see"
                      style={{
                        fontSize: 20,
                        height: "100%",
                        width: "100%",
                      }}
                    ></Icon>
                  </Col>
                  <Col>
                    <Button
                      onPress={() =>
                        Linking.openURL("google.navigation:q=100+101")
                      }
                    >
                      <Text>Show in map</Text>
                    </Button>
                  </Col>
                </Grid>
              </ListItem>
            );
          })}
        </List>
        <Content>
          <Button
            onPress={() =>
              navigation.navigate("Scan", {
                places: places,
                handleChange: handleChange,
              })
            }
          >
            <Text>Scan QR</Text>
          </Button>
        </Content>
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
});
