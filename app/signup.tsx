import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth, signUp } from "../firebaseService";
import Toast from "react-native-toast-message";

export default function SignUpScreen() {
    const navigation = useRouter();

    // State for user inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // Handle sign-up
    const handleSignUp = async () => {
        if (!email || !password || !fullName || !phoneNumber) {
            Toast.show({
                type: "error",
                text1: "All fields are required",
            });
            return;
        }

        try {
            await signUp(email, password);
            Toast.show({
                type: "success",
                text1: "Account created successfully!",
            });

            // Navigate to login
            setTimeout(() => navigation.push("/login"), 1500);
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: error.message || "Sign-up failed",
            });
        }
    };

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Create your account below</Text>

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

            {/* Full Name Input */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Name"
                value={fullName}
                onChangeText={setFullName}
            />

            {/* Phone Number */}
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder="+1 000 000 0000"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />

            {/* Password Input */}
            <Text style={styles.label}>Create Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Social Sign-Up */}
            <Text style={styles.orText}>Or Sign Up Using:</Text>
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

            {/* Create Account Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Create account</Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <TouchableOpacity onPress={() => navigation.push("/login")}>
                <Text style={styles.signUpText}>
                    Already have an account? <Text style={styles.signUpLink}>Sign in</Text>
                </Text>
            </TouchableOpacity>

            {/* Toast Notification */}
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

