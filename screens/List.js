import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
// Firebase
import { auth } from '../firebase';
import { getFirestore, query, collection, getDocs, orderBy, onSnapshot } from 'firebase/firestore';
// Navigation
import { useNavigation } from '@react-navigation/native';
// ViewModels
import AnimeListElement from './viewModels/AnimeListElement';
// Helpers
import Screen, { safeArea } from '../helpers/Screen';
import { Icon } from 'react-native-elements';
import haptic from '../helpers/Haptics';


const List = () => {
    
    // Firebase
    const userID = auth.currentUser.uid
    const database = getFirestore()
    // Data fetched
    const [animeList, setAnimeList] = useState()

    // Navigation
    const navigation = useNavigation()

    // State Variables
    const [showWatchList, setShowWatchList] = useState(false)
    const [isLoadingList, setIsLoadingList] = useState(true)

    // Functions
    useLayoutEffect(() => {
        const q = query(collection(database, "users", userID, "animelist"), orderBy("lastupdated", "desc"));
        const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
            setAnimeList(snapshot.docs.map((doc) => doc));
            setIsLoadingList(false);
        },
        (error) => {
            console.log("Error fetching data: " + error.message);
        }
        );
        return unsubscribe
    }, []);

    return(
        <View style={styles.container}>
            <SafeAreaView style={[styles.container, safeArea.AndroidSafeArea]}>
                {/* Header Buttons */}
                <View style={{width: Screen.width / 1.2, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                    <TouchableOpacity>
                        <Icon 
                            name='sort'
                            type='materialicons'
                            color={'#3a3a3a'}
                            size={20}
                        />
                    </TouchableOpacity>
                    <Text style={{color: '#3a3a3a', fontSize: 28, fontWeight: '600'}}>Deine Listen</Text>
                    <TouchableOpacity onPress={() => {navigation.navigate('AnimeSearch')}}>
                        <Icon 
                            name="search"
                            type="feather"
                            color={'#3a3a3a'}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                {/* Switch Lists */}
                <View style={{flexDirection: 'row', width: Screen.width / 1.1, height: 55, backgroundColor: '#ccc', borderRadius: 30, alignItems: 'center', justifyContent: 'space-around', marginBottom: 15}}>
                    <TouchableOpacity 
                        onPress={() => {setShowWatchList(true); haptic('normal')}}
                        style={{width: '49%', height: 52, backgroundColor: showWatchList ? '#fff' : '#d0d0d0', borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Text style={{color: showWatchList ? '#d22b2b' : '#fff', fontSize: 16, fontWeight: '600'}}>Watchlist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {setShowWatchList(false); haptic('normal')}}
                        style={{width: '49%', height: 52, backgroundColor: showWatchList ? '#d0d0d0' : '#fff', borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Text style={{color: showWatchList ? '#fff' : '#d22b2b', fontSize: 16, fontWeight: '600'}}>Meine Liste</Text>
                    </TouchableOpacity>
                </View>
                {/* List Elements */}
                {!showWatchList && animeList && !isLoadingList && (
                    <FlatList
                        data={animeList}
                        renderItem={({ item }) => (
                            <AnimeListElement key={item.id} ID={item.id} data={item.data()} navigation={navigation}/>
                        )}
                        style={{width: Screen.width}}
                        contentContainerStyle={{alignItems: 'center'}}
                    />
                )}
                {showWatchList && (
                    <View style={{flex: 1, justifyContent: 'center', marginBottom: 50}}>
                        <Text style={{color: '#3a3a3a', fontSize: 20, fontWeight: '300'}}>Deine Watchlist ist leer</Text>
                    </View>
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

export default List