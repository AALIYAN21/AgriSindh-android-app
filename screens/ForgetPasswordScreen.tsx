import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleBackToLogin = () => {
        router.back();
    };

    const handleSendOtp = () => {
        router.replace('/otp-verification');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 1. Wrap the entire area to catch taps */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                {/* 2. KeyboardAvoidingView needs flex: 1 to fill the space */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    {/* 3. This inner View must also have flex: 1 */}
                    <View style={styles.content}>

                        <Text style={styles.title}>Forgot{'\n'}Password</Text>

                        <Text style={styles.subtitle}>
                            Enter your email address and we'll send you an OTP to reset your password.
                        </Text>

                        <Text style={styles.label}>EMAIL ADDRESS</Text>
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="at" size={20} color="#999" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="name@company.com"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSendOtp}>
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonText}>Send OTP</Text>
                                <AntDesign name="arrow-right" size={20} color="white" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
                            <AntDesign name="arrow-left" size={16} color="#1D4219" />
                            <Text style={styles.backText}>Back to Login</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1, // Added flex: 1 so the View covers the screen
        paddingHorizontal: 30,
        paddingTop: 80,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#1D4219',
        lineHeight: 52,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 40,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#999',
        marginBottom: 8,
        letterSpacing: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        borderRadius: 4,
        paddingHorizontal: 15,
        height: 55,
        marginBottom: 30,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#1D4219',
        borderRadius: 8,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 10,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20, // Increased for better spacing
    },
    backText: {
        color: '#1D4219',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    },
});

export default ForgotPasswordScreen;