import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function PrimarryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable 
      style={styles.buttonInnerContainer} 
      onPress={onPress}
      android_ripple={{color: '#cccc'}}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}
export default PrimarryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    marginTop: 200,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    marginHorizontal: 100,
    borderRadius: 8
   
  },
  buttonText: {
    color: GlobalStyles.colors.accent500,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
});
