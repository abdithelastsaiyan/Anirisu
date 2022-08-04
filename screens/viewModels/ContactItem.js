import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
// Firebase
import { doc, getDoc, getFirestore } from "firebase/firestore";
// Helpers
import Screen from '../../helpers/Screen';

const ContactItem = ({ID}) => {
 
    //Firebase
    const db = getFirestore()

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

    // Create Chat --> next Function

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <TouchableOpacity>
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