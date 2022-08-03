import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native'
// Firebase
import { doc, getDoc, getFirestore } from "firebase/firestore";
// Helpers 
import Screen from '../../helpers/Screen'
// Screens
import Chat from '../Chat';

const ChatListElement = ({contactID, data, chatOpener}) => {

    // Navigation

    // Firebase
    const database = getFirestore();
    const docRef = doc(database, "users", contactID);

    // State Variables
    const [contactInfos, setContactInfos] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [showChat, setShowChat] = useState(false);

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

    // Checks everytime app opens
    useEffect(() => {
        fetchContactInfos();
    }, []);

    return(
        <TouchableOpacity onPress={() => chatOpener({
            chatID: data.chatID,
            username: contactInfos.username,
            profilepic: contactInfos.profilepic
        })}>
            {contactInfos && !isLoading && (
                <View style={styles.container}>
                    <Image 
                        source={{uri: contactInfos.profilepic}}
                        resizeMode='cover'
                        style={{width: Screen.width / 6, height: Screen.width / 6, borderRadius: 50, marginLeft: 10}}
                    />
                    <View style={{marginLeft: 15, justifyContent: 'center', height: '60%'}}>
                        <Text style={{color: '#3a3a3a', fontWeight: '600', fontSize: 15, marginBottom: 3}}>{contactInfos.username}</Text>
                        <Text style={{color: '#4a4a4a', fontWeight: data.unreadMessages > 0 ? '500' : '300', fontSize: 13}}>{data.lastMessage.text}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 15, flexDirection: 'row', alignItems: 'center'}}>
                        {data.unreadMessages !== 0 && (
                            <View style={{marginRight: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f00', width: 20, height: 20, borderRadius: 10}}>
                                <Text style={{color: '#fff', fontSize: 13, fontWeight: '600'}}>{data.unreadMessages}</Text>
                            </View>
                        )}
                        <Text style={{color: '#4a4a4a', fontSize: 13}}>{data.lastMessage.time}</Text>
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