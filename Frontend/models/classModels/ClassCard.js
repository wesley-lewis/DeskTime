import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import React from "react";

import LottieView from "lottie-react-native";

import { useNavigation } from "@react-navigation/native";

export default function ClassCard({ data }) {
  const navigation = useNavigation();

  console.log(data.item);

  function pressHandler() {
    data.item.userEmail === undefined
      ? navigation.navigate("AttendanceJoin", data.item)
      : navigation.navigate("AttendanceCreate", data.item);
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View
        style={[
          styles.cardContainer,
          { backgroundColor: `hsl(50 ,100%, 50%)` },
        ]}
      >
        {/* <Image
          style={styles.imgCard}
          source={require("../../assets/attendance.jpg")}
        ></Image> */}

        <View style={{ flex: 1, marginBottom: 20 }}>
          <View style={{ marginLeft: 80 }}>
            <LottieView
              style={{ width: 200 }}
              autoPlay
              loop
              source={require("../../animations/subject.json")}
            />
          </View>
        </View>
        <View style={{ flex: 2, marginTop: 100 }}>
          <Text style={[styles.txtStyle, { marginLeft: 10 }]}>
            {data.item.class}
          </Text>
          <Text
            style={[styles.txtStyle, { textAlign: "center", marginTop: 18 }]}
          >
            {data.item.subject}
          </Text>
          <Text style={[styles.txtStyle, { marginLeft: 10, marginTop: 18 }]}>
            {data.item.createEmail === undefined
              ? data.item.code
              : data.item.createEmail}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const widthDevice = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "space-evenly",
    marginVertical: 18,
    width: widthDevice - 25,
    marginLeft: 10,
    height: 300,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    elevation: 9,
    shadowRadius: 5,
  },
  imgCard: {
    width: 368,
    height: 169,
    borderTopRightRadius: 20,
  },
  txtStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
