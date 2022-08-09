import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
// Firebase
import { getDoc, getFirestore} from 'firebase/firestore';
// Helpers 
import Screen from '../../helpers/Screen';

const NewsletterPost = ({data, navigation}) => {

    // View State Variables
    const [imageTapped, setImageTapped] = useState(false)

    return (
        <TouchableOpacity 
            activeOpacity={0.75}
            style={styles.container}
        >
            <TouchableOpacity 
                activeOpacity={0.75}
                onPress={() => {navigation.push('AnimeDetails', data.animeID)}}
                style={{flexDirection: 'row', width: '90%', alignItems: 'center'}}
            >
                <Image 
                    source={{uri: data.titlepic}}
                    resizeMode='cover'
                    style={{width: 30, height: 30, borderRadius: 15}}
                />
                <Text style={{color: '#2a2a2a', marginLeft: 10, fontSize: 15, fontWeight: '500'}}>{data.name}</Text>
                <Text style={{color: '#d22b2b', marginLeft: 10, fontSize: 12, fontWeight: '500'}}>NEWS</Text>
            </TouchableOpacity>
            <View style={{width: '85%', height: 1, backgroundColor: '#cdcdcd', marginTop: 10}}/>
            {/* Content */}
            <View style={{marginTop: 10, width: '90%'}}>
                <Text style={{color: '#2a2a2a', fontSize: 18, fontWeight: '500'}}>{data.news}</Text>
            </View>
            {data.image && (
                <TouchableOpacity
                    onPress={() => setImageTapped(!imageTapped)}
                    activeOpacity={0.9}
                    style={{width: '90%', height: Screen.width / 1.2, marginTop: 15}}
                >
                    <Image 
                        source={{uri: data.image}}
                        resizeMode={imageTapped ? 'contain' : 'cover'}
                        style={{height: Screen.width / 1.2, borderRadius: 10}}                
                    />
                </TouchableOpacity>
            )}
            <Text style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 10, color: '#5a5a5a', fontSize: 10, fontWeight: '300'}}>{data.date}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        width: Screen.width / 1.1, 
        alignItems: 'center', 
        backgroundColor: '#dddddd75', 
        marginVertical: 10, 
        borderRadius: 15,
        paddingVertical: 15
    }

})

export default NewsletterPost