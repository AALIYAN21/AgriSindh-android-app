import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ALERTS_DATA = [
    {
        id: '1',
        title: 'Irrigation Failure',
        time: '10m ago',
        description: 'Pressure drop detected in Sector 4 main line. Immediate inspection required to prevent crop stress.',
    },
    {
        id: '2',
        title: 'Optimal Soil Moisture',
        time: '2h ago',
        description: 'Sector 2 has reached target moisture levels following recent scheduled watering cycle.',
    },
    {
        id: '3',
        title: 'High Temp Warning',
        time: '4h ago',
        description: 'Ambient temperature in Greenhouse B exceeded 32°C. Cooling systems activated at maximum capacity.',
    },
    {
        id: '4',
        title: 'Weekly Report Ready',
        time: '1d ago',
        description: 'Your comprehensive yield and resource utilization report for Week 42 is now available for review.',
    },
];

const AlertItem = ({ item }: { item: any }) => (
    <View style={styles.alertContainer}>
        <View style={styles.row}>
            <View style={styles.iconCircle}>
                <MaterialIcons name="notifications" size={20} color="#444" />
            </View>
            <View style={styles.textContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.alertTitle}>{item.title}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
        </View>
        <View style={styles.divider} />
    </View>
);

const AlertsScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.mainTitle}>Alerts</Text>
                <Text style={styles.subtitle}>Critical updates and system notifications.</Text>

                <FlatList
                    data={ALERTS_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <AlertItem item={item} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default AlertsScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1B3C14', // Deep green from image
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 30,
    },
    listContent: {
        paddingBottom: 100, // Space for the floating tab bar
    },
    alertContainer: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#EDEDED',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    textContainer: {
        flex: 1,
        marginLeft: 15,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    timeText: {
        fontSize: 12,
        color: '#999',
    },
    descriptionText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginTop: 20,
        width: '100%',
    },
});