import React from 'react';
import { View, Text, Image, KeyboardAvoidingView, SafeAreaView, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
// Firebase
import { getFirestore, collection, onSnapshot, doc } from "firebase/firestore";
// Helpers 
import Screen from '../helpers/Screen';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const Chat = ({data}) => {

    return(
        <View style={{flex: 1, width: Screen.width, backgroundColor: '#eee'}}>
            <View style={{width: Screen.width, height: Screen.width / 5, backgroundColor: '#00000010', flexDirection: 'row', alignItems: 'center'}}>
                <Image 
                    source={{uri: data.profilepic}}
                    resizeMode='cover'
                    style={{width: Screen.width / 7.5, height: Screen.width / 7.5, marginLeft: 15, borderRadius: 50}}
                />
                <Text style={{color: '#3a3a3a', fontSize: 17, marginLeft: 15, fontWeight: '600'}}>{data.username}</Text>
            </View>
            <SafeAreaView style={{justifyContent: 'space-between', flex: 1}}>
                <KeyboardAvoidingView style={{justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
                    <ScrollView style={{flex: 1, backgroundColor: '#00000020', width: Screen.width}}>

                    </ScrollView>
                    <View style={{width: Screen.width /1.1 , height: Screen.width / 6, backgroundColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{height: Screen.width / 8.5, width: '82%', backgroundColor: '#00000020', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}> 
                            <TextInput 
                                placeholder="  Nachricht"
                                placeholderTextColor={"#fff"}
                                style={styles.input}
                            />
                        </View>
                        <TouchableOpacity style={{width: Screen.width / 9, height: Screen.width / 9, backgroundColor: '#f00', borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
                            <Icon 
                                name='send'
                                type='fontawesome'
                                color={'#eee'}
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
    }
})

export default Chat