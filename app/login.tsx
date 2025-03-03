import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseService"; // Ensure firebaseService.ts exports `auth`
import Toast from "react-native-toast-message";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useRouter();

    async function loginHandler(email: string, password: string) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Toast.show({
                type: "success",
                text1: "Login Successful",
                text2: "Welcome back! 🎉",
            });
            setTimeout(() => navigation.navigate("/(tabs)"), 1500); // Delay navigation
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Login Failed",
                text2: error.message,
            });
        }
    }

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Sign up or Login to your Account</Text>

            {/* Email Input */}
            <Text style={styles.label}>Email Address</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {/* Password Input */}
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Forgot Password */}
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Social Login */}
            <Text style={styles.orText}>Or Login Using:</Text>
            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <FontAwesome name="google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <FontAwesome name="apple" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <FontAwesome name="facebook" size={24} color="#1877F2" />
                </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={() => loginHandler(email, password)}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity onPress={() => navigation.navigate("/signup")}>
                <Text style={styles.signUpText}>
                    Don’t have an account yet? <Text style={styles.signUpLink}>Sign up</Text>
                </Text>
            </TouchableOpacity>

            {/* Toast Message */}
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#F3F4F6",
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
    },
    forgotPassword: {
        textAlign: "right",
        color: "#6B7280",
        marginBottom: 15,
    },
    orText: {
        textAlign: "center",
        marginVertical: 10,
        color: "#6B7280",
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    iconButton: {
        marginHorizontal: 10,
    },
    button: {
        backgroundColor: "#84CC16",
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "#ffffff",
        fontWeight: "600",
    },
    signUpText: {
        textAlign: "center",
        color: "#6B7280",
    },
    signUpLink: {
        color: "#84CC16",
        fontWeight: "bold",
    },
});

