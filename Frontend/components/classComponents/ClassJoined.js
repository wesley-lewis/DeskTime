// import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";

import ClassCard from "../../models/classModels/ClassCard";

import { fetchLoginData, fetchJoinClassData } from "../../util/http";

export default function ClassJoined() {
  const [fetchedJoinClassData, setFetchedJoinClassData] = useState([]);
  const [fetchedLoggedInData, setFetchedLoggedInData] = useState([]);

  useEffect(() => {
    // calling func and saving data in fetchedUserData
    async function getJoinClassData() {
      const classes = await fetchJoinClassData();
      setFetchedJoinClassData(classes);
    }
    getJoinClassData();

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

  console.log(recentEmail);

  const userData = fetchedJoinClassData.filter((obj) => {
    return obj.joinEmail === recentEmail;
  });

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
