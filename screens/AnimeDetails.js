import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
// Firebase
import { getFirestore, doc, getDoc } from 'firebase/firestore';
// Helpers
import Screen from '../helpers/Screen';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';

const AnimeDetails = (animeID) => {

    // Firebase
    const database = getFirestore()
    const anime = doc(database, "animes", animeID.route.params)

    // State Variables
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    // Funktionen
    const fetchData = async () => {
        const docSnap = await getDoc(anime)
        if (docSnap.exists()) {
            setData(docSnap.data())
            setIsLoading(false)
        } else {
            console.log("Es gab probleme beim holen des Anime!");
        }
    }
 
    useEffect(() => {
        fetchData()
    }, [])

    return(
        <View style={styles.container}>
            {data && !isLoading && (
                <View style={[styles.container, {backgroundColor: `${data.color}15`}]}>
                    <View>
                        <Image
                            source={{uri: data.titlecover}}
                            resizeMode='cover'
                            style={{width: Screen.width, height: Screen.width / 1.6}}
                        />
                        <LinearGradient 
                            colors={['#fff', '#ffffff00']}
                            style={{flex: 1, position: 'absolute', width: Screen.width, height: Screen.width / 3}}
                        />
                    </View>
                    <View style={{width: Screen.width, flexDirection: 'row', marginBottom: 25}}>
                        <View style={{
                            position: 'absolute', 
                            top: -Screen.width / 6, 
                            left: 15, 
                            shadowColor: "#999",
                            shadowOffset: {
                            width: 0,
                            height: 0,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 4,
                            elevation: 2
                        }}>
                            <Image 
                                source={{uri: data.cover}}
                                resizeMode='cover'
                                style={{width: (Screen.width / 2.5) / 1.5, height: Screen.width / 2.5, borderRadius: 10}}
                            />
                        </View>
                        <View style={{marginLeft: (Screen.width / 2.5) / 1.2, marginTop: 10, flex: 1}}>
                            <Text style={{ color: '#3a3a3a', fontSize: 22, fontWeight: '500'}}>{data.name}</Text>
                            <Text style={{marginTop: 5, color: '#3a3a3a', fontSize: 12}}>Genres:</Text>
                            <View style={{flexDirection: 'row', marginTop: 10, width: '90%'}}>
                                {data.genre.map((genre) => {
                                    return(
                                        <TouchableOpacity style={{marginRight: 5, backgroundColor: '#fff', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 5}}>
                                            <Text style={{color: '#3a3a3a', fontWeight: '500', fontSize: 12}}>{genre}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                    <View style={{width:'90%', alignItems: 'center', marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity style={{width: '47%', alignItems: 'center', justifyContent: 'center', backgroundColor: data.color, height: 45, borderRadius: 25, flexDirection: 'row'}}>
                            <Icon 
                                name='add-to-list'
                                type='entypo'
                                color={'#eee'}
                                size={20}
                            />
                            <Text style={{color: '#fff', fontSize: 15, fontWeight: '500', marginLeft: 10}}>Zur Liste</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '47%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', height: 45, borderRadius: 25, flexDirection: 'row'}}>
                            <Icon 
                                name='share'
                                type='entypo'
                                color={data.color}
                                size={20}
                            />
                            <Text style={{color: data.color, fontSize: 15, fontWeight: '500', marginLeft: 10}}>Teilen</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '90%', flex: 1}}>
                        <Text style={{color: '#3a3a3a', fontSize: 13, marginBottom: 15}}>{data.description}</Text>
                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{alignItems: 'center', width: Screen.width / 4, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 15}}>
                                <View>
                                    <Text style={{color: '#000'}}>Seasons</Text>
                                    <Text style={{position: 'absolute', color: `${data.color}90`}}>Seasons</Text>
                                </View>
                                <View>
                                    <Text style={{color: '#000', fontSize: 20, fontWeight: '500', marginTop: 5}}>{data.seasons}</Text>
                                    <Text style={{position: 'absolute', color: `${data.color}dd`, fontSize: 20, fontWeight: '500', marginTop: 5}}>{data.seasons}</Text>
                                </View>
                            </View>
                            <View style={{alignItems: 'center', width: Screen.width / 4, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 15}}>
                                <View>
                                    <Text style={{color: '#000'}}>Episoden</Text>
                                    <Text style={{position: 'absolute', color: `${data.color}90`}}>Episoden</Text>
                                </View>
                                <View>
                                    <Text style={{color: '#000', fontSize: 20, fontWeight: '500', marginTop: 5}}>{data.episodes}</Text>
                                    <Text style={{position: 'absolute', color: `${data.color}dd`, fontSize: 20, fontWeight: '500', marginTop: 5}}>{data.episodes}</Text>
                                </View>
                            </View>
                            <View style={{alignItems: 'center', width: Screen.width / 4, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 15}}>
                                <View>
                                    <Text style={{color: '#000'}}>Rating</Text>
                                    <Text style={{position: 'absolute', color: `${data.color}90`}}>Rating</Text>
                                </View>
                                <View>
                                    <Text style={{color: '#000', fontSize: 20, fontWeight: '500', marginTop: 5}}>{data.rating}</Text>
                                    <Text style={{position: 'absolute', color: `${data.color}dd`, fontSize: 20, fontWeight: '500', marginTop: 5}}>{data.rating}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: Screen.width,
        flex: 1,
        alignItems: 'center',
    }

})

export default AnimeDetails