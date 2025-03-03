import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";

export default function Index() {
    const navigation = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
                <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="cover" />
            </View>

            {/* Title & Subtitle */}
            <Text style={styles.title}>
                All your Favourite things{"\n"}from all your Favourite Places
            </Text>
            <Text style={styles.subtitle}>at the snap of your fingers</Text>

            {/* Description */}
            <Text style={styles.description}>
                Get what you need, when you need it. Fast delivery, easy ordering, and
                real-time tracking – all in one app.{"\n"}Let's go!
            </Text>

            {/* Next Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("/login")}>
                <Text style={styles.buttonText}>Next →</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    logoContainer: {
        width: "100%",
        height: 200,
        backgroundColor: "#A3E635", // Lime-400 color
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    logo: {
        width: 200,
        height: 80,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#111827", // Dark Gray
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#6B7280", // Gray-500
        textAlign: "center",
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: "#4B5563", // Gray-600
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#84CC16", // Lime-500 color
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        color: "#ffffff",
        fontWeight: "600",
    },
});
