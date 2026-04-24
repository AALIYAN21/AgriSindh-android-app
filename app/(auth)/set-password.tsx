import SetNewPasswordScreen from '@/screens/SetNewPasswordScreen'
import React from 'react'
import { StyleSheet, View } from 'react-native'


const SetPassword = () => {
    return (
        <View style={styles.container}>
            <SetNewPasswordScreen />
        </View>
    )
}

export default SetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})