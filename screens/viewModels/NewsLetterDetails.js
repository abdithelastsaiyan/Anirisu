import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
// Navigation
import { useNavigation } from "@react-navigation/native";
// Helpers
import Screen from "../../helpers/Screen";
import { LinearGradient } from "expo-linear-gradient";
import haptic from "../../helpers/Haptics";

const NewsLetterDetails = (data) => {
  // Navigation
  const navigation = useNavigation();

  // State Variables
  const news = data.route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#efefef" }}>
      <ScrollView>
        <View style={{ width: Screen.width, height: Screen.width / 1.3 }}>
          <Image
            source={{ uri: news.image }}
            resizeMode="cover"
            style={{ width: Screen.width, height: Screen.width / 1.3 }}
          />
          <LinearGradient
            colors={["#efefef", "#efefef00"]}
            style={{
              flex: 1,
              position: "absolute",
              width: Screen.width,
              height: Screen.width / 4,
            }}
          />
        </View>
        <View style={{ width: Screen.width, flex: 1 }}>
          <Text
            style={{
              marginTop: 15,
              marginLeft: 15,
              fontWeight: "600",
              fontSize: 13,
              color: "#d22b2b",
            }}
          >
            NEWS
          </Text>
          <Text
            style={{
              marginHorizontal: 15,
              fontSize: 20,
              marginTop: 10,
              fontWeight: "600",
            }}
          >
            {news.news}
          </Text>
          <Text
            style={{
              marginHorizontal: 15,
              fontSize: 10,
              marginTop: 10,
              fontWeight: "300",
              color: "#3a3a3a",
            }}
          >
            {news.date}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push("AnimeDetails", news.animeID);
              haptic("normal");
            }}
            style={{
              width: Screen.width,
              flexDirection: "row",
              height: 40,
              alignItems: "center",
              marginTop: 15,
              paddingHorizontal: 15,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: news.titlepic }}
                resizeMode="cover"
                style={{ width: 35, height: 35, borderRadius: 20 }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  color: "#3a3a3a",
                  fontWeight: "500",
                  fontSize: 15,
                }}
              >
                {news.name}
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={{ color: "#4a4a4a", fontSize: 12 }}>
                by {news.publisherName}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <Text
            style={{
              marginVertical: 20,
              paddingHorizontal: 15,
              marginBottom: 100,
              color: "#3a3a3a",
              lineHeight: 22,
            }}
          >
            {news.article}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewsLetterDetails;
