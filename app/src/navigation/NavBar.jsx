import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import Offline from "../screens/Offline";
import Monitoring from "../screens/Monitoring";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Monitoring":
                iconName = "clipboard";
                break;
              case "Offline":
                iconName = "cloud-offline";
                break;
              default:
                iconName = "circle";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#182553",
          tabBarInactiveTintColor: "#ccc",
          tabBarPressColor: "transparent",
          tabBarPressOpacity: 1,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 60,
            borderTopWidth: 0,
            elevation: 0, 
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12, 
            paddingBottom: 5,
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Monitoring" component={Monitoring} />
        <Tab.Screen name="Offline" component={Offline} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavBar;
