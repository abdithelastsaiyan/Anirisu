import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, ScrollView } from 'react-native'
import { safeArea } from '../helpers/Screen';
// Firebase
import { auth } from "../firebase";
import { getFirestore, collection, onSnapshot, doc } from "firebase/firestore";
// Screens
import Chat from './Chat';
// ViewModels
import ChatListElement from './viewModels/ChatListElement';

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

    // Functions
    useEffect(() => {
        console.log("getting chats...");
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
            console.log("Error fetching stampcard data: " + error.message);
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

    return(
        <View style={styles.container}>
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
            <SafeAreaView style={[styles.container, safeArea.AndroidSafeArea]}>
                <Text style={{color: '#3a3a3a', fontSize: 28, fontWeight: '600', marginBottom: 25}}>Chats</Text>
                {chats && !isLoading && (
                    <ScrollView style={{width: '100%'}}>
                        {chats.map((chat) => {
                            return(
                                <ChatListElement key={chat.id} contactID={chat.id} data={chat.data()} chatOpener={setChat}/>
                            )
                        })}
                    </ScrollView>
                )}
                {noChats && isLoading && (
                    <Text style={{color: '#3a3a3a', fontSize: 16, fontWeight: '300', marginTop: 100}}>Noch keine Chats vorhanden!</Text>
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