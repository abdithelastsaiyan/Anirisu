import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
// Firebase
import { doc, getDoc, getFirestore, Timestamp, setDoc} from "firebase/firestore";
// Helpers
import Screen from '../../helpers/Screen';
import { auth } from '../../firebase';
import { generateTime, generateRandomString } from '../../helpers/Utilities';

const ContactItem = ({ID, toggleView, setChat}) => {
 
    //Firebase
    const db = getFirestore()
    const userID = auth.currentUser.uid

    // State Variables
    const [contactInfos, setContactInfos] = useState();
    const [isLoading, setIsLoading] = useState(true);

    // Functions
    const fetchData = async () => {
        const docRef = doc(db, "users", ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setContactInfos(docSnap.data())
            setIsLoading(false)
        } else {
            console.log("No such document!");
        }
    }

    // createChat > if existing open the existing one
    const createChat = async () => {
        const docRef = doc(db, "users", userID, "chats", ID)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            toggleView(),
            console.log('es gibt schon einen chat mir dieser Person!')
            try {
                setChat()
            } catch (error) {
                console.log('niggaaaa')
                console.log(error)
            }
        } else {
            const chatID = generateRandomString()
            const time = generateTime()
            await setDoc(docRef, {
                chatID: chatID,
                unreadMessages: 0,
                lastMessage: {
                    text: "Sagt Hi!",
                    time: time
                }
            })
            .then(
                await setDoc(doc(db, 'chats', chatID), {
                    opened: Timestamp.now()
                })
            ).then(
                await setDoc(doc(db, "users", ID, "chats", userID), {
                    chatID: chatID,
                    unreadMessages: 0,
                    lastMessage: {
                        text: "Sagt Hi!",
                        time: time
                }
            })
        )            
        toggleView()
        }
    }

    // fetches when view shows up
    useEffect(() => {
        fetchData()
    }, [])

    return(
        <TouchableOpacity onPress={() => createChat()}>
            {contactInfos && !isLoading && (
                <View style={styles.container}>
                    <Image 
                        source={{uri: contactInfos.profilepic}}
                        resizeMode='cover'
                        style={{width: Screen.width / 6, height: Screen.width / 6, borderRadius: 50, marginLeft: 10}}
                    />
                    <View style={{marginLeft: 15, justifyContent: 'center', height: '60%'}}>
                        <Text style={{color: '#3a3a3a', fontWeight: '600', fontSize: 15, marginBottom: 3}}>{contactInfos.username}</Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    )
}

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

export default ContactItem