import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
// Firebase
import { auth } from '../../firebase';
import {
    collection,
    getFirestore,
    doc,
    setDoc,
    getDocs,
} from "firebase/firestore";
// ViewModels
import ContactItem from './ContactItem';
// Helpers
import Screen from '../../helpers/Screen';

const Contacts = ({toggleView, setChat}) => {

    // Firebase
    const db = getFirestore();
    const userID = auth.currentUser.uid;

    // State Variables
    const [contactIDs, setContactsIDs] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [chosenContact, setChosenContact] = useState();


    // Functions
    const fetchContactIDs = async () => {
        const querySnapshot = await getDocs(collection(db, "users", userID, "friends"));
        setContactsIDs(querySnapshot.docs.map((doc) => doc.id))
        setIsLoading(false)
    }

    useEffect(() => {
        if (userID) {
            fetchContactIDs()
        }
    }, []);

    // diese funktion wird der subview übergeben und diese benutzt es


    return(
        <View style={{flex: 1, width: Screen.width, alignItems: 'center', backgroundColor: '#eee'}}>
            <Text style={{marginVertical: 25, fontSize: 26, fontWeight: '600', color: '#3a3a3a'}}>Freunde</Text>
            <View style={{width: '100%', flex:1, alignItems: 'center'}}>
                <ScrollView style={{width: '100%'}}>
                    {contactIDs && !isLoading && (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            {contactIDs.map((ID) => {
                                return(
                                    <ContactItem key={ID} ID={ID} toggleView={toggleView} setChat={setChat}/>
                                )
                            })}
                            <TouchableOpacity onPress={() => toggleView()}>
                                <Text>close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    )
}

export default Contacts