import OTPVerificationScreen from '@/screens/OTPVerificationScreen'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const OTPVerification = () => {
    return (
        <View style={styles.container}>
            <OTPVerificationScreen />
        </View>
    )
}

export default OTPVerification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Light grey background
    },
})