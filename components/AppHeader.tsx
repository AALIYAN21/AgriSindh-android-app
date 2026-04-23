// components/AppHeader.js
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AppHeader = () => {
    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/swat-logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>SWAT AMIS</Text>
            </View>
        </SafeAreaView>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#F6F7FB',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 50, // no fake margin needed
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F5D2B',
    },
})