import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import AppLoading from "expo-app-loading";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

export default function ClassCard({ data }) {
  const navigation = useNavigation();

  console.log(data.item);

  function pressHandler() {
    data.item.userEmail === undefined
      ? navigation.navigate("AttendanceJoin", data.item)
      : navigation.navigate("AttendanceCreate", data.item);
  }

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
          <Text style={[styles.txtStyle, { marginLeft: 10 }]}>
            {data.item.class}
          </Text>
          <Text style={[styles.txtStyle, { textAlign: "center" }]}>
            {data.item.subject}
          </Text>
          <Text style={[styles.txtStyle, { marginLeft: 10 }]}>
            {data.item.createEmail === undefined
              ? data.item.code
              : data.item.createEmail}
          </Text>
        </View>
      </Pressable>
    );
  }
}

const widthDevice = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "space-evenly",
    marginVertical: 18,
    width: widthDevice - 25,
    marginLeft: 10,
    height: 250,
    borderBottomEndRadius: 20,
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
  txtStyle: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Inter_900Black",
    // fontFamily: "Pixel",
  },
});
