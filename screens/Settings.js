import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import { StatusBar } from "expo-status-bar";
// Global State
import { setGlobalState, useGlobalState } from "../ViewController";
// Firebase
import { auth } from '../firebase';
// Navigation
import { useNavigation } from '@react-navigation/native';
// Helpers 
import Screen, { safeArea } from '../helpers/Screen';


const Settings = () => {

    // Navigation
    const navigation = useNavigation()

    // State Variables
    const [darkmode] = useGlobalState('darkmode');
    const [username] = useGlobalState('username');
    const [profilepic] = useGlobalState('profilepic');
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
            <SafeAreaView style={[styles.container, safeArea.AndroidSafeArea]}>
                <View style={{width: Screen.width, marginVertical: 25, alignItems: 'center', flex: 1}}>
                    <Text style={{marginBottom: 35, color: '#3a3a3a', fontSize: 30, fontWeight: '500'}}>{username}</Text>
                    <Image 
                        source={{uri: profilepic}}
                        resizeMode='cover'
                        style={{width: Screen.width / 2, height: Screen.width / 2, borderRadius: 100, marginBottom: 25}}
                    />
                    <Text style={{color: '#3a3a3a', fontWeight: '500', fontSize: 16}}>{email}</Text>
                    <TouchableOpacity 
                        style={{width: Screen.width / 1.3, height: 50, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, backgroundColor: '#3a3a3a', borderRadius: 50}} 
                        onPress={handleSignOut}
                    >
                        <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>Abmelden</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar style={darkmode ? 'light' : 'dark'} />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    }

})

export default Settings

/**
 
                    <View style={{flexDirection: 'row', width: '90%', justifyContent: 'space-around', marginTop: 100}}>
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

 */