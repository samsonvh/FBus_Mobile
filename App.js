import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [userInfo, setUserInfo] = useState();
  const [accessToken, setAccessToken] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "766591472375-7ev5tfjn9dfa9266vc2ce6qafpa540te.apps.googleusercontent.com",
    iosClientId: "766591472375-qt3f94ilpinvg15dkrdcojt4cjs3o6ji.apps.googleusercontent.com",
    expoClientId: "766591472375-ql19qq7tko0duloolc5fht3molq1jsm7.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  const getUserData = async () => {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    userInfoResponse.json().then(data => {
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
    <View style={styles.container}>
      {showUserData()}
      <Button
        title={accessToken ? "Get User Data" : "Login"}
        onPress={accessToken ? getUserData : () => promptAsync({ useProxy: true, showInRecents: true })}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
