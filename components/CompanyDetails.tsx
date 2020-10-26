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
  return (
    <Container>
      <Content>
        {pois.map((item) => {
          return (
            <Card key={item.id}>
              <CardItem>
                <Text
                  style={styles.item}
                  onPress={() =>
                    navigation.navigate("PoiProfile", {
                      poiId: item.id,
                      companyId: companyId,
                    })
                  }
                >
                  {item.name}
                </Text>
                <Text note> {item.location} </Text>
              </CardItem>
              <CardItem cardBody>
                <Left>
                  <Text
                    style={styles.item}
                    onPress={() =>
                      navigation.navigate("PoiProfile", {
                        poiId: item.id,
                        companyId: companyId,
                      })
                    }
                  >
                    {item.category.name}
                  </Text>
                </Left>
                <Button
                  onPress={() => Linking.openURL("google.navigation:q=100+101")}
                >
                  <Text>Go</Text>
                </Button>
              </CardItem>
            </Card>
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
