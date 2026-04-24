import StatusModal from '@/components/StatusModal';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
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

const OTPVerificationScreen = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const inputs = useRef<Array<TextInput | null>>([]);
    const router = useRouter();



    const handleChange = (text: any, index: any) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto-focus next input if text is entered
        if (text && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: any) => {
        // Move to previous input on backspace if current field is empty
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleOTPVerification = () => {
        setIsModalVisible(true);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
        router.push('/(tabs)/home');
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* 1. Wrap entire screen to handle keyboard dismissal */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                {/* 2. KeyboardAvoidingView fills the remaining space */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.flexContainer}
                >
                    <View style={styles.card}>

                        {/* Title & Subtitle */}
                        <Text style={styles.title}>Verify OTP</Text>
                        <Text style={styles.subtitle}>
                            Enter the 4-digit code sent to your email.
                        </Text>

                        {/* OTP Input Fields */}
                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <View key={index} style={styles.inputWrapper}>
                                    <TextInput
                                        ref={(ref) => { inputs.current[index] = ref }}
                                        style={styles.otpInput}
                                        maxLength={1}
                                        keyboardType="number-pad"
                                        onChangeText={(text) => handleChange(text, index)}
                                        onKeyPress={(e) => handleKeyPress(e, index)}
                                        value={digit}
                                        secureTextEntry={true}
                                    />
                                </View>
                            ))}
                        </View>

                        {/* Verify Button */}
                        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => handleOTPVerification()}>
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonText}>Verify & Proceed</Text>
                                {/* Fixed icon name to 'arrowright' */}
                                <AntDesign name="arrow-right" size={18} color="white" />
                            </View>
                        </TouchableOpacity>

                        {/* Resend Link */}
                        <View style={styles.resendContainer}>
                            <Text style={styles.resendText}>Didn't receive the code? </Text>
                            <TouchableOpacity>
                                <Text style={styles.resendLink}>Resend</Text>
                            </TouchableOpacity>
                        </View>

                        {
                            isModalVisible && (
                                <StatusModal
                                    status="otp"
                                    onClose={() => handleCloseModal()}
                                />
                            )
                        }
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    flexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 15,
        paddingVertical: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D4219',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 30,
    },
    inputWrapper: {
        width: 60,
        height: 70,
        backgroundColor: '#EAEAEA',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpInput: {
        fontSize: 30,
        textAlign: 'center',
        color: '#4A5568',
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: '#244D1E',
        borderRadius: 10,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
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
    resendContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    resendText: {
        color: '#666',
        fontSize: 14,
    },
    resendLink: {
        color: '#1D4219',
        fontWeight: 'bold',
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    footerText: {
        fontSize: 10,
        color: '#999',
        fontWeight: '700',
        letterSpacing: 1.2,
        marginLeft: 6,
    },
});

export default OTPVerificationScreen;