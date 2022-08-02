import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
// Helpers 
import Screen, { safeArea } from '../helpers/Screen'
import { useGlobalState } from '../ViewController';

const HomeScreen = () => {

    // View Variables
    const [darkmode] = useGlobalState('darkmode')

    return(
        <SafeAreaView style={[styles.container, safeArea.AndroidSafeArea, {backgroundColor: darkmode ? '#111' : '#fafafa'}]}>
            <Image 
                source={require('../assets/logobig.png')}
                resizeMode='contain'
                style={{width: Screen.width / 8, height: Screen.width / 8, tintColor: darkmode ? '#fff' : '#000'}}
            />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
    }

})

export default HomeScreen