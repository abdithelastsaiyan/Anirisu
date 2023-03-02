import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { safeArea } from "../helpers/Screen";
// Firebase
import { auth } from "../firebase";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
// Navigation
import { useNavigation } from "@react-navigation/native";
// Screens
import Chat from "./Chat";
import Contacts from "./viewModels/Contacs";
// ViewModels
import ChatListElement from "./viewModels/ChatListElement";
// Helpers
import Screen from "../helpers/Screen";
import { Icon } from "react-native-elements";

const ChatRoom = () => {
  //Navigation
  const navigation = useNavigation();

  //Firebase
  const userID = auth.currentUser.uid;
  const database = getFirestore();

  // State Variables
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noChats, setNoChats] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [currentChat, setCurrentChat] = useState();
  const [showContacts, setShowContacts] = useState(false);
  const [chosenContact, setChosenContact] = useState();

  // Functions
  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "users", userID, "chats"),
      (snapshot) => {
        if (snapshot.docs.length > 0) {
          setChats(snapshot.docs.map((doc) => doc));
          setIsLoading(false);
        } else {
          setNoChats(true);
        }
      },
      (error) => {
        console.log("Error fetching chats: " + error.message);
      }
    );
  }, []);

  // View Togglers
  const toggleShowChat = () => {
    setShowChat(!showChat);
  };

  const toggleShowContacts = () => {
    setShowContacts(!showContacts);
  };

  const setChat = (chat) => {
    setShowChat(!showChat);
    setCurrentChat(chat);
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {/* Kontakte Pop Up */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showContacts}
        presentationStyle={"pageSheet"}
        onRequestClose={() => {
          setShowContacts(false);
        }}
      >
        <Contacts toggleView={toggleShowContacts} setChat={setChat} />
      </Modal>
      <SafeAreaView style={[styles.container, safeArea.AndroidSafeArea]}>
        <Text
          style={{
            color: "#3a3a3a",
            fontSize: 28,
            fontWeight: "600",
            marginBottom: 25,
          }}
        >
          Chats
        </Text>
        {chats && !isLoading && (
          <ScrollView style={{ width: "100%" }}>
            {chats.map((chat) => {
              return (
                <ChatListElement
                  key={chat.id}
                  contactID={chat.id}
                  data={chat.data()}
                />
              );
            })}
          </ScrollView>
        )}
        {noChats && isLoading && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#3a3a3a",
                fontSize: 16,
                fontWeight: "300",
                marginBottom: 50,
              }}
            >
              Noch keine Chats vorhanden
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "#d22b2b",
            width: 55,
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            position: "absolute",
            bottom: 20,
            right: 0,
          }}
          onPress={() => {
            setShowContacts(true);
          }}
        >
          <Icon
            name="mark-chat-unread"
            type="MaterialIcons"
            color={"#fff"}
            size={24}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: Screen.width / 1.1,
  },
});

export default ChatRoom;
