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
// Add api support
import { View, StyleSheet, Button, Text } from "react-native";
import React, { useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { nativeTheme } from "electron";

export default function Scan({ navigation, route }) {
  const { places, handleChange } = route.params;
  const [scanned, setScanned] = useState(false);
  const [qrCode, SetqrCode] = useState(false);
  const [isAllerted, setisAlerted] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    handleChange([
      ...places,
      { name: data, id: parseInt(Math.random() * 100) },
    ]);
    navigation.navigate("Attraction", {
      attraction: data,
    });
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
        title={"Exiter"}
        onPress={() => {
          navigation.navigate("Homepage");
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
