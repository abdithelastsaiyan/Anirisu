import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
// Firebase
import { getFirestore, getDoc, doc } from "firebase/firestore";
// Helpers
import Screen from "../../helpers/Screen";

const AnimeListElement = ({ ID, data, onPressHandler }) => {
  // Firebase
  const database = getFirestore();
  const docRef = doc(database, "animes", ID);
  // Data fetched
  const [docData, setDocData] = useState();

  // State Variables
  const [isLoading, setIsLoading] = useState(true);

  // Functions
  const fetchData = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDocData(docSnap.data());
      setIsLoading(false);
    } else {
      console.log("hat nicht geklappt diesen anime zu holen!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={{
        width: Screen.width / 1.1,
        height: Screen.width / 2.8,
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 15,
      }}
    >
      {docData && !isLoading && (
        <View
          style={{
            width: Screen.width / 1.1,
            height: Screen.width / 2.8,
            backgroundColor: `${docData.color}35`,
            marginBottom: 10,
            borderRadius: 15,
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: docData.cover }}
            resizeMode="cover"
            style={{
              width: "30%",
              height: "100%",
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            }}
          />
          <View
            style={{
              width: "70%",
              height: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Text
              style={{
                color: "#2a2a2a",
                fontSize: 18,
                fontWeight: "500",
                marginLeft: 10,
              }}
            >
              {data.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                height: 55,
                alignSelf: "center",
                width: "92%",
                marginHorizontal: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  width: "31%",
                }}
              >
                <Text style={{ color: "#3a3a3a", fontSize: 12 }}>Seasons</Text>
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "#000" }}
                  >
                    {docData.seasons}
                  </Text>
                  <Text
                    style={{
                      position: "absolute",
                      fontSize: 18,
                      fontWeight: "500",
                      color: `${docData.color}80`,
                    }}
                  >
                    {docData.seasons}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  width: "31%",
                }}
              >
                <Text style={{ color: "#3a3a3a", fontSize: 12 }}>Episoden</Text>
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "#000" }}
                  >
                    {docData.episodes}
                  </Text>
                  <Text
                    style={{
                      position: "absolute",
                      fontSize: 18,
                      fontWeight: "500",
                      color: `${docData.color}80`,
                    }}
                  >
                    {docData.episodes}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  width: "31%",
                }}
              >
                <Text style={{ color: "#3a3a3a", fontSize: 12 }}>Rating</Text>
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "#000" }}
                  >
                    {docData.rating}
                  </Text>
                  <Text
                    style={{
                      position: "absolute",
                      fontSize: 18,
                      fontWeight: "500",
                      color: `${docData.color}80`,
                    }}
                  >
                    {docData.rating}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginLeft: 10 }}>
              {docData.genre.map((genre) => {
                return (
                  <View
                    key={genre}
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      marginRight: 5,
                    }}
                  >
                    <Text style={{ fontSize: 10, color: docData.color }}>
                      {genre}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AnimeListElement;
