import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// ✅ Import your button
import LanguageToggleButton from '../components/LanguageToggleButton'

const AppHeader = () => {
    const router = useRouter();
    const path = "/notification";

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.container}>

                {/* Left Side */}
                <View style={styles.leftSection}>
                    <Image
                        source={require('../assets/images/swat-logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>SWAT AMIS</Text>
                </View>

                {/* Right Side Actions */}
                <View style={styles.rightSection}>

                    {/* 🌐 Language Button (your reusable component) */}
                    <LanguageToggleButton />

                    {/* 🔔 Notification Icon */}
                    <TouchableOpacity
                        onPress={() => router.push(path)}
                        activeOpacity={0.7}
                        style={styles.iconButton}
                    >
                        <MaterialIcons
                            name="notifications-none"
                            size={28}
                            color="#1F5D2B"
                        />
                    </TouchableOpacity>

                </View>
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60,
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

    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    iconButton: {
        padding: 4,
        position: 'relative',
    },
})