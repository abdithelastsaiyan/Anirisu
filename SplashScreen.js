import { useEffect } from 'react'
import { Image, View } from 'react-native'
// Firebase Auth
import { auth } from './firebase';
// Navigation
import { useNavigation } from '@react-navigation/native';
// Helpers
import Screen from './helpers/Screen'

const SplashScreen = () => {

    const navigation = useNavigation()

    //Funktionen
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user =>{
            if(user){
                navigation.replace("ViewController")
            }else{
                navigation.replace("LoginScreen")
            }
        })
        return unsubscribe
    }, [])

    return(
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
            <Image 
                source={require('./assets/splash.png')}
                resizeMode='contain'
                style={{width: Screen.width }}
            /> 
        </View>
    )
}

export default SplashScreen