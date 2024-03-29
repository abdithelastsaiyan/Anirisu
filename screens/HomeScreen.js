import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
// Firebase
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore";
// Navigation
import { useNavigation } from "@react-navigation/native";
// ViewModels
import NewsletterPost from "./viewModels/NewsletterPost";
// Helpers
import Screen, { safeArea } from "../helpers/Screen";
import { useGlobalState } from "../helpers/globalState";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  // Navigation
  const navigation = useNavigation();

  // Firebase
  const database = getFirestore();

  // State Variables
  const [darkmode] = useGlobalState("darkmode");
  const [news, setNews] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Personal Stuff
  useLayoutEffect(() => {
    const chat = query(
      collection(database, "newsletters"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(
      chat,
      (snapshot) => {
        setNews(snapshot.docs.map((doc) => doc.data()));
        setIsLoading(false);
      },
      (error) => {
        console.log("Error fetching data: " + error.message);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        safeArea.AndroidSafeArea,
        { backgroundColor: darkmode ? "#111" : "#fafafa" },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/logobig.png")}
          resizeMode="contain"
          style={{
            width: Screen.width / 8,
            height: Screen.width / 8,
            tintColor: darkmode ? "#fff" : "#000",
          }}
        />
      </View>
      <View
        style={{
          marginTop: 15,
          width: Screen.width,
          flex: 1,
          backgroundColor: "#f0f0f0",
          alignItems: "center",
        }}
      >
        <FlatList
          data={news}
          renderItem={({ item }) => (
            <NewsletterPost
              key={item.timestamp}
              data={item}
              navigation={navigation}
            />
          )}
          style={{ width: Screen.width }}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default HomeScreen;
