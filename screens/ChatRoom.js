import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const ChatRoom = () => {

    return(
        <View style={styles.container}>
            <Text>ChatRoom</Text>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

})

export default ChatRoom