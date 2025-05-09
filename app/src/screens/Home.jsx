import NetInfo from "@react-native-community/netinfo";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import Icon from "react-native-vector-icons/Feather";
import axios from "axios";
import Coordinates from "../components/Coordinates";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [totalRes, setTotalRes] = useState(0);
  const [loading, setLoading] = useState(true);

  // Monitor internet connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // Reload data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [isConnected])
  );

  // Fetch surveys (safe against offline)
  const fetchData = async () => {
    setLoading(true);

    if (!isConnected) {
      console.log("Offline: Skipping fetch.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("https://bfar-server.onrender.com/survey");
      setSurveys(response.data);
      setTotalRes(response.data.length);
    } catch (error) {
      console.log("Error fetching surveys, axios error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionBar}>
        <Text style={styles.text}>HOME</Text>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: "#fff", fontWeight: "900", fontSize: 22 }}>
                TOTAL
              </Text>
              <Text style={{ color: "#fff" }}>Total saved online</Text>
            </View>
            <Text style={{ color: "#fff", fontSize: 52, fontWeight: "900" }}>
              {totalRes}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            GPS Coordinates:
          </Text>
          <Coordinates
            onLocation={(loc) => ("Current Location:", loc)}
          />
        </View>

        {!isConnected ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{ fontSize: 30, fontWeight: "bold", color: "#ec6978" }}
            >
              Offline Mode
            </Text>
            <Text>No internet connection</Text>
            <Image
              source={require("./../../assets/bfar.png")}
              style={{ width: 200, height: 200, opacity: 0.2 }}
            />
          </View>
        ) : loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#54cf95" />
            <Text>Fetching data...</Text>
          </View>
        ) : surveys.length > 0 ? (
          <FlatList
            style={{ flex: 1, marginTop: 16 }}
            showsVerticalScrollIndicator={false}
            data={surveys}
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
        ) : (
          <Text>No surveys found.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  actionBar: {
    width: "100%",
    height: Platform.OS === "ios" ? 44 : 56,
    backgroundColor: "#182553",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  textStatus: { fontSize: 14 },
  wifi: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  content: { flex: 1, padding: 16 },
  total: {
    width: "100%",
    backgroundColor: "#182553",
    padding: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#182553",
    padding: 10,
    borderRadius: 5,
  },
  headerText: { color: "#fff", fontWeight: "bold" },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: "#ccc",
    gap: 10,
  },
  cell1: { flex: 1, textAlign: "left", fontWeight: "bold" },
  cell2: { flex: 4, textAlign: "left" },
  cell3: { flex: 5, textAlign: "left" },
});
