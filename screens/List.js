import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
// Helpers
import Screen, { safeArea } from '../helpers/Screen';
import { Icon } from 'react-native-elements';
import haptic from '../helpers/Haptics';

const List = () => {

    // State Variables
    const [showMyList, setShowMyList] = useState(false)

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
                    <TouchableOpacity>
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
                        onPress={() => {setShowMyList(true); haptic('normal')}}
                        style={{width: '49%', height: 52, backgroundColor: showMyList ? '#fff' : '#d0d0d0', borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Text style={{color: showMyList ? '#d22b2b' : '#fff', fontSize: 16, fontWeight: '600'}}>Watchlist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {setShowMyList(false); haptic('normal')}}
                        style={{width: '49%', height: 52, backgroundColor: showMyList ? '#d0d0d0' : '#fff', borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Text style={{color: showMyList ? '#fff' : '#d22b2b', fontSize: 16, fontWeight: '600'}}>Meine Liste</Text>
                    </TouchableOpacity>
                </View>
                {/* List Elements */}
                <FlatList 

                />
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