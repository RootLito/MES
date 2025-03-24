import NetInfo from "@react-native-community/netinfo";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable, Button } from 'react-native-paper'; // Import React Native Paper components

export default function List() {
  const [isConnected, setIsConnected] = useState(null);
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    // Fetch data every 2 seconds
    const intervalId = setInterval(() => {
      fetchSavedData();
    }, 2000);

    // Initial fetch
    fetchSavedData();

    // Clean up the interval when component unmounts
    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, []);

  const fetchSavedData = async () => {
    try {
      const data = await AsyncStorage.getItem("formDataList");
      if (data) {
        setSavedData(JSON.parse(data)); 
      } else {
        setSavedData([]);
      }
    } catch (error) {
      console.error("Failed to fetch saved data", error);
    }
  };

  const handleReload = () => {
    fetchSavedData(); // Reload data when the button is pressed
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionBar}>
        <Text style={styles.text}>OFFLINE</Text>
        <View style={styles.wifi}>
          <Icon
            name={isConnected ? "wifi" : "wifi-off"}
            size={14}
            color={isConnected ? "green" : "red"}
          />
          <Text style={[styles.textStatus, { color: isConnected ? "green" : "red" }]}>
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
              <Text style={{ color: "#fff", fontWeight: "900", fontSize: 22 }}>TOTAL</Text>
              <Text style={{ color: "#fff" }}>Total offline saved files</Text>
            </View>
            <Text style={{ color: "#fff", fontSize: 52, fontWeight: "900" }}>
              {savedData.length}
            </Text>
          </View>
          <Button mode="contained" onPress={handleReload} style={styles.reloadButton}>
            Reload Data
          </Button>
        </View>

        <DataTable style={styles.tableContainer}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
          </DataTable.Header>

          {savedData.length > 0 ? (
            savedData.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.email}</DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <Text style={styles.emptyText}>No saved data yet.</Text>
          )}
        </DataTable>
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
  reloadButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    backgroundColor: '#ADD8E6', // Light Blue background
  },
  emptyText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
});
