import { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
// Firebase
import { auth } from '../../firebase';
import { doc, getDoc, getFirestore, query, onSnapshot, orderBy, limit, collection, where, getDocs } from "firebase/firestore";
// Navigation
import { useNavigation } from '@react-navigation/native';
// Helpers 
import Screen from '../../helpers/Screen'
import haptic from '../../helpers/Haptics'
// Screens
import Chat from '../Chat';

const ChatListElement = ({contactID, data}) => {

    // Navigation
    const navigation = useNavigation()

    // Firebase
    const userID = auth.currentUser.uid
    const database = getFirestore();
    const docRef = doc(database, "users", contactID);

    // State Variables
    const [contactInfos, setContactInfos] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [lastMessage, setLastMessage] = useState();
    const [isFetchingUnreadCounter, setIsFetchingUnreadCounter] = useState(false)
    const [unreadMessages, setUnreadMessages] = useState(0);

    // Functions
    const fetchContactInfos = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setContactInfos(docSnap.data());
            setIsLoading(false);
        } else {
            console.log("No such document!");
        }
    };

    // looks if there is a new message
    useLayoutEffect(() => {
        const lastMessagesRef = query(collection(database, "chats", data.chatID, "chat"), orderBy("timestamp", "desc"), limit(1));
        const unsubscribe = onSnapshot(lastMessagesRef,
            (snapshot) => {
                if (snapshot.docs.length > 0) {
                    setLastMessage(snapshot.docs.map((doc) => {
                        if((doc.data().UID !== userID)  && (doc.data().read == false)){
                            setIsFetchingUnreadCounter(true)
                        }
                        return {
                            UID: doc.data().UID,
                            message: doc.data().message,
                            time: doc.data().time,
                            read: doc.data().read
                        }
                    }))
                } else {
                    setLastMessage([{
                        message: "Sagt Hi!",
                        time: data.lastMessage.time,
                        read: false,
                        UID: contactID
                    }]);
                }
            },
            (error) => {
                console.log("Error fetching stampcard data: " + error.message);
            }
            );
            return unsubscribe
    }, [])

    // Checks everytime app opens
    useEffect(() => {
        fetchContactInfos();
        if(isFetchingUnreadCounter){
            const unreadMessagesRef = query(collection(database, "chats", data.chatID, "chat"), where("read", "==", false));
            const unsubscribe = onSnapshot(unreadMessagesRef,
                (snapshot) => {
                    setUnreadMessages(snapshot.docs.length)
                    haptic('normal')
                },
                (error) => {
                    console.log("Error fetching stampcard data: " + error.message);
                }
            );
            return unsubscribe    
        }
    }, [isFetchingUnreadCounter]);

    return(
        <TouchableOpacity onPress={() => {navigation.push('Chat', {chatID: data.chatID, profilepic: contactInfos.profilepic, username: contactInfos.username, contactID: contactID}); 
            setUnreadMessages(0); setIsFetchingUnreadCounter(false); haptic('normal')}}
        >
            {contactInfos && !isLoading && (
                <View style={styles.container}>
                    <Image 
                        source={{uri: contactInfos.profilepic}}
                        resizeMode='cover'
                        style={{width: Screen.width / 6, height: Screen.width / 6, borderRadius: 50, marginLeft: 10}}
                    />
                    <View style={{marginLeft: 15, justifyContent: 'center', height: '60%'}}>
                        <Text style={{color: '#3a3a3a', fontWeight: '600', fontSize: 15, marginBottom: 3}}>{contactInfos.username}</Text>
                        <View style={{flexDirection: 'row'}}>
                            {lastMessage[0].UID === userID && <Text style={{color: '#4a4a4a', fontWeight: '300', fontSize: 13}}>Ich: </Text>}
                            <Text style={{color: '#4a4a4a', fontWeight:  !lastMessage[0].read && (lastMessage[0].UID !== userID) ? '700' : '300', fontSize: 13}}>{lastMessage[0].message}</Text>
                        </View>
                    </View>
                    <View style={{position: 'absolute', right: 15, flexDirection: 'row', alignItems: 'center'}}>
                        {unreadMessages !== 0 && (
                            <View style={{marginRight: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f00', width: 20, height: 20, borderRadius: 10}}>
                                <Text style={{color: '#fff', fontSize: 13, fontWeight: '600'}}>{unreadMessages}</Text>
                            </View>
                        )}
                        <Text style={{color: '#4a4a4a', fontSize: 13}}>{lastMessage[0].time}</Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default ChatListElement

const styles = StyleSheet.create({

    container: {
        width: Screen.width / 1.1, 
        height: Screen.width / 5, 
        backgroundColor: '#fff', 
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    }

})