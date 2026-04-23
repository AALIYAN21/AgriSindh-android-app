import ProfileScreen from '@/screens/profileScreen'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const profile = () => {
    return (
        <View style={styles.container}>
            <ProfileScreen />
        </View>
    )
}

export default profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F7FB",
    },
})