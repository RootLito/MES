import NetInfo from "@react-native-community/netinfo";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
} from "react-native";

import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    fetchSavedData();
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
    backgroundColor: "#ADD8E6",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
    // FLATLIST
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
        fontWeight: "bold"
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
