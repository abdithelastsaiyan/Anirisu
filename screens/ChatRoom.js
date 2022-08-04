import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, ScrollView, TouchableOpacity } from 'react-native'
import { safeArea } from '../helpers/Screen';
// Firebase
import { auth } from "../firebase";
import { getFirestore, collection, onSnapshot, doc } from "firebase/firestore";
// Screens
import Chat from './Chat';
import Contacts from './viewModels/Contacs';
// ViewModels
import ChatListElement from './viewModels/ChatListElement';
// Helpers
import Screen from '../helpers/Screen';

const ChatRoom = () => {

    //Navigation
    //const navigation = useNavigation();

    //Firebase
    const userID = auth.currentUser.uid;
    const database = getFirestore()

    // State Variables
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [noChats, setNoChats] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [currentChat, setCurrentChat] = useState()
    const [showContacts, setShowContacts] = useState(false);
    const [chosenContact, setChosenContact] = useState()

    // Functions
    useEffect(() => {
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

    const toggleShowChat = () => {
        setShowChat(!showChat);
    };

    const setChat = (chat) => {
        setShowChat(!showChat);
        setCurrentChat(chat);
    };

    const chooseContact = (contactID) => {
        setShowContacts(!showContacts);
        setChosenContact(contactID)
        if(contactID){

        }else{
            console.log("hier muss eig die richtige ausführung hin")
        }
    }

    return(
        <View style={styles.container}>
            {/* Chat Pop Up */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={showChat}
                presentationStyle={"pageSheet"}
                onRequestClose={() => {
                    setShowChat(false);
                }}
            >
                <Chat data={currentChat}/>
            </Modal>
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
                <Contacts chooser={chooseContact}/>
            </Modal>
            <SafeAreaView style={[styles.container, safeArea.AndroidSafeArea]}>
                <Text style={{color: '#3a3a3a', fontSize: 28, fontWeight: '600', marginBottom: 25}}>Chats</Text>
                {chats && !isLoading && (
                    <ScrollView style={{width: '100%'}}>
                        {chats.map((chat) => {
                            return(
                                <ChatListElement key={chat.id} contactID={chat.id} data={chat.data()} chatOpener={setChat}/>
                            )
                        })}
                        <View style={{width: '100%', alignItems: 'center', marginTop: 35}}>
                            <TouchableOpacity style={{backgroundColor: '#d22b2b', width: Screen.width / 1.7, height: 55, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}
                                onPress={() => {setShowContacts(true)}}
                            >
                                <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>Neuen Chat beginnen!</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
                {noChats && isLoading && (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={{color: '#3a3a3a', fontSize: 16, fontWeight: '300', marginTop: 100}}>Noch keine Chats vorhanden!</Text>
                        <View style={{width: '100%', alignItems: 'center', marginTop: 35}}>
                            <TouchableOpacity style={{backgroundColor: '#d22b2b', width: Screen.width / 1.7, height: 55, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}
                                onPress={() => {setShowContacts(true)}}
                            >
                                <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>Neuen Chat beginnen!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
    }

})

export default ChatRoom