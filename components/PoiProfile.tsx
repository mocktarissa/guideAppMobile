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
  DeckSwiper,
} from "native-base";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";

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

  const [currentImage, setCurrentImage] = useState(0);

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
        <Container style={styles.imageMainContainer}>
          <ImageBackground
            source={{ uri: poi[`picture${currentImage + 1}`] }}
            style={styles.imageMain}
          >
            <Content style={styles.imageMainTop}></Content>
            <Text style={styles.title}>{poi.name}</Text>
            <Text note style={styles.category}>
              {category["name"].toUpperCase()}
            </Text>
          </ImageBackground>
        </Container>
        <Container
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginHorizontal: 20,
            backgroundColor: "#e8eded",
          }}
        >
          <Container style={styles.description}>
            <Text style={{ fontSize: 25 }}>Description:</Text>
            <Text>{poi.description}</Text>
          </Container>

          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: "#87838B" }}>
                <Icon name="thumbs-up" />
                <Text>1,926 likes</Text>
              </Button>
            </Left>
          </CardItem>
          <Container style={styles.imageComponent}>
            {/* Images */}
            {currentImage > 0 ? (
              <Button
                onPress={() => setCurrentImage(currentImage - 1)}
                transparent
                style={styles.imageLeft}
              >
                <Icon name="ios-arrow-dropleft" />
              </Button>
            ) : (
              <Button
                onPress={() => setCurrentImage(currentImage - 1)}
                transparent
                disabled
                style={styles.imageLeft}
              >
                <Icon name="ios-arrow-dropleft" />
              </Button>
            )}

            {currentImage + 1 > 5 ? (
              <Button
                onPress={() => setCurrentImage(currentImage + 1)}
                transparent
                disabled
                style={styles.imageRight}
              >
                <Icon name="ios-arrow-dropright" />
              </Button>
            ) : (
              <Button
                onPress={() => setCurrentImage(currentImage + 1)}
                transparent
                style={styles.imageRight}
              >
                <Icon name="ios-arrow-dropright" />
              </Button>
            )}
          </Container>
          <Text style={{ marginBottom: 5, marginHorizontal: 20 }}>
            Comments
          </Text>
        </Container>
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

  imageRight: {
    fontSize: 20,
  },

  imageMainContainer: {
    height: 320,
    position: "relative",
  },

  imageMain: {
    height: 300,

    overflow: "hidden",
    marginLeft: "2%",
    marginRight: "2%",
    marginVertical: "5%",
    borderRadius: 20,
    backgroundColor: "rgba(255,0,0,0.1)",
  },
  imageMainTop: {
    height: 50,
  },
  title: {
    textAlign: "left",
    marginHorizontal: 20,
    fontSize: 40,
    color: "white",
  },
  category: {
    color: "black",
    textAlign: "left",
    marginHorizontal: 20,
    fontSize: 15,
  },
  imageComponent: {
    height: 400,
  },
});

function Carousel() {
  return (
    <FlatList
      data={slideList}
      style={{ flex: 1 }}
      renderItem={({ item }) => {
        return <Slide data={item} />;
      }}
    />
  );
}
