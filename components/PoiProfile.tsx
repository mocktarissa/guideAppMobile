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
  Spinner,
  Grid,
  List,
} from "native-base";
import { View, StyleSheet, ScrollView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import Loading from "./Loading";
export default function PoiProfile({ navigation, route }) {
  const { poiId } = route.params;
  const { companyId } = route.params;
  const [poi, setPoi] = useState({});
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [imageSize, setImageSize] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://myguideapi.herokuapp.com/api/company/${companyId}/pois/${poiId}`
      );
      setPoi(result.data[0]);
      setCategory(result.data[0].category);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Container>
      <Content>
        <Card>
          <CardItem
            style={imageSize ? styles.image : styles.imageSmall}
          ></CardItem>
          <CardItem onPress={() => setImageSize(false)}>
            <CardItem style={styles.logo}></CardItem>
            <Left>
              <Body>
                <Text>{poi.name}</Text>
                <Text note>{category["name"]}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body style={styles.description}>
              <Text>{poi.description}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: "#87838B" }}>
                <Icon name="thumbs-up" />
                <Text>1,926 likes</Text>
              </Button>
            </Left>
          </CardItem>
          <Text style={{ marginBottom: 5 }}>Comments</Text>
          <ScrollView style={styles.comments}>
            {/* Map to all the users comments on this POI */}

            <CardItem>
              <CardItem style={styles.logo}></CardItem>
              <Left>
                <Body>
                  <Grid>
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                  </Grid>
                  <Text>Very Good</Text>
                  <Text note>The Place is Clean and spacious</Text>
                  <Grid>
                    <Button transparent>
                      <Text>
                        <Icon name="thumbs-up" />
                        Useful
                      </Text>
                    </Button>
                    <Button transparent>
                      <Text>
                        <Icon name="thumbs-down" />
                        Not Useful
                      </Text>
                    </Button>
                  </Grid>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <CardItem style={styles.logo}></CardItem>
              <Left>
                <Body>
                  <Grid>
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                  </Grid>
                  <Text>Very Good</Text>
                  <Text note>The Place is Clean and spacious</Text>
                  <Grid>
                    <Icon name="thumbs-up" />
                    <Text>Useful</Text>
                    <Icon name="thumbs-down" />
                    <Text>Not Useful</Text>
                  </Grid>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <CardItem style={styles.logo}></CardItem>
              <Left>
                <Body>
                  <Grid>
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                  </Grid>
                  <Text>Could be better</Text>
                  <Text note>Nice place for kids</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <CardItem style={styles.logo}></CardItem>
              <Left>
                <Body>
                  <Grid>
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                  </Grid>
                  <Text>Could be better</Text>
                  <Text note>Nice place for kids</Text>
                  <Grid>
                    <Icon name="thumbs-up" />
                    <Text>Useful</Text>
                    <Icon name="thumbs-down" />
                    <Text>Not Useful</Text>
                  </Grid>
                </Body>
              </Left>
            </CardItem>

            {/* End of comments */}
          </ScrollView>
        </Card>
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
  image: {
    backgroundColor: "grey",
    height: "30%",
    margin: 2,
    width: "100%",
  },

  imageSmall: {
    backgroundColor: "grey",
    height: "40%",
    margin: 2,
    width: "100%",
  },

  description: {},
  logo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "grey",
  },
  commentTitle: {},
  comments: { marginTop: 6, marginBottom: 40, overflow: "scroll" },
});
