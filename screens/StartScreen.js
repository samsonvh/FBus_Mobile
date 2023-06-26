import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../constants/styles";
import { getCoordinations } from "../util/http";
import PrimarryButton from "../component/PrimarryButton";

function StartScreen() {
  
 
 
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coordinations, setCoordinations] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Quyền truy cập vị trí bị từ chối");
          return;
        }

        // Lấy vị trí hiện tại
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      } catch (error) {
        console.log("Lỗi khi lấy vị trí:", error);
        setErrorMsg("Lỗi khi lấy vị trí");
      }
    };

    getLocation();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getCoordinations();
      setCoordinations(response.data);
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu:", error);
    }
  };

  return (
    
    <LinearGradient
      colors={[GlobalStyles.colors.primary700, GlobalStyles.colors.accent500]}
      style={styles.container}
      
    >
      <View>
        {errorMsg ? (
          <Text>{errorMsg}</Text>
        ) : (
          <Text>
            Vị trí hiện tại:{" "}
            {location && `${location.latitude}, ${location.longitude}`}
          </Text>
        )}
      </View>
   
      <PrimarryButton onPress={fetchData}>Hit</PrimarryButton>
      <View>
          
      </View>
    </LinearGradient>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
