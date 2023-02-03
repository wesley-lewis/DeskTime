import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import * as ImagePicker from "expo-image-picker";
import { launchCameraAsync } from "expo-image-picker";

import PressButton from "../../models/PressButton";
import { useState } from "react";

export default function ImageCapture() {
  const [image, setImage] = useState(null); // setting an image
  const [camera, setCamera] = useState(null); // setting an image

  async function getImageCamera() {
    const camera = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(camera);

    if (!camera.canceled) {
      setCamera(camera.assets[0].uri);
    }
  }

  async function takeImageHandler() {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(image);

    if (!image.canceled) {
      setImage(image.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      <PressButton onPress={takeImageHandler}>Image</PressButton>
      {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
      <PressButton onPress={getImageCamera}>Camera</PressButton>
      {camera && <Image source={{ uri: camera }} style={styles.imageStyle} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageStyle: {
    width: 395,
    height: 300,
    resizeMode: "cover",
    alignItems: "center",
  },
});
