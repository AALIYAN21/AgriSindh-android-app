import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const STAGES = [
    {
        id: 1,
        title: 'Step into the Future',
        description: 'Track your progress with our secure ledger technology.',
        image: 'https://via.placeholder.com/300x400/1D4219/FFFFFF?text=Stage+1', // Replace with your assets
    },
    {
        id: 2,
        title: 'Connect & Co-create',
        description: 'Join a community of builders and innovators.',
        image: 'https://via.placeholder.com/300x400/244D1E/FFFFFF?text=Stage+2',
    },
    {
        id: 3,
        title: 'Your Gateway Awaits',
        description: 'The final step towards your new digital identity.',
        image: 'https://via.placeholder.com/300x400/1D4219/FFFFFF?text=Stage+3',
    },
];

const STAGE_DURATION = 1500; // 1.5 seconds per stage

const OnboardingScreen = () => {
    const [currentStage, setCurrentStage] = useState(0);
    const router = useRouter();

    const handlePress = (event: any) => {
        const tapX = event.nativeEvent.locationX;
        if (tapX < width / 2) {
            // Left tap: Go backward
            if (currentStage > 0) {
                setCurrentStage((prev) => prev - 1);
            }
        } else {
            // Right tap: Go forward
            if (currentStage < STAGES.length - 1) {
                setCurrentStage((prev) => prev + 1);
            } else {
                router.replace('/login');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Progress Bars (WhatsApp Style) */}
            <View style={styles.indicatorContainer}>
                {STAGES.map((_, index) => (
                    <View key={index} style={styles.indicatorBackground}>
                        <View
                            style={[
                                styles.indicatorProgress,
                                {
                                    width: index <= currentStage ? '100%' : '0%',
                                },
                            ]}
                        />
                    </View>
                ))}
            </View>

            {/* Content Section */}
            <TouchableWithoutFeedback onPress={handlePress}>
                <View style={styles.content}>
                    <Image
                        source={{ uri: STAGES[currentStage].image }}
                        style={styles.image}
                        resizeMode="contain"
                    />

                    <View style={styles.textWrapper}>
                        <Text style={styles.title}>{STAGES[currentStage].title}</Text>
                        <Text style={styles.subtitle}>{STAGES[currentStage].description}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            {/* Bottom Section */}
            <View style={styles.footer}>
                {currentStage < STAGES.length - 1 && (
                    <TouchableOpacity onPress={() => router.replace('/login')}>
                        <Text style={styles.skipText}>Skip Onboarding</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    indicatorContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    indicatorBackground: {
        flex: 1,
        height: 4,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 4,
        borderRadius: 2,
        overflow: 'hidden',
    },
    indicatorProgress: {
        height: '100%',
        backgroundColor: '#1D4219',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 40,
    },
    textWrapper: {
        alignItems: 'flex-start',
        width: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D4219',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    footer: {
        paddingHorizontal: 30,
        paddingBottom: 40,
        alignItems: 'center',
    },

    skipText: {
        color: '#666',
        fontSize: 16,
        marginBottom: 30,
    },
    secureFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    secureText: {
        fontSize: 10,
        color: '#ccc',
        fontWeight: '700',
        letterSpacing: 1,
        marginLeft: 8,
    },
});

export default OnboardingScreen;