import { View, Text } from "react-native";
import React from "react";
import ImageCapture from "./ImageCapture";
import { StyleSheet } from "react-native";

export default function AttendanceCreate({ route }) {
  const data = route.params;
  console.log(data);

  return (
    <>
      <View style={styles.firstView}></View>
      <View style={styles.secondView}>
        <ImageCapture />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  firstView: {
    flex: 1,
  },
  secondView: {
    backgroundColor: "white",
  },
});
