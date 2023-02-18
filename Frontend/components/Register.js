import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, Alert } from "react-native";
import PressButton from "../models/PressButton";
import { inputUserData } from "../util/http";
import { fetchUserData } from "../util/http";

export default function Register({ navigation }) {
  // to save array of obj of firebase user collection
  const [fetchedUserData, setFetchedUserData] = useState([]);

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
    rollno: "",
    password: "",
    cpassword: "",
  });

  // trigger func after submitting
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return { ...curInputValues, [inputIdentifier]: enteredValue };
    });
  }

  // reset form values after registering
  function resetChangeHandler() {
    inputValues.email = "";
    inputValues.rollno = "";
    inputValues.password = "";
    inputValues.cpassword = "";
  }

  // verification of data
  function submitHandler() {
    const formData = {
      email: inputValues.email,
      rollno: inputValues.rollno,
      password: inputValues.password,
      cpassword: inputValues.cpassword,
    };

    // const formDataNew = {
    //   name: inputValues.email,
    //   roll_no: inputValues.rollno,
    // };

    // fetch("http://192.168.164.49:8000/students/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formDataNew),
    // });

    // checking if user exists in database
    let result = fetchedUserData.find(function (obj) {
      return obj.email === formData.email;
    });

    let result2 = fetchedUserData.find(function (obj) {
      return obj.rollno === formData.rollno;
    });

    // password matching
    if (inputValues.password !== inputValues.cpassword) {
      Alert.alert("Could not register", "Passwords did not match");
    } else if (result !== undefined) {
      Alert.alert(
        "Could not register",
        "User is already registered with same id"
      );
    } else if (result2 !== undefined) {
      Alert.alert(
        "Could not register",
        "User is already registered with roll no"
      );
    } else if (
      result === undefined &&
      inputValues.password === inputValues.cpassword &&
      inputValues.password !== ""
    ) {
      inputUserData(formData);
      Alert.alert("Registration Successfull !!!", "Make sure to login");
      navigation.navigate("Login");
      resetChangeHandler();
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/login.jpg")} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username."
          placeholderTextColor="#003f5c"
          onChangeText={inputChangeHandler.bind(this, "email")}
          value={inputValues.email}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Roll No."
          placeholderTextColor="#003f5c"
          onChangeText={inputChangeHandler.bind(this, "rollno")}
          value={inputValues.rollno}
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
