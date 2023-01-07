import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

export default function ClassCard({ data }) {
  // console.log(data.item);

  const navigation = useNavigation();

  const optData =
    data.item.userEmail === undefined ? data.item.createEmail : data.item.code;

  function pressHandler() {
    navigation.navigate("Attendance", data.item);
    console.log("pressed");
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.cardContainer}>
        <Image
          style={styles.imageStyle}
          source={require("../../assets/cardImg.jpg")}
        />
        <View style={styles.infoStyle}>
          <View style={styles.displayView}>
            <Text style={styles.title}>{data.item.class}</Text>
          </View>
          <View style={styles.displayView}>
            <Text style={styles.title}>{data.item.subject}</Text>
          </View>
          <View style={styles.displayView}>
            <Text style={styles.body}>{optData}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const widthDevice = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  cardContainer: {
    marginVertical: 18,
    width: widthDevice - 25,
    marginLeft: 10,
    backgroundColor: "#096db0",
    height: 250,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    elevation: 9,
    shadowRadius: 5,
  },
  imageStyle: {
    height: 130,
    width: widthDevice - 25,
    // borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    opacity: 0.75,
  },
  title: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    color: "#2f0491",
  },
  body: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "300",
    textAlign: "center",
    color: "#2f0491",
  },
  displayView: {
    backgroundColor: "#e4d9fd",
    marginVertical: 5,
    borderRadius: 5,
    width: "90%",
    marginLeft: 15,
    height: "18%",
  },
});
