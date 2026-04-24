import ForgotPasswordScreen from '@/screens/ForgetPasswordScreen'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const ForgetPassword = () => {
    return (
        <View style={styles.container}>
            <ForgotPasswordScreen />
        </View>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F7FB',
    },
})