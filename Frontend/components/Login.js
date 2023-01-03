import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import PressButton from "../models/PressButton";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { fetchUserData } from "../util/http";
import { Alert } from "react-native";

export default function Login({ navigation }) {
  // fetching data from firebase database user collections
  const [fetchedUserData, setFetchedUserData] = useState([]);

  // confirming login state
  const [confirmLogin, setConfirmLogin] = useState(false);

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

  // verification and validation
  function submitHandler() {
    const formData = {
      email: inputValues.email,
      password: inputValues.password,
    };

    let result = fetchedUserData.find((indData) => {
      return indData.email === formData.email &&
        indData.password === formData.password
        ? true
        : false;
    });
    // console.log(result);
    if (result) {
      setConfirmLogin(true);
    } else {
      setConfirmLogin(false);
    }

    if (confirmLogin === true) {
      Alert.alert("Login Successfull !!!", "You can create or join the class");
      console.log(formData);
      navigation.navigate("Class", formData);
    } else {
      Alert.alert(
        "Login Unsuccessfull",
        "Incorrect Email or Password!! Or make sure you have registered"
      );
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

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <PressButton onPress={submitHandler}>LOGIN</PressButton>
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
    marginBottom: 45,
  },
});
