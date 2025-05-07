import { StyleSheet, View, Image, Text } from "react-native";
const Bfar = require("./../../assets/bfar.png");

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image source={Bfar} style={styles.image} />
      <Text>
        <Text style={{ color: "#182553", fontWeight: "bold", fontSize: 48}}>BFAR</Text>
        <Text style={{ color: "#a6a6a6", fontWeight: "bold", fontSize: 48 }}> XI</Text>
      </Text>
      <Text style={styles.copyright}>© 2025 BFAR XI. All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
  },
  copyright: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    fontSize: 14,
    color: "gray",
  },
});
