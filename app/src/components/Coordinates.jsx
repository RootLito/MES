import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import * as Location from "expo-location";

export default function Coordinates({ onLocation }) {
  const [coords, setCoords] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [canAskAgain, setCanAskAgain] = useState(true);

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings(); // Android
    }
  };

  const requestLocation = useCallback(async () => {
    setErrorMsg(null); // Clear previous error
    try {
      const { status, canAskAgain } =
        await Location.requestForegroundPermissionsAsync();

      setCanAskAgain(canAskAgain); // Save so we can check next time

      if (status !== "granted") {
        if (!canAskAgain) {
          setErrorMsg("Permission denied permanently. Open settings.");
        } else {
          setErrorMsg("Permission denied.");
        }
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoords(loc.coords);
      if (onLocation) onLocation(loc.coords);
    } catch (err) {
      setErrorMsg("Error getting location: " + err.message);
    }
  }, [onLocation]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return (
    <View style={styles.container}>
      <View style={styles.coordInfo}>
        {errorMsg ? (
          <Text style={styles.error}>{errorMsg}</Text>
        ) : coords ? (
          <>
            <Text>Latitude: {coords.latitude}</Text>
            <Text>Longitude: {coords.longitude}</Text>
          </>
        ) : (
          <Text>Getting location...</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={canAskAgain ? requestLocation : openAppSettings}
      >
        <Text style={styles.buttonText}>Activate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
  },
  coordInfo: {
    flex: 1,
  },
  error: {
    color: "red",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
