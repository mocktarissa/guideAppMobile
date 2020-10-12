// qrCode ? <View
//   style={{
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//   }}>
//   <BarCodeScanner
//     onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//     style={StyleSheet.absoluteFillObject}
//   />

import { View, StyleSheet, Button, Text } from "react-native";
import React, { useState } from "react";
//
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Scan() {
  const [scanned, setScanned] = useState(false);
  const [qrCode, SetqrCode] = useState(false);
  const [isAllerted, setisAlerted] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
      <Button
        title={"Exit"}
        onPress={() => {
          SetqrCode(false);
          setScanned(false);
        }}
      />
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
