import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
// Firebase
import { doc, getFirestore } from "firebase/firestore";
// Navigation
import { useNavigation } from "@react-navigation/native";
// Helpers
import Screen from "../helpers/Screen";

const ProfileView = (ID) => {
  // Firebase
  const database = getFirestore();
  const userRef = doc(database, "users", ID);

  // State Variables
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState();

  // Functions

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profil von</Text>
    </View>
  );
};

export default ProfileView;
