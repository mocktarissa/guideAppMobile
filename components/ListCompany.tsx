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

import { StyleSheet, Linking, Image, Platform } from "react-native";

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
  const callNumber = (phone) => {
    console.log("callNumber ----> ", phone);
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <Container style={styles.blue}>
      {/* <Header /> */}
      <Content>
        <List>
          {/*
          This is for categories 
           <ListItem itemDivider>
            <Text>B</Text>
          </ListItem>
           */}
          {places.map((item) => {
            return (
              <ListItem
                onPress={() =>
                  navigation.navigate("Company Details", {
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
        <Content></Content>
      </Content>
    </Container>
  );
}

// <Col style={{ height: "100%", width: "29%" }}>
//   <Button
//     onPress={() => {
//       // choosing the appropriate platform and sending it the appropriate location
//       const url = Platform.select({
//         ios: `maps:0,0?q=${item.address_line1}${item.address_line2}`,
//         android: `geo:0,0?q=${item.address_line1}${item.address_line2}`,
//       });

//       Linking.openURL(url);
//     }}
//     style={styles.btnRed}
//   >
//     <Text style={styles.BtnText}>Show in map</Text>
//   </Button>
//   <Button
//     style={{
//       borderRadius: 8,
//       height: 30,
//       width: "100%",
//       textAlign: "center",
//     }}
//     onPress={() => callNumber(item.phone_number)}
//   >
//     <Text>Call</Text>
//   </Button>
// </Col>;

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
