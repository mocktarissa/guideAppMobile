import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Spinner,
  Grid,
  Col,
  Row,
} from "native-base";
import { Image } from "react-native";

import { View, StyleSheet, FlatList, Linking } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import Loading from "./Loading";
export default function CompanyDetails({ navigation, route }) {
  const { companyId } = route.params;
  const [pois, setPois] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://myguideapi.herokuapp.com/api/company/${companyId}/pois`
      );
      setPois(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  {
    /* <Container>
  <Header />
  <Content>
    <Card>
      <CardItem>
        <Icon active name="logo-googleplus" />
        <Text>Google Plus</Text>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </CardItem>
    </Card>
  </Content>
</Container>; */
  }
  return isLoading ? (
    <Spinner />
  ) : (
    <Container>
      <Content>
        {pois.map((item) => {
          return (
            <Content>
              <Card key={item.id} style={{ height: 150 }}>
                <Grid style={styles.selfContained}>
                  <Col style={{ height: "100%", width: "30%" }}>
                    <CardItem style={styles.image}></CardItem>
                  </Col>
                  <Col
                    style={{ maxHeight: "100%", width: "70%" }}
                    onPress={() =>
                      navigation.navigate("PoiProfile", {
                        poiId: item.id,
                        companyId: companyId,
                      })
                    }
                  >
                    <CardItem>
                      <Text style={styles.item}>{item.name}</Text>
                    </CardItem>
                    <CardItem>
                      <Text note> {item.location} </Text>
                    </CardItem>
                    <CardItem cardBody style={styles.mapBtnContainer}>
                      <Button
                        transparent
                        style={styles.mapBtn}
                        onPress={() =>
                          Linking.openURL("google.navigation:q=100+101")
                        }
                      >
                        <Text>Show in Map</Text>
                      </Button>
                    </CardItem>
                  </Col>
                </Grid>
              </Card>
            </Content>
          );
        })}
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
    height: 50,
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
    fontSize: 20,
    // height: 20,
  },
  image: {
    backgroundColor: "grey",
    width: "100%",
    height: "100%",
  },
  mapBtnContainer: {
    width: "2000%",
    // marginLeft: "10%",
  },
  mapBtn: {
    width: "100%",
    height: "100%",
  },
  selfContained: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
