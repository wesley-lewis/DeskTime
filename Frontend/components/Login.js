import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import PressButton from "../models/PressButton";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useEffect } from "react";
import { fetchUserData, inputLoginData } from "../util/http";
import { Alert } from "react-native";
import LottieView from "lottie-react-native";
import { date } from "../util/date";
import ForgotPassModal from "../models/ForgotPassModal";
import { Base64 } from "js-base64";

export default function Login({ navigation }) {
  // fetching data from firebase database user collections
  const [fetchedUserData, setFetchedUserData] = useState([]);

  useEffect(() => {
    // setting fetchedUserData
    async function getUserData() {
      const users = await fetchUserData();
      setFetchedUserData(users);
    }
    getUserData();
  }, []);

  // input data from form input
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  // trigger function
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return { ...curInputValues, [inputIdentifier]: enteredValue };
    });
  }

  // reset form values after logging in
  function resetChangeHandler() {
    inputValues.email = "";
    inputValues.password = "";
  }

  // verification and validation
  function submitHandler() {
    const formData = {
      email: inputValues.email,
      password: inputValues.password,
    };

    const loginData = {
      loggedEmail: inputValues.email,
      dateLogged: date(),
    };

    let result = fetchedUserData.find((indData) => {
      return indData.email === formData.email &&
        Base64.decode(indData.password) === formData.password
        ? true
        : false;
    });
    // console.log(result);
    if (!result) {
      Alert.alert(
        "Login Unsuccessfull",
        "Incorrect Data Filled!! Or make sure you have registered or you must not have been logged out !!"
      );
    } else if (result) {
      console.log(formData);
      inputLoginData(loginData);
      resetChangeHandler();
      Alert.alert("Login Successfull !!!", "You can create or join the class");
      navigation.navigate("Class", formData);
    }
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <LottieView
          autoPlay
          loop
          source={require("../animations/login.json")}
        />
      </View>
      <View style={styles.container}>
        {/* <Image style={styles.image} source={require("../assets/login.jpg")} /> */}
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username."
            placeholderTextColor="#003f5c"
            onChangeText={inputChangeHandler.bind(this, "email")}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={inputChangeHandler.bind(this, "password")}
          />
        </View>
        <View>
          <PressButton onPress={submitHandler}>LOGIN</PressButton>
          <Text>
            <ForgotPassModal>Forgot Password?</ForgotPassModal>
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#705DE0",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  image: {
    marginBottom: 40,
    width: 395,
    height: 380,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    textAlign: "center",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});
