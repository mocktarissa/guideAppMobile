import { View, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { nativeTheme } from "electron";
import PoiProfile from "../POI/PoiProfile";
import axios from "axios";
import {
  Button,
  Card,
  Icon,
  List,
  StyleService,
  Text,
  useStyleSheet,
  Popover,
  Layout,
} from "@ui-kitten/components";
export default function Scanner({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [qrCode, SetqrCode] = useState(false);
  const [isAllerted, setisAlerted] = useState(false);
  const [result, setResult] = useState([
    {
      id: 1,
      created_at: "2020-11-13T10:58:32.000000Z",
      updated_at: "2020-11-13T10:58:32.000000Z",
      company_id: 2,
      name: "POI NAME",
      location: "POI Location",
      description: "POI details",
      url: "htpp://zoo.com/arslan",
      category_id: 2,
      picture1:
        "https://myguideapipictures.s3.eu-central-1.amazonaws.com/pictures/m9cNL9JEKUeRMevKlnO3hGgGifVZkci9BllwQUSR.jpeg",
      picture2:
        "https://myguideapipictures.s3.eu-central-1.amazonaws.com/pictures/WiLZgTGVQw4AeLqHIwz89E42GwlxO8fnXO0SSg8y.jpeg",
      picture3:
        "https://myguideapipictures.s3.eu-central-1.amazonaws.com/pictures/placeholder-image.png",
      picture4:
        "https://myguideapipictures.s3.eu-central-1.amazonaws.com/pictures/placeholder-image.png",
      picture5:
        "https://myguideapipictures.s3.eu-central-1.amazonaws.com/pictures/placeholder-image.png",
      picture6:
        "https://myguideapipictures.s3.eu-central-1.amazonaws.com/pictures/placeholder-image.png",
      category: {
        id: 2,
        created_at: "2020-11-13T10:41:48.000000Z",
        updated_at: "2020-11-13T10:41:48.000000Z",
        company_id: 2,
        name: "nonePtridX",
      },
    },
  ]);
  const fetchData = async (data) => {
    try {
      const resultTemp = await axios(
        `http://myguideapi.herokuapp.com/api/qrcode/${data}`
      );
      setScanned(false);
      setResult(resultTemp.data);
      setisAlerted(true);
    } catch (e) {
      alert("Not Found");
    }
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetchData(data);
  };

  const ScanPopup = ({ ...props }) => {};
  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <Popover
          backdropStyle={styles.backdrop}
          visible={isAllerted}
          anchor={() => <Layout></Layout>}
          onBackdropPress={() => setisAlerted(false)}
        >
          <Layout style={styles.content}>
            <Text category="s1">{result[0].name}</Text>
            <Button
              style={styles.buttonRescan}
              onPress={() => {
                navigation.navigate("ShowPoiFromScan", {
                  data: result,
                });
                setisAlerted(false);
              }}
            >
              SHOW
            </Button>
          </Layout>
        </Popover>
      </BarCodeScanner>
      {scanned && (
        <Button style={styles.buttonRescan} onPress={() => setScanned(false)}>
          Tap to Scan Again
        </Button>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center",
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
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: 500,
    backgroundColor: "white",
    borderRadius: 20,
    height: 500,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  imageFull: {
    width: 300,
    height: 500,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  contentIcon: {
    color: "white",
  },
  buttonRescan: {},
});
