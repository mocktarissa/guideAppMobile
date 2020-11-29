import React, { Component, useState, useEffect, useRef } from "react";

import { Container, Header, Content, ListItem, Right, Item } from "native-base";

import {
  Input,
  Layout,
  Icon,
  Button,
  Text,
  List,
  Card,
  Spinner,
  IconElement,
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
  ImageBackground,
  ImageStyle,
  Dimensions,
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
import { SafeAreaConsumer, SafeAreaView } from "react-native-safe-area-context";
// import { v4 as uuidv4 } from "uuid";
const ScreenHeight = Dimensions.get("window").height;
const notifbar = Dimensions.get("screen").height;
export default function Search({ navigation }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({ companies: [], pois: [] });
  const [company, setCompany] = useState([]);
  const [searching, setSearching] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [searchResult, setSearchResult] = useState("");

  const ClockIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name="clock-outline" />
  );

  const HeartIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name="heart-outline" />
  );

  const PlusIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name="plus" />
  );

  const ShareIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name="share-outline" />
  );
  function search() {
    setSearching(true);

    const fetchData = async () => {
      setResult({ companies: [], pois: [] });
      const searchResult = await axios(
        `http://myguideapi.herokuapp.com/api/search?query=${query}`
      );
      if (
        searchResult.data.companies.length + searchResult.data.pois.length ===
        0
      )
        setSearchResult("Not Found");
      else setResult(searchResult.data);
      console.log({
        length:
          searchResult.data.companies.length + searchResult.data.pois.length,
      });
    };

    fetchData();

    setSearching(false);
    setQuery("");
    console.log(result);
  }

  function cancel() {
    setQuery("");
  }
  const renderItemHeader = ({ company }) => (
    <ImageBackground style={styles.itemHeader} source={company.logo}>
      <View style={styles.itemHeaderDetails}>
        <Text category="h4" status="control">
          {company.name}
        </Text>
        <Text category="s1" status="control">
          {`${company.address1}h`}
        </Text>
      </View>
    </ImageBackground>
  );

  const renderItemFooter = () => (
    <View style={styles.itemFooter}>
      <View style={styles.itemReactionsContainer}>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          icon={ShareIcon}
        />
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          icon={HeartIcon}
        />
      </View>
      <Button style={styles.itemAddButton} appearance="ghost" icon={PlusIcon}>
        Add Training
      </Button>
    </View>
  );
  const RenderItem = ({ company }) => (
    <Card
      style={styles.item}
      header={() => renderItemHeader(company)}
      footer={renderItemFooter}
    >
      <Layout style={styles.itemStyxContainer} level="2">
        <Text style={styles.itemStyxText} category="h6">
          STYX
        </Text>
        <Button style={styles.itemStyxButton} size="tiny" icon={ClockIcon}>
          {`${company.name}`}
        </Button>
      </Layout>
      <Text style={styles.itemDescription} category="s1">
        {company.description}
      </Text>
    </Card>
  );
  return (
    <View style={{ flex: 1, height: ScreenHeight }}>
      <Input
        accessoryRight={() => (
          <Icon
            style={{
              tintColor: "#000000",
              resizeMode: "contain",
              height: 24,
              width: 20,
            }}
            name="close-outline"
            onPress={() => cancel()}
          ></Icon>
        )}
        accessoryLeft={() => (
          <Icon
            style={{
              tintColor: "#000000",
              resizeMode: "contain",
              height: 24,
              width: 24,
            }}
            name="search"
          ></Icon>
        )}
        style={styles.input}
        placeholder="Search Item"
        onChangeText={(text) => setQuery(text)}
        value={query}
        onEndEditing={() => search()}
      />
      {searching ? (
        <Spinner size="giant"></Spinner>
      ) : (
        <Layout style={styles.container}>
          <ScrollView>
            {/* <Layout style={styles.inputLAyout}></Layout> */}

            {/* <Spinner size="giant" /> */}

            <List
              style={styles.list}
              contentContainerStyle={styles.listContent}
              data={[...result.companies, ...result.pois]}
              renderItem={({ item, index }) => (
                <Card
                  key={index}
                  style={styles.item}
                  header={() => (
                    <ImageBackground
                      style={styles.itemHeader}
                      source={{ uri: item.logo || item.picture1 }}
                    >
                      <View
                        style={[
                          StyleSheet.absoluteFill,
                          styles.itemHeaderDetails,
                        ]}
                      >
                        <Text category="h4" status="control">
                          {item.name}
                        </Text>
                        <Text category="s1" status="control">
                          {item.city}
                        </Text>
                      </View>
                    </ImageBackground>
                  )}
                  onPress={() => {
                    item.hasOwnProperty("picture1")
                      ? navigation.navigate("Poi Profile", {
                          poiId: item.id,
                          companyId: item.company_id,
                        })
                      : navigation.navigate("Company Details", {
                          companyId: item.id,
                        });
                  }}
                >
                  <Layout style={styles.itemStyxContainer} level="2">
                    <Text style={styles.itemStyxText} category="h6">
                      {item.name}
                    </Text>
                    <Button
                      style={styles.itemStyxButton}
                      size="tiny"
                      icon={ClockIcon}
                    >
                      {item.location || item.city}
                    </Button>
                  </Layout>
                  <Text style={styles.itemDescription} category="s1">
                    {item.description && item.description.slice(0, 125)} ...
                  </Text>
                </Card>
              )}
              ListEmptyComponent={() => (
                <View style={styles.container}>
                  <Spinner size="giant"></Spinner>
                  <Text>{searchResult}</Text>
                </View>
              )}
            />
          </ScrollView>
        </Layout>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 40,
    paddingHorizontal: 5,    
  },
  container: {
    flex: 1,
    flexDirection: "column",
    height: ScreenHeight,
  },

  layout: {},
  results: {
    flex: 1,
    // marginTop: 5,
    marginLeft: 2,
    flexDirection: "column",
  },
  list: {
    flex: 1,
    marginTop: 0,
    height: "100%",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: "100%",
  },
  item: {
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: "rgb(245,255,250)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 10,
  },
  itemHeader: {
    minHeight: 220,
    padding: 24,
  },
  itemHeaderDetails: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    padding: 4,
  },
  itemStyxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    marginHorizontal: -8,
  },
  itemStyxText: {
    marginHorizontal: 16,
    marginVertical: 14,
  },
  itemStyxButton: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 24,
  },
  itemDescription: {
    marginHorizontal: -8,
    marginTop: 16,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemReactionsContainer: {
    flexDirection: "row",
  },
  itemAddButton: {
    flexDirection: "row-reverse",
    paddingHorizontal: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
