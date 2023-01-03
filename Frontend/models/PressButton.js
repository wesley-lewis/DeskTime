// Custom button component
import { View, Text, Pressable, StyleSheet } from "react-native";
// pressable for action on press as buttons does not have styling we use alternate opt

export default function PressButton(props) {
  return (
    // ripple effect -> animation on press
    <View style={styles.btnOuterContainer}>
      {/* pre-defined pressed obj styling in react-native */}
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.btnInnerContainer, styles.pressed]
            : styles.btnInnerContainer
        }
        onPress={props.onPress} // prop passed to this js file from StartGameScreen
        // same prop can be passed with different functions
        android_ripple={{ color: "#640233" }}
      >
        {/* props.children -> to render the txt btwn starting and closing tag (Reset and Confirm) */}
        <Text style={styles.btnText}>{props.children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btnOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden", //any effect/style will be clipped
  },
  btnInnerContainer: {
    backgroundColor: "#ff4da6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75, // transperancy of 25%
  },
});
