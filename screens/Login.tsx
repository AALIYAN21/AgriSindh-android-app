import { useTranslation } from "@/hooks/useLanguage";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const t = useTranslation();

  // 👁 NEW STATE
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    router.push("/(tabs)/home");
  };

  const handleForgetPassword = () => {
    router.push("/(auth)/forgetPassword");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Green Header */}
      <View style={styles.headerContainer}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.headerContent}>
            <View style={styles.logosRow}>
              <Image
                source={require("../assets/images/sindh-gov-logo.png")}
                style={[
                  styles.headerLogo,
                  { tintColor: "white" },
                ]}
                resizeMode="contain"
              />

              <Image
                source={require("../assets/images/swat-logo.png")}
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.logoText}>
              SWAT AMIS
            </Text>

            <Text style={styles.logoSubText}>
              Transforming Manual Records into
              Digital Insights
            </Text>
          </View>
        </SafeAreaView>
      </View>

      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height"
          }
          style={{ flex: 1 }}
        >
          <View style={styles.contentParent}>
            <Text style={styles.title}>{t("login.loginTitle")}</Text>

            <Text style={styles.subtitle}>
              {t("login.loginDescription")}
            </Text>

            {/* Username */}
            <Text style={styles.label}>
              {t("login.Email")}
            </Text>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="person-outline"
                size={18}
                color="#999"
              />

              <TextInput
                placeholder="e.g. j.doe@swat-amis.com"
                placeholderTextColor="#bbb"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <Text style={styles.label}>
              {t("login.password")}
            </Text>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock-outline"
                size={18}
                color="#999"
              />

              <TextInput
                placeholder="••••••••••••"
                placeholderTextColor="#bbb"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />

              {/* 👁 FUNCTIONAL EYE */}
              <TouchableOpacity
                onPress={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                <MaterialIcons
                  name={
                    showPassword
                      ? "visibility"
                      : "visibility-off"
                  }
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>
                {t("login.LoginBtn")} ➜
              </Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity
              style={
                styles.forgetPasswordButton
              }
              onPress={
                handleForgetPassword
              }
            >
              <Text
                style={
                  styles.forgetPasswordText
                }
              >
                {t("login.forgetPassword")} ➜
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerContainer: {
    backgroundColor: "#154212",
    width: "100%",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  headerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
  },

  logosRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 12,
  },

  headerLogo: {
    width: 65,
    height: 65,
    backgroundColor: "transparent",
  },

  logoText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },

  logoSubText: {
    fontSize: 10,
    fontWeight: "300",
    color: "#fff",
    letterSpacing: 0.5,
  },

  contentParent: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: "15%",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 12,
    color: "#777",
    marginBottom: 35,
  },

  label: {
    fontSize: 10,
    fontWeight: "700",
    color: "#666",
    marginBottom: 8,
    marginTop: 18,
    letterSpacing: 1,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#111",
  },

  loginButton: {
    backgroundColor: "#154212",
    marginTop: 45,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  forgetPasswordButton: {
    paddingVertical: 20,
    alignItems: "flex-start",
  },

  forgetPasswordText: {
    color: "#154212",
    fontSize: 14,
    fontWeight: "700",
  },
});