import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PressButton from "../models/PressButton";

export default function Home({ navigation }) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={homeStyles.firstView}>
            <Text style={homeStyles.text}>DESKTIME</Text>
          </View>
          <View style={homeStyles.btnStyle}>
            <PressButton onPress={() => navigation.navigate("Login")}>
              Login
            </PressButton>
            <PressButton onPress={() => navigation.navigate("Register")}>
              Register
            </PressButton>
          </View>
        </View>
        <View>
          <Text style={homeStyles.secondText}>
            “DeskTime” is an automated attendance management system app which
            will help faculty reduce manual attendance taking through face
            detection and recognition.
          </Text>
        </View>
        <View>
          <Image
            source={require("../assets/attendance_new.png")}
            style={homeStyles.Image}
          ></Image>
        </View>
        <View style={homeStyles.userInfo}>
          <View style={homeStyles.userText}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
              Members
            </Text>
            <Text style={{ color: "white", marginLeft: 18 }}>Wesley L.</Text>
            <Text style={{ color: "white", marginLeft: 18 }}>Amey B.</Text>
            <Text style={{ color: "white", marginLeft: 18 }}>Vailantan F.</Text>
            <Text style={{ color: "white", marginLeft: 18 }}>Sandesh R.</Text>
          </View>
          <View style={homeStyles.userText}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
              Follow Us
            </Text>
            <View style={homeStyles.iconPlace}>
              <View style={homeStyles.icons}>
                <Ionicons
                  name="logo-linkedin"
                  style={{ marginRight: 10, marginVertical: 13 }}
                  size={20}
                  color="white"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.linkedin.com/in/amey-bagwe-296739209/"
                    )
                  }
                />
                <Ionicons
                  name="logo-linkedin"
                  size={20}
                  color="black"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.linkedin.com/in/wesley-lewis-859933234/"
                    )
                  }
                />
              </View>
              <View style={homeStyles.icons}>
                <Ionicons
                  name="logo-linkedin"
                  style={{ marginRight: 10, marginVertical: 10 }}
                  size={20}
                  color="black"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.linkedin.com/in/sandesh-raut-6a8289208/"
                    )
                  }
                />
                <Ionicons
                  name="logo-linkedin"
                  size={20}
                  color="white"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.linkedin.com/in/vailantan-fernandes-91a4b7249/"
                    )
                  }
                />
              </View>
            </View>
          </View>
          <View style={homeStyles.userText}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
              Email Us
            </Text>
            <View style={homeStyles.icons}>
              <Ionicons
                style={{ marginTop: 10, marginLeft: 5 }}
                name="mail"
                size={20}
                color="black"
                onPress={() =>
                  Linking.openURL(
                    "mailto:crce.group15.pbl@gmail.com?subject=Feedback"
                  )
                }
              />
              <Ionicons
                style={{ marginTop: 10, marginLeft: 5 }}
                name="arrow-undo-sharp"
                size={40}
                color="black"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#705DE0",
    alignItems: "center",
    justifyContent: "center",
  },
});

const homeStyles = StyleSheet.create({
  userInfo: {
    display: "flex",
    flexDirection: "row",
    flex: 0.5,
    justifyContent: "space-between",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    marginRight: 20,
  },
  iconPlace: {
    alignItems: "center",
  },
  text: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 15,
  },
  btnStyle: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
    marginTop: 10,
    // marginLeft: 12,
  },

  userText: {
    marginTop: 20,
    flex: 1,
    marginLeft: 20,
  },
  secondText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 50,
  },

  Image: {
    // flex: 1,
    width: 395,
    height: 300,
    resizeMode: "cover",
    // alignItems: "center",
  },
});
