import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
// Firebase
import { auth } from "../firebase";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  Timestamp,
  setDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
// Navigation
import { useNavigation } from "@react-navigation/native";
// Helpers
import Screen, { safeArea } from "../helpers/Screen";
import { Icon } from "react-native-elements";
import {
  generateRandomString,
  generateTime,
  generateDatestamp,
} from "../helpers/Utilities";

const Chat = (data) => {
  // Navigation
  const navigation = useNavigation();
  const chatData = data.route.params;

  //Firebase
  const userID = auth.currentUser.uid;
  const database = getFirestore();

  // State Variables
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState(null);
  const [noChat, setNoChat] = useState(false);

  const scrollViewRef = React.useRef();

  // Functions
  // Fetch Messages
  useLayoutEffect(() => {
    const chat = query(
      collection(database, "chats", chatData.chatID, "chat"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(
      chat,
      (snapshot) => {
        if (snapshot.docs.length > 0) {
          setMessages(
            snapshot.docs.map((doc) => {
              const messageID = doc.id;
              const messageData = doc.data();
              if (messageData.UID !== userID && messageData.read === false) {
                markMessageRead(messageID);
              }
              return {
                UID: messageData.UID,
                date: messageData.date,
                message: messageData.message,
                time: messageData.time,
                timestamp: messageData.timestamp,
                read: true,
              };
            })
          );
          setIsLoading(false);
        } else {
          setNoChat(true);
        }
      },
      (error) => {
        console.log("Error fetching stampcard data: " + error.message);
      }
    );
    return unsubscribe;
  }, []);

  // send message
  const sendMessage = async (message) => {
    if (message !== null) {
      const docID = generateRandomString();
      const date = generateDatestamp();
      const time = generateTime();
      const textToSend = message;
      setNewMessage(null);
      try {
        await setDoc(doc(database, "chats", chatData.chatID, "chat", docID), {
          message: textToSend,
          UID: userID,
          timestamp: Timestamp.now(),
          date: date,
          time: time,
          read: false,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // Mark Message as Read
  const markMessageRead = async (messageID) => {
    const messageRef = doc(
      database,
      "chats",
      chatData.chatID,
      "chat",
      messageID
    );
    try {
      updateDoc(messageRef, {
        read: true,
      });
    } catch (error) {
      console.log("es gab einen fehler beim markieren von read");
    }
  };

  return (
    <SafeAreaView
      style={[
        safeArea.AndroidSafeArea,
        { flex: 1, width: Screen.width, backgroundColor: "#eee" },
      ]}
    >
      <View
        style={[
          {
            width: Screen.width,
            height: Screen.width / 7,
            backgroundColor: "#eee",
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity style={{ marginLeft: 15 }}>
          <Icon
            name="chevron-down"
            type="feather"
            color={"#3a3a3a"}
            size={28}
          />
        </TouchableOpacity>
        <Image
          source={{ uri: chatData.profilepic }}
          resizeMode="cover"
          style={{
            width: Screen.width / 10,
            height: Screen.width / 10,
            marginLeft: 15,
            borderRadius: 50,
          }}
        />
        <Text
          style={{
            color: "#3a3a3a",
            fontSize: 17,
            marginLeft: 12,
            fontWeight: "600",
          }}
        >
          {chatData.username}
        </Text>
      </View>
      <KeyboardAvoidingView style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flex: 1, width: Screen.width }}>
          <Image
            source={require("../assets/images/chatbackground.jpeg")}
            resizeMode="cover"
            style={{ width: Screen.width, height: "100%" }}
          />
          <ScrollView
            style={{
              height: "100%",
              backgroundColor: "#ffffff80",
              width: Screen.width,
              position: "absolute",
              left: 0,
              top: 0,
            }}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              {messages.map((message) => {
                return (
                  <View
                    key={message.timestamp}
                    style={{
                      width: "90%",
                      justifyContent:
                        message.UID === userID ? "flex-end" : "flex-start",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {message.UID === userID && (
                      <Text
                        style={{
                          marginRight: 5,
                          color: "#3a3a3a",
                          fontSize: 10,
                        }}
                      >
                        {message.time}
                      </Text>
                    )}
                    <View
                      style={{
                        padding: 10,
                        backgroundColor:
                          message.UID === userID ? "#d22b2b" : "#606060",
                        marginBottom: 3,
                        borderRadius: 15,
                        maxWidth: "90%",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "500" }}>
                        {message.message}
                      </Text>
                    </View>
                    {message.UID !== userID && (
                      <Text
                        style={{
                          marginLeft: 5,
                          color: "#4a4a4a",
                          fontSize: 10,
                        }}
                      >
                        {message.time}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <KeyboardAvoidingView
          style={{
            width: Screen.width / 1.1,
            height: Screen.width / 6.5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              height: Screen.width / 9,
              width: "85%",
              backgroundColor: "#fff",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="  Nachricht"
              placeholderTextColor={"#5a5a5a"}
              value={newMessage}
              onChangeText={(text) => setNewMessage(text)}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={{
              width: Screen.width / 10,
              height: Screen.width / 10,
              backgroundColor: "#d22b2b",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => sendMessage(newMessage)}
          >
            <Icon name="send" type="fontawesome" color={"#eee"} size={20} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
  },
});

export default Chat;
