import { LinearGradient } from "expo-linear-gradient";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import ClassCard from "../../models/classModels/ClassCard";
import { useState, useEffect } from "react";

import {
  fetchCreateClassData,
  fetchLoginData,
  deleteTopLoginIds,
} from "../../util/http";

export default function ClassCreated() {
  // state for fetching Class data
  const [fetchedCreateClassData, setFetchedCreateClassData] = useState([]);
  const [fetchedLoggedInData, setFetchedLoggedInData] = useState([]);

  useEffect(() => {
    // calling func and saving data in fetchedUserData
    async function getCreateClassData() {
      const classes = await fetchCreateClassData();
      setFetchedCreateClassData(classes);
    }
    getCreateClassData();

    async function getLoginData() {
      const loggedData = await fetchLoginData();
      setFetchedLoggedInData(loggedData);
    }
    getLoginData();
  }, []);

  const allEmails = fetchedLoggedInData.map((obj) => {
    return obj.loggedEmail;
  });

  const recentEmail = allEmails.pop();

  const userData = fetchedCreateClassData.filter((obj) => {
    return obj.userEmail === recentEmail;
  });

  const userIds = fetchedLoggedInData.map((obj) => {
    return obj.id;
  });

  if (fetchedLoggedInData.length >= 10) {
    for (let i = 0; i < 5; i++) {
      deleteTopLoginIds(userIds[i]);
    }
  }
  const renderClass = (item) => <ClassCard data={{ ...item }} />;

  return (
    <LinearGradient style={styles.root} colors={["red", "blue"]}>
      <ImageBackground
        source={require("../../assets/attendance.jpg")}
        resizeMode="cover"
        style={styles.root}
        imageStyle={styles.backgroundImage}
      >
        <FlatList
          data={userData}
          renderItem={renderClass}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  backgroundImage: {
    opacity: 0.15,
  },
});
