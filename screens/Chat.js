import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, KeyboardAvoidingView, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView} from 'react-native'
// Firebase
import { auth } from '../firebase';
import { getFirestore, collection, onSnapshot, doc, Timestamp, setDoc, getDocs, query, orderBy } from "firebase/firestore";
// Helpers 
import Screen from '../helpers/Screen';
import { Icon } from 'react-native-elements';
import { generateRandomString, generateTime, generateDatestamp } from '../helpers/Utilities'

const Chat = ({data, toggleChatView}) => {

    //Firebase
    const userID = auth.currentUser.uid;
    const database = getFirestore()

    // State Variables
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newMessage, setNewMessage] = useState(null);
    const [noChat, setNoChat] = useState(false);

    const scrollViewRef = React.useRef();

    // Functions
    // Fetch Messages
    useEffect(() => {
        console.log("getting chat...");
        const chat = query(collection(database, "chats", data.chatID, "chat"), orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(
        chat,
        (snapshot) => {
            if (snapshot.docs.length > 0) {
                setMessages(snapshot.docs.map((doc) => doc.data()));
                setIsLoading(false);
            } else {
                setNoChat(true);
            }
        },
        (error) => {
            console.log("Error fetching stampcard data: " + error.message);
        }
        );
        //fetchMessages().catch((err) => console.log(err));
    }, []);

    const fetchMessages = async () => {
        const activitiesRef = query(
          collection(database, "chats", data.chatID, "chat"),
          orderBy("timestamp", "asc")
        );
    
        const querySnapshot = await getDocs(activitiesRef);
        renderData(querySnapshot, setMessages, setIsLoading);
    };

    function renderData(querySnapshot, setState, setLoading) {
        setState(querySnapshot.docs.map((doc) => doc));
        setLoading(false);
    }

    // send message
    const sendMessage = async (message) => {
        if(message !== null){
            const docID = generateRandomString()
            const date = generateDatestamp()
            const time = generateTime()
            const textToSend = message
            setNewMessage(null)
            try {
                await setDoc(doc(database, "chats", data.chatID, "chat", docID), {
                    message: textToSend,
                    UID: userID,
                    timestamp: Timestamp.now(),
                    date: date,
                    time: time
                });
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    return(
        <View style={{flex: 1, width: Screen.width, backgroundColor: '#eee'}}>
            <View style={{width: Screen.width, height: Screen.width / 5, backgroundColor: '#eee', flexDirection: 'row', alignItems: 'center'}}>
                <Image 
                    source={{uri: data.profilepic}}
                    resizeMode='cover'
                    style={{width: Screen.width / 7.5, height: Screen.width / 7.5, marginLeft: 15, borderRadius: 50}}
                />
                <Text style={{color: '#3a3a3a', fontSize: 17, marginLeft: 15, fontWeight: '600'}}>{data.username}</Text>
                <TouchableOpacity style={{position: 'absolute', right: 15}} onPress={toggleChatView}>
                        <Icon 
                            name="chevron-down"
                            type="feather"
                            color={'#3a3a3a'}
                            size={28}
                        />
                </TouchableOpacity>
            </View>
            <SafeAreaView style={{justifyContent: 'space-between', flex: 1}}
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
                    <ScrollView style={{flex: 1, backgroundColor: '#ddd', width: Screen.width}}
                            ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    >
                        <View style={{width: '100%', alignItems: 'center', marginTop: 15, marginBottom: 10}}>
                            {messages.map((message) => {
                                return(
                                    <View key={message.timestamp} style={{width: '90%', justifyContent: message.UID === userID ? 'flex-end' : 'flex-start', flexDirection: 'row', alignItems: 'center'}}>
                                        {message.UID === userID && (
                                            <Text style={{marginRight: 5, color: '#4a4a4a', fontSize: 10}}>{message.time}</Text>
                                        )}
                                        <View style={{padding: 10, backgroundColor: message.UID === userID ? '#d22b2b' : '#808080', marginBottom: 3, borderRadius: 15, maxWidth: '90%'}}>
                                            <Text style={{color: '#fff', fontWeight: '500'}}>{message.message}</Text>
                                        </View>
                                        {message.UID !== userID && (
                                            <Text style={{marginLeft: 5, color: '#4a4a4a', fontSize: 10}}>{message.time}</Text>
                                        )}
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                    <View style={{width: Screen.width /1.1 , height: Screen.width / 6.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{height: Screen.width / 9, width: '85%', backgroundColor: '#fff', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}> 
                            <TextInput 
                                placeholder="  Nachricht"
                                placeholderTextColor={"#5a5a5a"}
                                value={newMessage}
                                onChangeText={(text) => setNewMessage(text)}
                                style={styles.input}
                            />
                        </View>
                        <TouchableOpacity style={{width: Screen.width / 10, height: Screen.width / 10, backgroundColor: '#d22b2b', borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}
                            onPress={() => sendMessage(newMessage)}
                        >
                            <Icon 
                                name='send'
                                type='fontawesome'
                                color={'#eee'}
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
    }
})

export default Chat