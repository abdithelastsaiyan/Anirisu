import React, {useEffect,useState} from 'react';
import { View, Text, Image, KeyboardAvoidingView, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Platform} from 'react-native'
// Firebase
import { auth } from '../firebase';
import { getFirestore, collection, onSnapshot, doc, Timestamp, setDoc, getDocs, query, orderBy } from "firebase/firestore";
// Helpers 
import Screen from '../helpers/Screen';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { generateRandomString, generateTime, generateDatestamp } from '../helpers/Utilities'

const Chat = ({data}) => {

    //Firebase
    const userID = auth.currentUser.uid;
    const database = getFirestore()

    // State Variables
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newMessage, setNewMessage] = useState();
    const [noChat, setNoChat] = useState(false);

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
        const docID = generateRandomString()
        const date = generateDatestamp()
        const time = generateTime()
        try {
            await setDoc(doc(database, "chats", data.chatID, "chat", docID), {
                message: message,
                UID: userID,
                timestamp: Timestamp.now(),
                date: date,
                time: time
            });
            setNewMessage()
        } catch (error) {
            console.log(error.message);
        }
    };

    return(
        <View style={{flex: 1, width: Screen.width, backgroundColor: '#eee'}}>
            <View style={{width: Screen.width, height: Screen.width / 5, backgroundColor: '#00000010', flexDirection: 'row', alignItems: 'center'}}>
                <Image 
                    source={{uri: data.profilepic}}
                    resizeMode='cover'
                    style={{width: Screen.width / 7.5, height: Screen.width / 7.5, marginLeft: 15, borderRadius: 50}}
                />
                <Text style={{color: '#3a3a3a', fontSize: 17, marginLeft: 15, fontWeight: '600'}}>{data.username}</Text>
            </View>
            <SafeAreaView style={{justifyContent: 'space-between', flex: 1}}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
                    <ScrollView style={{flex: 1, backgroundColor: '#00000020', width: Screen.width}}>
                        <View style={{width: '100%', alignItems: 'center', marginTop: 15}}>
                            {messages.map((message) => {
                                return(
                                    <View key={message.timestamp} style={{width: '90%', alignItems: message.UID === userID ? 'flex-end' : 'flex-start'}}>
                                        <View style={{padding: 10, backgroundColor: message.UID === userID ? '#d22b2b' : '#808080', marginBottom: 3, borderRadius: 15}}>
                                            <Text style={{color: '#fff', fontWeight: '500'}}>{message.message}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                    <View style={{width: Screen.width /1.1 , height: Screen.width / 6, backgroundColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{height: Screen.width / 8.5, width: '82%', backgroundColor: '#00000020', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}> 
                            <TextInput 
                                placeholder="  Nachricht"
                                placeholderTextColor={"#fff"}
                                value={newMessage}
                                onChangeText={(text) => setNewMessage(text)}
                                style={styles.input}
                            />
                        </View>
                        <TouchableOpacity style={{width: Screen.width / 9, height: Screen.width / 9, backgroundColor: '#f00', borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}
                            onPress={() => sendMessage(newMessage)}
                        >
                            <Icon 
                                name='send'
                                type='fontawesome'
                                color={'#eee'}
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