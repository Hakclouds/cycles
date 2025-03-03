import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {getData} from "@/firebaseService";
// import { app } from "../../firebaseConfig"; // Adjust path based on your setup

const HomeScreen = () => {
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const navigation = useRouter();
    // const db = getFirestore(app);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const querySnapshot = await getData("vendors");
               console.log(querySnapshot, "am here")
                setRestaurants(querySnapshot);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Greeting */}
            <Text style={styles.greeting}>Hi! Welcome</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
                <TextInput placeholder="Search Restaurants..." style={styles.searchInput} />
            </View>

            {/* Section Title */}
            <Text style={styles.sectionTitle}>Available Restaurants</Text>

            {/* Restaurants List */}
            <FlatList
                data={restaurants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate(`/cafedetail?id=${item.id}`)} style={styles.card}>
                        <Image source={require("../../assets/burger.png")} style={styles.image} />
                        <Text style={styles.restaurantName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    greeting: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        marginBottom: 15,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    card: {
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: "600",
        padding: 10,
    },
});

export default HomeScreen;
