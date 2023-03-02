import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
// Firebase
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
// Navigation
import { useNavigation } from "@react-navigation/native";
// Helpers
import Screen, { safeArea } from "../helpers/Screen";
// ViewModels
import AnimeListElement from "./viewModels/AnimeListElement";
import haptic from "../helpers/Haptics";

const AnimeSearch = () => {
  // Navigation
  const navigation = useNavigation();

  // Firebase
  const database = getFirestore();
  const animeQuery = query(collection(database, "animes"), orderBy("name"));
  // Firestore Data
  const [animes, setAnimes] = useState();

  // State Variables
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState();

  // Functions
  const fetchData = async () => {
    const querySnapshot = await getDocs(animeQuery);
    setAnimes(querySnapshot.docs.map((doc) => doc));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View
      style={[
        safeArea.AndroidAndIOSSafeArea,
        { flex: 1, alignItems: "center", width: Screen.width },
      ]}
    >
      <Text
        style={{
          color: "#3a3a3a",
          fontSize: 28,
          fontWeight: "600",
          marginBottom: 20,
        }}
      >
        Suche
      </Text>
      <View
        style={{
          width: Screen.width / 1.1,
          height: 50,
          backgroundColor: "#ddd",
          borderRadius: 25,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <TextInput
          style={{ height: 50, width: "90%" }}
          placeholder="finde deinen Anime"
          placeholderTextColor={"#5a5a5a"}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View style={{ width: Screen.width, flex: 1 }}>
        {animes && !isLoading && (
          <FlatList
            data={animes}
            renderItem={({ item }) => (
              <AnimeListElement
                key={item.id}
                ID={item.id}
                data={item.data()}
                navigation={navigation}
                onPressHandler={() => {
                  navigation.push("AnimeDetails", item.id);
                  haptic("normal");
                }}
              />
            )}
            style={{ width: Screen.width }}
            contentContainerStyle={{ alignItems: "center" }}
          />
        )}
      </View>
    </View>
  );
};

export default AnimeSearch;
