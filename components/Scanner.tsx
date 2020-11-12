import { View, StyleSheet, Button, Text } from "react-native";
import React, { useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { nativeTheme } from "electron";
import PoiProfile from "./PoiProfile";
import axios from "axios";
export default function Scanner({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [qrCode, SetqrCode] = useState(false);
  const [isAllerted, setisAlerted] = useState(false);
  const fetchData = async (data) => {
    try {
      const result = await axios(
        `http://myguideapi.herokuapp.com/api/qrcode/${data}`
      );
      setScanned(false);
      navigation.navigate("ShowPoiFromScan", {
        data: result.data,
      });
    } catch (e) {
      alert("Not Found");
    }
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetchData(data);
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      {/* <Button
        title={"Exit"}
        onPress={() => {
          navigation.navigate("Homepage");
        }}
      /> */}
    </View>
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
});
