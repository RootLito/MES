import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, Platform, StatusBar } from "react-native";
import * as FileSystem from "expo-file-system";
import NetInfo from "@react-native-community/netinfo";
import Icon from "react-native-vector-icons/Feather";
import { AppState } from "react-native";

export default function List() {
  const [isConnected, setIsConnected] = useState(null);
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    const intervalId = setInterval(() => {
      fetchSavedData();
    }, 2000);

    fetchSavedData();

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, []);

  // Fetch saved data from file system
  const fetchSavedData = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "formData.json";
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (!fileInfo.exists) {
        console.log("File not found");
        return;
      }

      const content = await FileSystem.readAsStringAsync(fileUri);
      const parsedData = JSON.parse(content);

      const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];
      setSavedData(dataArray);
    } catch (error) {
      console.error("Error reading saved data:", error);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        fetchSavedData(); // Refresh when user returns
      }
    });

    fetchSavedData(); // Initial load

    return () => {
      subscription.remove();
    };
  }, []);

  // Save data to MongoDB
  const saveDataToMongoDB = async () => {
    if (isConnected) {
      try {
        const response = await fetch("https://bfar-server.onrender.com/survey/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: savedData }), // Send the saved data
        });

        if (response.ok) {
          console.log("Data saved successfully");
        } else {
          console.error("Failed to save data", response.status);
        }
      } catch (error) {
        console.error("Error saving data to MongoDB:", error);
      }
    } else {
      alert("You are offline. Please check your internet connection.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionBar}>
        <Text style={styles.text}>OFFLINE</Text>
        <View style={styles.wifi}>
          <Icon
            name={isConnected ? "wifi" : "wifi-off"}
            size={14}
            color={isConnected ? "#54cf95" : "red"}
          />
          <Text
            style={[
              styles.textStatus,
              { color: isConnected ? "#54cf95" : "red" },
            ]}
          >
            {isConnected === null
              ? "Checking connection..."
              : isConnected
              ? "Online"
              : "Offline"}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.total}>
          <View style={styles.totalRow}>
            <View>
              <Text style={{ color: "#fff", fontWeight: "900", fontSize: 22 }}>
                TOTAL
              </Text>
              <Text style={{ color: "#fff" }}>Total offline saved files</Text>
            </View>
            <Text style={{ color: "#fff", fontSize: 52, fontWeight: "900" }}>
              {savedData.length}
            </Text>
          </View>
        </View>

        <FlatList
          style={{ flex: 1, marginTop: 16 }}
          showsVerticalScrollIndicator={false}
          data={savedData}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={[styles.cell1, styles.headerText]}>#</Text>
              <Text style={[styles.cell2, styles.headerText]}>Name</Text>
              <Text style={[styles.cell3, styles.headerText]}>Address</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text style={styles.cell1}>{index + 1}</Text>
              <Text style={styles.cell2}>{item.name}</Text>
              <Text style={styles.cell3}>
                {item.baranggay}, {item.municipality}, {item.province}
              </Text>
            </View>
          )}
        />
        {/* Button to save data to MongoDB */}
        <Button title="Save to MongoDB" onPress={saveDataToMongoDB} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  actionBar: {
    width: "100%",
    height: Platform.OS === "ios" ? 44 : 56,
    backgroundColor: "#182553",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  textStatus: {
    fontSize: 14,
  },
  wifi: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  total: {
    width: "100%",
    backgroundColor: "#182553",
    padding: 16,
    borderRadius: 8,
  },
  totalRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#182553",
    padding: 10,
    borderRadius: 5,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: "#ccc",
    gap: 10,
  },
  cell1: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold",
  },
  cell2: {
    flex: 4,
    textAlign: "left",
  },
  cell3: {
    flex: 5,
    textAlign: "left",
  },
});
