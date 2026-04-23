// app/(tabs)/profile.js
import { Fonts } from '@/constants/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
    const router = useRouter()
    return (
        <View style={styles.container}>

            {/* Avatar */}
            <View style={styles.avatarWrapper}>
                <View style={styles.avatar}>
                    <MaterialIcons name="person" size={40} color="#555" />
                </View>

                <View style={styles.checkIcon}>
                    <MaterialIcons name="check" size={16} color="#fff" />
                </View>
            </View>

            {/* Name */}
            <Text style={styles.name}>Allah Dino</Text>
            <Text style={styles.email}>alikhan2026@gmail.com</Text>

            {/* Settings */}
            <Text style={styles.sectionTitle}>SETTINGS</Text>

            <View style={styles.card}>
                <MenuItem
                    icon="person-outline"
                    title="Account Information"
                    subtitle="Personal details and professional bio"
                    onPress={() => router.push("/settings/account")}
                />
                <MenuItem
                    icon="security"
                    title="Security"
                    subtitle="Password, 2FA, and login history"
                    onPress={() => router.push("/settings/security")}
                />
                <MenuItem
                    icon="support-agent"
                    title="Help & Support"
                    subtitle="Documentation and priority assistance"
                    onPress={() => router.push("/settings/help")}
                />
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.logout}>
                <MaterialIcons name="logout" size={18} color="#D32F2F" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text style={styles.footer}>VERSION 1.0.1 AMIS (SWAT)</Text>
        </View>
    )
}

export default Profile

type IconName = React.ComponentProps<typeof MaterialIcons>['name']

// 🔹 Reusable Menu Item
const MenuItem = ({ icon, title, subtitle, onPress }: { icon: IconName, title: string, subtitle: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.iconBox}>
            <MaterialIcons name={icon} size={20} color="#1F5D2B" />
        </View>

        <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>{title}</Text>
            <Text style={styles.menuSubtitle}>{subtitle}</Text>
        </View>

        <MaterialIcons name="chevron-right" size={22} color="#999" />
    </TouchableOpacity>
)


// 🎨 Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F7FB',
        alignItems: 'center',
        top: '10%',
    },

    avatarWrapper: {
        marginTop: 10,
        position: 'relative',
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 20,
        backgroundColor: '#EDEDED',
        justifyContent: 'center',
        alignItems: 'center',
    },

    checkIcon: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: '#1F5D2B',
        borderRadius: 10,
        padding: 4,
    },

    name: {
        marginTop: 10,
        fontSize: 18,
        fontFamily: Fonts.sans,
        color: '#1F5D2B',
    },

    email: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },

    sectionTitle: {
        alignSelf: 'flex-start',
        marginTop: 25,
        marginLeft: 20,
        fontSize: 12,
        letterSpacing: 2,
        color: '#666',
    },

    card: {
        width: '90%',
        backgroundColor: '#f2f2f2eb',
        borderRadius: 12,
        marginTop: 10,
        paddingVertical: 5,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },

    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#E6EFE9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    menuTitle: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        color: '#1A1A1A',
    },

    menuSubtitle: {
        fontSize: 12,
        color: '#777',
    },

    logout: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3EAEA',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '90%',
        justifyContent: 'center',
    },

    logoutText: {
        marginLeft: 8,
        color: '#D32F2F',
        fontFamily: Fonts.sans,
    },

    footer: {
        marginTop: 20,
        fontSize: 10,
        color: '#999',
    },
})