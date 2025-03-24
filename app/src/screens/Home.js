import NetInfo from "@react-native-community/netinfo";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import { DataTable } from "react-native-paper";
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
            color={isConnected ? "green" : "red"}
          />
          <Text
            style={[styles.textStatus, { color: isConnected ? "green" : "red" }]}
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
        {loading ? (
          <Text>Loading surveys...</Text>
        ) : surveys.length > 0 ? (
          <ScrollView style={{ flex: 1, marginTop: 16 }}>
            <ScrollView horizontal>
              <View style={{ flexGrow: 1 }}>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title style={styles.cell}>#</DataTable.Title>
                    <DataTable.Title style={styles.cell}>Name</DataTable.Title>
                    <DataTable.Title style={styles.cell}>Address</DataTable.Title>
                    <DataTable.Title style={styles.cell}>Date</DataTable.Title>
                  </DataTable.Header>
                  {surveys.map((survey, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell style={styles.cell}>{index + 1}</DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>{survey.name}</DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {survey.baranggay}, {survey.municipality}, {survey.province}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>{survey.createdAt}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </View>
            </ScrollView>
          </ScrollView>
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

  cell: {
    textAlign: "left", // Align text to the left
  },
});
