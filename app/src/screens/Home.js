import NetInfo from "@react-native-community/netinfo";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import axios from "axios";

export default function Home() {
  const [isConnected, setIsConnected] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [totalRes, setTotalRes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(
          "https://bfar-server.onrender.com/survey"
        );
        setSurveys(response.data);
        setTotalRes(response.data.length);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <View style={styles.container}>
      {/* {action bar diri} */}
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

      {/* {action bar diri} */}
      <View style={styles.content}>
        <View style={styles.total}>
          <View
            style={{
              display: "flex",
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

        {!isConnected ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{ fontSize: 30, fontWeight: "bold", color: "#ec6978" }}
            >
              Error Fetching Data
            </Text>
            <Text>No internet connection, use offline mode</Text>
            <Image
              source={require("./../../assets/bfar.png")}
              style={{ width: 200, height: 200, opacity: 0.2 }}
            ></Image>
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
