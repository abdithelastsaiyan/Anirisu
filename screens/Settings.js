import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { StatusBar } from "expo-status-bar";
// Global State
import { setGlobalState, useGlobalState } from "../ViewController";
// Firebase
import { auth } from '../firebase';
// Navigation
import { useNavigation } from '@react-navigation/native';
// Helpers 

const Settings = () => {

    // Navigation
    const navigation = useNavigation()

    // State Variables
    const [darkmode] = useGlobalState('darkmode');
    const email = auth.currentUser.email

    // -> MARK: ABMELDEN
    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("LoginScreen");
        })
        .catch((error) => alert(error.message));
    };

    return(
        <View style={[styles.container, { backgroundColor: darkmode ? '#111' : '#fafafa'}]}>
            <View style={{flexDirection: 'row', width: '90%', justifyContent: 'space-around'}}>
                <TouchableOpacity 
                    style={{padding: 20, backgroundColor: '#fff', borderRadius: 100}}
                    onPress={() => {setGlobalState('darkmode', false)}}
                >
                    <Text style={{color: '#000'}}>Light</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{padding: 20, backgroundColor: '#000', borderRadius: 100}}
                    onPress={() => {setGlobalState('darkmode', true)}}
                >
                    <Text style={{color: '#fff'}}>Dark</Text>
                </TouchableOpacity>
            </View>
            <Text>{email}</Text>
            <TouchableOpacity onPress={handleSignOut}>
                <Text>Abmelden</Text>
            </TouchableOpacity>
            <StatusBar style={darkmode ? 'light' : 'dark'} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }

})

export default Settings