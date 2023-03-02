//Main react Stuff:
import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
//Navigation:
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Views:
import HomeScreen from "./screens/HomeScreen";
import List from "./screens/List";
import ChatRoom from "./screens/ChatRoom";
import Settings from "./screens/Settings";
// Firebase
import { doc, getDoc, getFirestore } from "firebase/firestore";
// Helpers
import { Icon } from "react-native-elements";
import { createGlobalState } from "react-hooks-global-state";
import { auth } from "./firebase";

// Variablen
const Tab = createBottomTabNavigator();
// --> Global
const { setGlobalState, useGlobalState } = createGlobalState({
  profilepic: "",
  username: "",
  darkmode: false,
});

const TabNavigator = () => {
  // Firebase
  const userID = auth.currentUser.uid;
  const db = getFirestore();

  // Variables
  const darkmode = useGlobalState("darkmode");
  const [profilepic, setProfilepic] = useState();

  // Functions
  const fetchUser = async () => {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setGlobalState("profilepic", docSnap.data().profilepic);
      setProfilepic(docSnap.data().profilepic);
      setGlobalState("username", docSnap.data().username);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              type="antdesign"
              color={focused ? "#f00" : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={List}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="list" type="entypo" color={focused ? "#f00" : "#000"} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="chatbubbles-outline"
              type="ionicon"
              color={focused ? "#f00" : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 27,
                height: 27,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: focused ? "#000" : "#fff",
                borderRadius: 15,
              }}
            >
              <Image
                source={{ uri: profilepic }}
                resizeMode="cover"
                style={{
                  width: 23,
                  height: 23,
                  borderRadius: 13,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ViewController = () => {
  return <TabNavigator />;
};

export default ViewController;
export { setGlobalState, useGlobalState };
