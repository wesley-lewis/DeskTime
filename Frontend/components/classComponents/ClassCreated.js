import { LinearGradient } from "expo-linear-gradient";
import { Text, View, ImageBackground, StyleSheet } from "react-native";

export default function ClassCreated() {
  return (
    <LinearGradient style={styles.root} colors={["red", "blue"]}>
      <ImageBackground
        source={require("../../assets/attendance.jpg")}
        resizeMode="cover"
        style={styles.root}
        imageStyle={styles.backgroundImage}
      ></ImageBackground>
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
