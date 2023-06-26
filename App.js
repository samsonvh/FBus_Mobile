import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, SafeAreaView } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import React, { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./screens/StartScreen";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "./constants/styles";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar style="light" />

      <NavigationContainer >
        <Stack.Navigator screenOptions={{
          headerBackground: () => (
            <LinearGradient colors={[GlobalStyles.colors.primary700, GlobalStyles.colors.accent500]} style={{ flex: 1 }} 
          />
          ),
        }} >
          <Stack.Screen name="Login" component={LoginScreen} options={{
            headerTintColor: 'white' ,
            headerShown: false
            
            
          }}/>
          <Stack.Screen name="Start" component={StartScreen} options={{
            title: 'HOME',
            
          }}/>

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
