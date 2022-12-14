import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, Alert } from "react-native";
import PressButton from "../models/PressButton";
import { inputUserData } from "../util/http";
import { fetchUserData } from "../util/http";

export default function Register({ navigation }) {
  // to save array of obj of firebase user collection
  const [fetchedUserData, setFetchedUserData] = useState([]);

  // for confirming registrations if not repeated
  const [confirmRegister, setConfirmRegister] = useState(false);

  useEffect(() => {
    // calling func and saving data in fetchedUserData
    async function getUserData() {
      const users = await fetchUserData();
      setFetchedUserData(users);
    }
    getUserData();
  }, []);

  // taking input from text input and setting state
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  // trigger func after submitting
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return { ...curInputValues, [inputIdentifier]: enteredValue };
    });
  }

  // verification of data
  function submitHandler() {
    const formData = {
      email: inputValues.email,
      password: inputValues.password,
      cpassword: inputValues.cpassword,
    };

    // checking if user exists in database
    let result = fetchedUserData.find(function (obj) {
      return obj.email === formData.email;
    });

    if (result === undefined) {
      setConfirmRegister(true);
    } else {
      setConfirmRegister(false);
    }

    // password matching
    if (inputValues.password !== inputValues.cpassword) {
      Alert.alert("Could not register", "Passwords did not match");
    } else if (confirmRegister === false) {
      Alert.alert(
        "Could not register",
        "User is already registered with same id"
      );
    } else if (
      inputValues.password === inputValues.cpassword &&
      inputValues.password !== "" &&
      confirmRegister === true
    ) {
      inputUserData(formData);
      Alert.alert("Registration Successfull !!!", "Make sure to login");
      navigation.navigate("Login");
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/login.jpg")} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={inputChangeHandler.bind(this, "email")}
          value={inputValues.email}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={inputChangeHandler.bind(this, "password")}
          value={inputValues.password}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={inputChangeHandler.bind(this, "cpassword")}
          value={inputValues.cpassword}
        />
      </View>

      <PressButton onPress={submitHandler}>REGISTER</PressButton>
    </View>
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

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AED6F1",
    marginBottom: 38,
  },
});
