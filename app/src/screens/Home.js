import NetInfo from "@react-native-community/netinfo";
import { Platform, StatusBar, StyleSheet, View, Text  } from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";



export default function Home() {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
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
          <Text style={styles.textStatus}>
            {isConnected === null
              ? "Checking connection..."
              : isConnected
              ? "Online"
              : "Offline"}
          </Text>
        </View>
      </View>




      {/* {action bar diri} */}
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
    color: "green",
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
});
