// components/AppHeader.js
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AppHeader = () => {
    const router = useRouter();
    const path = "/notification"

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.container}>
                {/* Left Side: Logo and Title */}
                <View style={styles.leftSection}>
                    <Image
                        source={require('../assets/images/swat-logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>SWAT AMIS</Text>
                </View>

                {/* Right Side: Notification Bell */}
                <TouchableOpacity
                    onPress={() => router.push(path)}
                    activeOpacity={0.7}
                    style={styles.iconButton}
                >
                    <MaterialIcons name="notifications-none" size={28} color="#1F5D2B" />
                    {/* Optional: Add a small red dot if you want a "new notification" indicator */}
                    {/* <View style={styles.badge} /> */}
                </TouchableOpacity>
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
        justifyContent: 'space-between', // Push content to opposite sides
        paddingHorizontal: 16,
        height: 60, // Slightly increased for better touch targets
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
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
    iconButton: {
        padding: 4,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D32F2F', // Alert Red
        borderWidth: 1,
        borderColor: '#F6F7FB',
    }
})