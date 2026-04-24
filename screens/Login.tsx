import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
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

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    router.push("/(tabs)/home")
  }

  const handleForgetPassword = () => {
    router.push("/(auth)/forgetPassword")
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.contentParent}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/swat-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>SWAT AMIS</Text>
            </View>

            {/* Header */}
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>
              Please enter your credentials to continue.
            </Text>

            {/* Username */}
            <Text style={styles.label}>EMAIL OR USERNAME</Text>
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
              />
            </View>

            {/* Password */}
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock-outline"
                size={18}
                color="#999"
              />
              <TextInput
                placeholder="••••••••••••"
                placeholderTextColor="#bbb"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              <MaterialIcons
                name="visibility-off"
                size={18}
                color="#bbb"
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()}>
              <Text style={styles.loginText}>
                Login ➜
              </Text>
            </TouchableOpacity>

            {/* Forget Password Button */}
            <TouchableOpacity style={styles.forgetPasswordButton} onPress={() => handleForgetPassword()}>
              <Text style={styles.forgetPasswordText}>
                Forgot Password ➜
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  contentParent: {
    top: '18%'
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    width: 28,
    height: 28,
    marginRight: 8,
  },

  logoText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#154212",
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
    fontSize: 13,
    color: "#111",
  },

  loginButton: {
    backgroundColor: "#154212",
    marginTop: 45,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#154212",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  loginText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  forgetPasswordButton: {
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "flex-start",
    shadowColor: "#154212"
  },
  forgetPasswordText: {
    color: "#154212",
    fontSize: 15,
    fontWeight: "700",
  },

  footerRow: {
    flexDirection: "row",
    marginTop: 45,
    justifyContent: "space-between",
  },

  footerSmall: {
    fontSize: 11,
    color: "#777",
  },

  warning: {
    fontSize: 10,
    color: "#999",
    marginTop: 20,
    lineHeight: 16,
  },
});