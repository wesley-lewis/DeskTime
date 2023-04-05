import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

import { fetchUserData, inputNewPassword } from "../util/http";
import PressButton from "./PressButton";

const ForgotPassModal = () => {
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

  const [modalVisible, setModalVisible] = useState(false);

  const [createInputValues, setCreateInputValues] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  // allocating class creating inputs to state
  function createInputChangeHandler(inputIdentifier, enteredValue) {
    setCreateInputValues((curInputValues) => {
      return { ...curInputValues, [inputIdentifier]: enteredValue };
    });
  }

  function resetChangeHandler() {
    createInputValues.email = "";
    createInputValues.password = "";
    createInputValues.cpassword = "";
    setModalVisible(!modalVisible);
  }

  function submitHandler() {
    const userData = {
      email: createInputValues.email,
      password: createInputValues.password,
      cpassword: createInputValues.cpassword,
      rollno: "",
    };
    if (userData.password == "" || userData.cpassword == "") {
      Alert.alert("Password Field Empty", "Enter some text");
    } else if (userData.password !== userData.cpassword) {
      Alert.alert("Password Error !!!", "Passwords did not match");
    } else {
      let result = fetchedUserData.find((indData) => {
        return indData.email === userData.email ? true : false;
      });
      if (!result) {
        Alert.alert(
          "Account does not exists!",
          "Please type correct email address"
        );
      } else if (result) {
        userData.rollno = result.rollno;
        inputNewPassword(result.id, userData);
        Alert.alert("Password Changed !!!", "Make sure to login");
        resetChangeHandler();
      }
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <KeyboardAvoidingView
              style={styles.containerView}
              behavior="padding"
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.fpScreenContainer}>
                  <View style={styles.fpFormView}>
                    <TextInput
                      selectionColor="orange"
                      placeholder={"Enter Email"}
                      placeholderTextColor="purple"
                      style={styles.fpFormTextInput}
                      onChangeText={createInputChangeHandler.bind(
                        this,
                        "email"
                      )}
                      value={createInputValues.email}
                    />
                    <TextInput
                      secureTextEntry={true}
                      selectionColor="orange"
                      placeholder={"Enter New Password"}
                      placeholderTextColor="purple"
                      style={styles.fpFormTextInput}
                      onChangeText={createInputChangeHandler.bind(
                        this,
                        "password"
                      )}
                      value={createInputValues.password}
                    />
                    <TextInput
                      secureTextEntry={true}
                      selectionColor="orange"
                      placeholder={"Confirm New Password"}
                      placeholderTextColor="purple"
                      style={styles.fpFormTextInput}
                      onChangeText={createInputChangeHandler.bind(
                        this,
                        "cpassword"
                      )}
                      value={createInputValues.cpassword}
                    />
                    <PressButton
                      containerStyle={styles.fpButton}
                      type="clear"
                      onPress={submitHandler}
                    >
                      Update Password
                    </PressButton>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={resetChangeHandler}
            >
              <Text style={styles.textStyle}>Close Tab</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text>Forgot Password ?</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "violet",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  containerView: {
    // flex: 1,
    alignItems: "center",
  },
  fpFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "skyblue",
    backgroundColor: "skyblue",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  fpButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center",
  },
});

export default ForgotPassModal;
