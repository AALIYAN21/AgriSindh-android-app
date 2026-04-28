import StatusModal from "@/components/StatusModal";
import { useTranslation } from "@/hooks/useLanguage";
import {
    AntDesign,
    Feather,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PasswordRule = ({
    passed,
    text,
}: {
    passed: boolean;
    text: string;
}) => {
    return (
        <View style={styles.ruleRow}>
            <AntDesign
                name={passed ? "check-circle" : "close-circle"}
                size={16}
                color={passed ? "#2E7D32" : "#B0B0B0"}
            />

            <Text
                style={[
                    styles.ruleText,
                    { color: passed ? "#2E7D32" : "#666" },
                ]}
            >
                {text}
            </Text>
        </View>
    );
};

const SetNewPasswordScreen = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");
    const [isModalVisible, setIsModalVisible] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const t = useTranslation();

    const router = useRouter();

    const passwordChecks = {
        minLength: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[@$!%*#?&]/.test(password),
        match:
            password === confirmPassword &&
            confirmPassword.length > 0,
    };

    const isPasswordStrong =
        passwordChecks.minLength &&
        passwordChecks.uppercase &&
        passwordChecks.number &&
        passwordChecks.special &&
        passwordChecks.match;

    const handleResetPassword = () => {
        if (!isPasswordStrong) return;
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);

        setTimeout(() => {
            router.replace("/(auth)/login");
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <KeyboardAvoidingView
                    behavior={
                        Platform.OS === "ios"
                            ? "padding"
                            : "height"
                    }
                    style={styles.flexContainer}
                >
                    <View style={styles.content}>
                        {/* Title */}
                        <Text style={styles.title}>
                            {t("newPassword.titleHeader")}
                        </Text>

                        <Text style={styles.subtitle}>
                            {t("newPassword.subTitle")}
                        </Text>

                        {/* New Password */}
                        <View style={styles.inputContainer}>
                            <Feather
                                name="lock"
                                size={20}
                                color="#666"
                                style={styles.icon}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="New Password"
                                placeholderTextColor="#999"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />

                            <TouchableOpacity
                                onPress={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                <Ionicons
                                    name={
                                        showPassword
                                            ? "eye-off-outline"
                                            : "eye-outline"
                                    }
                                    size={22}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password */}
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons
                                name="history"
                                size={20}
                                color="#666"
                                style={styles.icon}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Confirm New Password"
                                placeholderTextColor="#999"
                                secureTextEntry={
                                    !showConfirmPassword
                                }
                                value={confirmPassword}
                                onChangeText={
                                    setConfirmPassword
                                }
                            />

                            <TouchableOpacity
                                onPress={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >
                                <Ionicons
                                    name={
                                        showConfirmPassword
                                            ? "eye-off-outline"
                                            : "eye-outline"
                                    }
                                    size={22}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Password Rules */}
                        <View style={styles.passwordChecklist}>
                            <PasswordRule
                                passed={
                                    passwordChecks.minLength
                                }
                                text={t("newPassword.minLength")}
                            />

                            <PasswordRule
                                passed={
                                    passwordChecks.uppercase
                                }
                                text={t("newPassword.upperCase")}
                            />

                            <PasswordRule
                                passed={passwordChecks.number}
                                text={t("newPassword.number")}
                            />

                            <PasswordRule
                                passed={
                                    passwordChecks.special
                                }
                                text={t("newPassword.specialCharacter")}
                            />

                            <PasswordRule
                                passed={passwordChecks.match}
                                text={t("newPassword.passwordMatch")}
                            />
                        </View>

                        {/* Button */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    opacity:
                                        isPasswordStrong
                                            ? 1
                                            : 0.6,
                                },
                            ]}
                            activeOpacity={0.8}
                            onPress={handleResetPassword}
                            disabled={!isPasswordStrong}
                        >
                            <View
                                style={styles.buttonContent}
                            >
                                <Text
                                    style={styles.buttonText}
                                >
                                    {t("newPassword.resetBtn")}
                                </Text>

                                <AntDesign
                                    name="arrow-right"
                                    size={18}
                                    color="white"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {isModalVisible && (
                        <StatusModal
                            onClose={handleCloseModal}
                            status="passwordReset"
                        />
                    )}
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default SetNewPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },

    flexContainer: {
        flex: 1,
    },

    content: {
        flex: 1,
        paddingHorizontal: 35,
        justifyContent: "center",
        paddingBottom: 40,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#1D4219",
        textAlign: "center",
        marginBottom: 12,
    },

    subtitle: {
        fontSize: 15,
        color: "#666",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 40,
        paddingHorizontal: 20,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EAEAEA",
        borderRadius: 4,
        paddingHorizontal: 15,
        height: 55,
        marginBottom: 18,
    },

    icon: {
        marginRight: 12,
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },

    passwordChecklist: {
        marginTop: 5,
        marginBottom: 15,
    },

    ruleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },

    ruleText: {
        marginLeft: 8,
        fontSize: 13,
    },

    button: {
        backgroundColor: "#244D1E",
        borderRadius: 12,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        marginRight: 10,
    },
});