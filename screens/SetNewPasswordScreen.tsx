import StatusModal from '@/components/StatusModal';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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

const SetNewPasswordScreen = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const router = useRouter();

    const handleResetPassword = () => {
        // Logic to reset password
        console.log("Password reset triggered");
    };

    const handlePasswordRest = () => {
        setIsModalVisible(true);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setTimeout(() => {
            router.replace('/(auth)/login');
        }, 1000);
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.flexContainer}
                >
                    <View style={styles.content}>

                        {/* Header Section */}
                        <Text style={styles.title}>Set New Password</Text>
                        <Text style={styles.subtitle}>
                            Please enter and confirm your new password below.
                        </Text>

                        {/* New Password Input */}
                        <View style={styles.inputContainer}>
                            <Feather name="lock" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="New Password"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="history" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm New Password"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>

                        {/* Reset Password Button */}
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.8}
                            onPress={() => handlePasswordRest()}
                        >
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonText}>Reset Password</Text>
                                <AntDesign name="arrow-right" size={18} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        isModalVisible && (
                            <StatusModal
                                onClose={handleCloseModal}
                                status='passwordReset'
                            />
                        )
                    }
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9', // Matches the slight off-white gradient look
    },
    flexContainer: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 35,
        justifyContent: 'center', // Centers the content like the snapshot
        paddingBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1D4219',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        borderRadius: 4,
        paddingHorizontal: 15,
        height: 55,
        marginBottom: 15, // Tighter spacing between inputs
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#244D1E',
        borderRadius: 12,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginRight: 10,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    backText: {
        color: '#1D4219',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default SetNewPasswordScreen;