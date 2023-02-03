import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PressButton from "../../models/PressButton";
import { makeCode } from "../../util/codeGenerator";

import {
  inputCreateClassData,
  fetchCreateClassData,
  inputJoinClassData,
  fetchJoinClassData,
} from "../../util/http";

export default function ClassModal({ route, navigation }) {
  // getting login email
  const { decision, globalEmail } = route.params;

  // closing and opening modal
  const [modalVisible, setModalVisible] = useState(false);

  // for confirming class creation
  const [confirmSubjectCreated, setConfirmSubjectCreated] = useState(false);
  // for confirming joining class
  const [confirmClassJoined, setConfirmClassJoined] = useState(false);

  // state for fetching Class data
  const [fetchedCreateClassData, setFetchedCreateClassData] = useState([]);
  // state for fetching joined class data
  const [fetchedJoinClassData, setFetchedJoinClassData] = useState([]);

  useEffect(() => {
    // calling func and saving data in fetchedUserData
    async function getCreateClassData() {
      const classes = await fetchCreateClassData();
      setFetchedCreateClassData(classes);
    }
    getCreateClassData();

    async function getJoinClassData() {
      const classes = await fetchJoinClassData();
      setFetchedJoinClassData(classes);
    }
    getJoinClassData();
  }, []);

  // taking input for creating new class for storing in database
  const [createInputValues, setCreateInputValues] = useState({
    class: "",
    subject: "",
  });

  // taking input for joining new class for storing in database
  const [joinInputValues, setJoinInputValues] = useState({
    code: "",
  });

  // allocating class creating inputs to state
  function createInputChangeHandler(inputIdentifier, enteredValue) {
    setCreateInputValues((curInputValues) => {
      return { ...curInputValues, [inputIdentifier]: enteredValue };
    });
  }
  // allocating class joining inputs to state
  function joinInputChangeHandler(inputIdentifier, enteredValue) {
    setJoinInputValues((curInputValues) => {
      return { ...curInputValues, [inputIdentifier]: enteredValue };
    });
  }

  let textInput = undefined;

  // if creating class then add another text input
  if (decision === "Create") {
    textInput = (
      <TextInput
        selectionColor="orange"
        placeholder="Enter subject name"
        placeholderTextColor="purple"
        style={styles.clsFormTextInput}
        onChangeText={createInputChangeHandler.bind(this, "subject")}
        value={createInputValues.subject}
      />
    );
  }

  function submitHandler() {
    if (decision === "Create") {
      const generatedCode = makeCode();
      const createClassData = {
        userEmail: globalEmail,
        class: createInputValues.class,
        subject: createInputValues.subject,
        code: generatedCode,
      };

      const sameEmailData = fetchedCreateClassData.filter(
        (obj) => obj.userEmail === globalEmail
      );

      // checking if class name exists in database
      let result = sameEmailData.find(function (obj) {
        return (
          obj.class === createClassData.class &&
          obj.subject === createClassData.subject
        );
      });

      if (result === undefined) {
        setConfirmSubjectCreated(true);
      } else {
        setConfirmSubjectCreated(false);
      }

      if (!confirmSubjectCreated) {
        Alert.alert(
          "Class of same Subject name already exists !",
          "Please give different subject name "
        );
      } else if (confirmSubjectCreated) {
        inputCreateClassData(createClassData);
        Alert.alert(
          "Class Created Successfully !!",
          "Check created class section"
        );
        navigation.navigate("ClassCreated");
      }
    } else if (decision === "Join") {
      // required class by giving class code
      const codeObj = fetchedCreateClassData.find((obj) => {
        return obj.code === joinInputValues.code;
      });

      // to check if not joining repeatedly
      const emailObjJoin = fetchedJoinClassData.filter((obj) => {
        return obj.joinEmail === globalEmail;
      });

      const codeObjJoin = emailObjJoin.find((obj) => {
        return obj.code === joinInputValues.code;
      });

      if (codeObj === undefined) {
        Alert.alert(
          "Class does not exists !!",
          "Make sure you have entered the right code"
        );
        setConfirmClassJoined(false);
      } else if (globalEmail === codeObj.userEmail) {
        Alert.alert(
          "Class created from this account !!",
          "Cannot join your own class"
        );
        setConfirmClassJoined(false);
      } else if (codeObjJoin === undefined) {
        const joinClassData = {
          joinEmail: globalEmail,
          createEmail: codeObj.userEmail,
          class: codeObj.class,
          subject: codeObj.subject,
          code: joinInputValues.code,
        };
        inputJoinClassData(joinClassData);
        setConfirmClassJoined(true);
        navigation.navigate("ClassJoined");
      } else if (codeObjJoin.code === joinInputValues.code) {
        Alert.alert(
          "Class already joined !!",
          "Please check the joined class tab"
        );
        setConfirmClassJoined(false);
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
          Alert.alert("Modal has been closed.");
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
                <View style={styles.clsScreenContainer}>
                  <View style={styles.clsFormView}>
                    <TextInput
                      selectionColor="orange"
                      placeholder={
                        decision === "Create"
                          ? "Enter class name"
                          : "Enter class code"
                      }
                      placeholderTextColor="purple"
                      style={styles.clsFormTextInput}
                      onChangeText={
                        decision === "Create"
                          ? createInputChangeHandler.bind(this, "class")
                          : joinInputChangeHandler.bind(this, "code")
                      }
                      value={
                        decision === "Create"
                          ? createInputValues.class
                          : joinInputValues.code
                      }
                    />
                    {textInput}
                    <PressButton
                      containerStyle={styles.clsButton}
                      type="clear"
                      onPress={submitHandler}
                    >
                      {decision === "Create" ? "Create Class" : "Join Class"}
                    </PressButton>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close Tab</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>{decision}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    // flex: 1,
    alignItems: "center",
  },

  clsFormTextInput: {
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
  clsButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    // justifyContent: "center",
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
});
