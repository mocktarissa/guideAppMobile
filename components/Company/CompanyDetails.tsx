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

import {
  View,
  StyleSheet,
  FlatList,
  Linking,
  Alert,
  Platform,
  TouchableHighlight,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import Loading from "../Loading";
export default function CompanyDetails({ navigation, route }) {
  const { companyId } = route.params;
  const [pois, setPois] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://myguideapi.herokuapp.com/api/company/${companyId}/pois`
      );
      // var temp = result.data.reduce(
      //   function (r, item) {
      //     var current = r.hash[item.category.name];

      //     if (!current) {
      //       current = r.hash[item.category.name] = {
      //         category: item.category.name,
      //         items: [],
      //       };

      //       r.arr.push(current);
      //     }

      //     current.items.push({
      //       id: item.id,
      //       company_id
      //       content: item.content,
      //     });

      //     return r;
      //   },
      //   { hash: {}, arr: [] }
      // ).arr;
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
    <Container style={{}}>
      <Content
        style={{
          width: "100%",
        }}
      >
        {pois.map((item) => {
          return (
            <TouchableHighlight
              onPress={() =>
                navigation.navigate("Poi Profile", {
                  poiId: item.id,
                  companyId: companyId,
                })
              }
            >
              <Container style={styles.card}>
                <Content>
                  <Image
                    style={styles.image}
                    source={{ uri: item.picture1 }}
                    onPress={() =>
                      navigation.navigate("Poi Profile", {
                        poiId: item.id,
                        companyId: companyId,
                      })
                    }
                  ></Image>
                  <Content style={styles.cardBody}>
                    <Text style={styles.title}>{item.name.toUpperCase()}</Text>
                    <Text note style={styles.location}>
                      {" "}
                      {item.location}{" "}
                    </Text>
                    <Text style={styles.description}>
                      {item.description.slice(0, 125)} ...{" "}
                    </Text>
                    {/* <Container style={styles.buttonWrapper}>
                      <Button
                        style={styles.buttonReadMore}
                        onPress={() =>
                          navigation.navigate("Poi Profile", {
                            poiId: item.id,
                            companyId: companyId,
                          })
                        }
                      >
                        <Text>Read more</Text>
                      </Button>
                    </Container> */}
                  </Content>
                </Content>
              </Container>
            </TouchableHighlight>
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

  title: {
    fontSize: 25,
    lineHeight: 30,
    paddingBottom: 5,
  },

  description: {
    fontSize: 15,
    color: "#727272",
  },
  image: {
    backgroundColor: "grey",
    width: "100%",
    height: 170,
  },
  card: {
    overflow: "hidden",
    borderRadius: 20,
    height: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 10,
    width: "90%",
    marginLeft: "5%",
    marginBottom: "2%",
    marginTop: "2%",
  },
  cardBody: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  buttonWrapper: {
    flex: 1,

    alignItems: "center",
  },

  buttonReadMore: {
    marginTop: 10,
    borderRadius: 50,
    backgroundColor: "#4a89dc",
    fontWeight: "900",
    width: 200,
    textAlign: "center",
  },
});
