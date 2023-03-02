import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
// Firebase
import { auth } from "../../firebase";
import {
  collection,
  getFirestore,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
// ViewModels
import ContactItem from "./ContactItem";
// Helpers
import Screen from "../../helpers/Screen";
import { Icon } from "react-native-elements";

const Contacts = ({ toggleView, setChat }) => {
  // Firebase
  const db = getFirestore();
  const userID = auth.currentUser.uid;
  const allUsersRef = collection(db, "users");

  // State Variables
  const [contactIDs, setContactsIDs] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [chosenContact, setChosenContact] = useState();
  // --> User Search Variables
  const [showSearchUsers, setShowSearchUsers] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const [filteredUsers, setFilteredUsers] = useState();
  // --> Friends Search Variables
  const [showSearchFriends, setShowSearchFriends] = useState(false);
  const [search, setSearch] = useState(null);

  // Functions
  const fetchContactIDs = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userID, "friends")
    );
    setContactsIDs(querySnapshot.docs.map((doc) => doc.id));
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    if (userID) {
      fetchContactIDs();
    }
  }, []);

  // searchUsers
  useLayoutEffect(() => {
    if (showSearchUsers) {
      setIsLoadingUsers(true);
      onSnapshot(allUsersRef, (snapshot) => {
        setAllUsers(
          snapshot.docs.map((doc) => {
            const id = doc.id;
            const username = doc.data().username;
            const profilepic = doc.data().profilepic;
            return {
              userID: id,
              username: username,
              profilepic: profilepic,
            };
          })
        );
        setIsLoadingUsers(false);
      });
    }
  }, [showSearchUsers]);

  // diese funktion wird der subview übergeben und diese benutzt es

  return (
    <View
      style={{
        flex: 1,
        width: Screen.width,
        alignItems: "center",
        backgroundColor: "#eee",
      }}
    >
      <View
        style={{
          width: "90%",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 25,
        }}
      >
        <TouchableOpacity
          style={{ width: 50, height: 30, justifyContent: "center" }}
        >
          {!showSearchUsers && !showSearchFriends && (
            <Icon name="search" type="feather" color={"#3a3a3a"} size={20} />
          )}
          {showSearchFriends && (
            <Icon name="close" type="evilicons" color={"#3a3a3a"} size={28} />
          )}
        </TouchableOpacity>
        {!showSearchUsers && !showSearchFriends && (
          <Text style={{ fontSize: 26, fontWeight: "600", color: "#3a3a3a" }}>
            Freunde
          </Text>
        )}
        {showSearchUsers && !showSearchFriends && (
          <Text style={{ fontSize: 26, fontWeight: "600", color: "#3a3a3a" }}>
            Suchen
          </Text>
        )}
        {!showSearchUsers && showSearchFriends && (
          <Text style={{ fontSize: 26, fontWeight: "600", color: "#3a3a3a" }}>
            Suchen
          </Text>
        )}
        <TouchableOpacity
          style={{ width: 50, height: 30, justifyContent: "center" }}
          onPress={() => {
            setShowSearchUsers(!showSearchUsers), setShowSearchFriends(false);
          }}
        >
          {!showSearchUsers && !showSearchFriends && (
            <Icon
              name="person-add"
              type="ionicons"
              color={"#3a3a3a"}
              size={26}
            />
          )}
          {showSearchUsers && (
            <Icon name="close" type="evilicons" color={"#3a3a3a"} size={28} />
          )}
        </TouchableOpacity>
      </View>
      {/* First View when Screen opens up */}
      {!showSearchUsers && !showSearchFriends && (
        <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
          <ScrollView style={{ width: "100%" }}>
            {contactIDs && !isLoading && (
              <View style={{ width: "100%", alignItems: "center" }}>
                {contactIDs.map((ID) => {
                  return (
                    <ContactItem
                      key={ID}
                      ID={ID}
                      toggleView={toggleView}
                      setChat={setChat}
                    />
                  );
                })}
              </View>
            )}
          </ScrollView>
          <TouchableOpacity
            onPress={() => toggleView()}
            style={{
              position: "absolute",
              bottom: 75,
              backgroundColor: "#000",
              width: Screen.width / 1.3,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Schließen
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* View if search Users tapped*/}
      {showSearchUsers && !showSearchFriends && (
        <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
          <View
            style={{
              width: Screen.width / 1.1,
              height: 50,
              backgroundColor: "#fff",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 25,
            }}
          >
            <TextInput
              style={{ height: 50, width: "90%" }}
              placeholder="finde neue Freunde"
              placeholderTextColor={"#5a5a5a"}
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
          <ScrollView style={{ width: "100%" }}>
            {allUsers && !isLoadingUsers && (
              <View style={{ width: "100%", alignItems: "center" }}>
                {allUsers.map((user) => {
                  return (
                    <View key={user.userID}>
                      {user.userID !== userID && (
                        <ContactItem
                          ID={user.userID}
                          toggleView={toggleView}
                          setChat={setChat}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Contacts;
