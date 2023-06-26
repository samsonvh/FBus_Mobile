import { StyleSheet, Text, View, Image, Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../constants/styles";
import PrimarryButton from "../component/PrimarryButton";
import { ImageBackground } from "react-native";

function LoginScreen() {
  const [userInfo, setUserInfo] = useState();
  const [accessToken, setAccessToken] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "766591472375-7ev5tfjn9dfa9266vc2ce6qafpa540te.apps.googleusercontent.com",
      
    iosClientId:
      "766591472375-qt3f94ilpinvg15dkrdcojt4cjs3o6ji.apps.googleusercontent.com",
    expoClientId:
      "766591472375-ql19qq7tko0duloolc5fht3molq1jsm7.apps.googleusercontent.com",
  });

  const navigation = useNavigation();

  useEffect(() => {
    console.log(response)
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      console.log("idToken:", response.authentication.idToken); // Hiển thị idToken trong console
      navigation.navigate("Start");
    }
  }, [response]);

  function loginPressHandler() {
    if (accessToken) {
      navigation.navigate("Start");
    } else {
      promptAsync({ useProxy: true, showInRecents: true });
    }
  }

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  };

  const showUserData = () => {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  };

  return (
    <LinearGradient
      colors={[GlobalStyles.colors.primary700, GlobalStyles.colors.accent500]}
      style={styles.container}
    >
      <ImageBackground
        source={require('../assets/images/fbus2.jpg')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.welcome}>
          <Text style={styles.textWelcome}>WELCOME</Text>
        </View>

        <PrimarryButton onPress={loginPressHandler}>Login</PrimarryButton>
      </ImageBackground>
    </LinearGradient>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  welcome: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 150,
  },
  textWelcome: {
    padding: 4,
    fontSize: 32,
    fontWeight: "bold",
    color: GlobalStyles.colors.accent500,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
