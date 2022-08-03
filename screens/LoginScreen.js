import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, SafeAreaView } from 'react-native'
// Firebase
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// Navigation
import { useNavigation } from "@react-navigation/native";
// Helpers
import Screen from "../helpers/Screen";
import { LinearGradient } from 'expo-linear-gradient';


const LoginScreen = () => {

    // Navigation
    const navigation = useNavigation();

    // Firebase
    // --> SIGN IN
    const handleLogIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("ALTERRRRR Willkommen zurück!", user.email);
        })
        .catch((err) => setError(err.message));
    };

    //Variablen
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    //Funktionen
    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
        navigation.replace("ViewController");
        }
    });
    return unsubscribe;
    }, []);

    return(
        <View style={{flex: 1, alignItems: 'center'}}>
            <LinearGradient 
              colors={['#b80416', '#470108','#000']}
              style={{ height: Screen.height, width: Screen.width}}
            />
            <SafeAreaView style={{flex: 1, position: 'absolute', alignItems: 'center', marginTop: 100}}>
                <Image 
                    source={require('../assets/logobig.png')}
                    resizeMode='contain'
                    style={{width: Screen.width / 4, height: Screen.width / 4, marginBottom: 5, tintColor: '#fff'}}
                />
                <Text style={{color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 50}}>AniRisu</Text>
                <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color: '#fff', fontSize: 20, fontWeight: '200', marginBottom: 15}}>Melde dich an!</Text>
                    <View style={{width: Screen.width /1.3, height: Screen.width / 1.9, backgroundColor: '#ffffff10', borderRadius: 25, justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>
                            <TextInput
                                placeholder="E-Mail"
                                placeholderTextColor={"#fff"}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                style={[
                                    styles.input,
                                    {
                                    borderBottomColor: error ? "#ff0000a0" : "#fff",
                                    marginTop: 20
                                    },
                                ]}
                                autoCorrect={false}
                                keyboardType="email-address"
                            />
                            <TextInput
                                placeholder="Passwort"
                                placeholderTextColor={"#fff"}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                style={[
                                    styles.input,
                                    {
                                    borderBottomColor: error ? "#ff0000a0" : "#fff",
                                    marginTop: 25
                                    },
                                ]}
                                secureTextEntry
                            />
                            {error !== null && (
                                <Text
                                    style={{
                                    color: "#ff0000a0",
                                    width: Screen.width / 1.4,
                                    marginTop: 15,
                                    textAlign: "center",
                                    }}
                                >
                                    Die Eingabe war nicht korrekt! Bitte achten sie ob Email und
                                    Passwort korrekt sind!
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity style={{height: 50, width: Screen.width /1.3, borderRadius: 25, backgroundColor: '#fff', justifyContent: 'center', alignItems:'center'}}
                            onPress={handleLogIn}
                        >
                            <Text style={{color: '#470108', fontSize: 16, fontWeight: '600'}}>Anmelden</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{color: '#fff', fontSize: 20, fontWeight: '200', marginTop: 50}}>oder</Text>
                </View>
            </SafeAreaView>
            <View style={{position: 'absolute', alignItems: 'center', bottom: 75}}>

                <TouchableOpacity style={{backgroundColor: '#5c020b', width: Screen.width / 1.3, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 15}}>
                    <Text style={{fontSize: 17, fontWeight: '600', color: '#fff', position: 'absolute'}}>Mit Google anmelden</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#fff', width: Screen.width / 1.3, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 17, fontWeight: '600', color: '#470108'}}>Registrieren</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        paddingVertical: 10,
        marginTop: 15,
        borderBottomWidth: 1.1,
        fontWeight: "400",
        color: '#fff'
    },
})

export default LoginScreen