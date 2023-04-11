import { View, Text } from "react-native";
import React from "react";
import ImageCapture from "./ImageCapture";
import { StyleSheet } from "react-native";
import PressButton from "../../models/PressButton";
import axios from "axios";

export default function AttendanceCreate({ route }) {
  const data = route.params;
  console.log(data);
  
  async function getAttendance() {
    axios.get("http://192.168.164.49:8000/cnn/predict")
  }

  return (
    <>
      <View style={styles.firstView}>
        <PressButton onPress={getAttendance}>Get Attendance</PressButton>
      </View>
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
