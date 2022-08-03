import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { safeArea } from '../helpers/Screen';
// ViewModels
import ChatListElement from './viewModels/ChatListElement';

const ChatRoom = () => {

    // Beispiel Datensätze
    const chat1 = {
        name: 'Hazo Nigga',
        profilePic: 'https://i.pinimg.com/originals/93/3e/0b/933e0baceb0340d7ced3b0d2e0ce510d.jpg',
        lastMessage: {
            text: 'was geht nigga',
            time: '17:08'
        },
        unreadMessages: 0
    }

    const chat2 = {
        name: 'Ömer Mannheim',
        profilePic: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f687a5e8-98b7-4684-a7a9-8e4215355dbb/db6gruz-01bb104a-7407-4c90-badf-4374af56f9b3.png/v1/fill/w_1600,h_901,strp/johan_liebert_minimalist__monster__by_earthlurker_db6gruz-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAxIiwicGF0aCI6IlwvZlwvZjY4N2E1ZTgtOThiNy00Njg0LWE3YTktOGU0MjE1MzU1ZGJiXC9kYjZncnV6LTAxYmIxMDRhLTc0MDctNGM5MC1iYWRmLTQzNzRhZjU2ZjliMy5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.UseZf0Actxor2KBr6YTS2t3_e0NXfSK2o5j0vbz_BXM',
        lastMessage: {
            text: 'heute fn?',
            time: '18:12'
        },
        unreadMessages: 2
    }

    return(
        <View style={styles.container}>
            <SafeAreaView style={[styles.container, safeArea.AndroidSafeArea]}>
                <Text style={{color: '#3a3a3a', fontSize: 28, fontWeight: '600', marginBottom: 25}}>Chats</Text>
                <ChatListElement data={chat2}/>
                <ChatListElement data={chat1}/>
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

export default ChatRoom