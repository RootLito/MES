import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";

export default function Coordinates({ onLocation }) {
  const [coords, setCoords] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoords(loc.coords);
      if (onLocation) onLocation(loc.coords); // send back to parent if needed
    };

    getLocation();
  }, []);

  if (errorMsg) {
    return <Text style={{ color: "red" }}>{errorMsg}</Text>;
  }

  if (!coords) {
    return <Text>Getting location...</Text>;
  }

  return (
    <View>
      <Text>Latitude: {coords.latitude}</Text>
      <Text>Longitude: {coords.longitude}</Text>
    </View>
  );
}
