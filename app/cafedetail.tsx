import React, {useEffect, useState} from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useRouter} from "expo-router";
import {useSearchParams} from "expo-router/build/hooks";
import {getData, getSingleDocument} from "@/firebaseService";
import {returnStatement} from "@babel/types";
import {SafeAreaView} from "react-native-safe-area-context"; // For icons



const VendorScreen = () => {
    const navigation = useRouter();
    const path = useSearchParams();
    console.log(path.get("id"))
    
    const [restaurantName, setRestaurantName] = useState<any>();
    const [fItem, setFItems] = useState<any[]>();
    const [fItemDetails, setFItemsDetails] = useState<any[]>();

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const querySnapshot: any = await getSingleDocument("vendors", path.get("id")!);
                console.log(querySnapshot, "am here")
                setRestaurantName(querySnapshot?.name)
                if (querySnapshot != null && Object.hasOwn(querySnapshot, "menu")) {
                    setFItems(Object.keys(querySnapshot.menu));
                    setFItemsDetails(Object.values(querySnapshot.menu));
                    return;
                }
                setFItems([]);
                setFItemsDetails([]);
                // setRestaurant(querySnapshot);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurant()
    }, []);
    
    if (!restaurantName) return <View>Loadings</View> 
    return (
        <SafeAreaView style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Banner Image */}
            <Image source={require("../assets/mcdonalds.jpg")} style={styles.banner} />

            {/* Vendor Info */}
            <View style={styles.vendorInfo}>
                <View style={styles.vendorLogo}>
                    <Text style={styles.vendorLogoText}>{restaurantName[0]}</Text>
                </View>
                <View>
                    <Text style={styles.vendorName}>{restaurantName}</Text>
                    <Text style={styles.vendorRating}>
                        ⭐ Ratings: <Text style={{ fontWeight: "bold" }}>4.5</Text>
                    </Text>
                </View>
            </View>

            {/* Food List */}
            <FlatList
                data={fItem}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <View style={styles.foodItem}>
                        <Image source={{ uri: fItemDetails![fItem?.indexOf(item)!]["defaultImage"]}} style={styles.foodImage} />
                        <Text style={styles.foodName}>{item}</Text>
                        <Text style={styles.foodPrice}>{fItemDetails![fItem?.indexOf(item)!]["price"]}</Text>
                        <Ionicons name="add-circle-outline" size={24} color="gray" />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />

            {/* View Order Button */}
            <TouchableOpacity style={styles.orderButton} onPress={() => navigation.navigate("/orderDetails")}>
                <Text style={styles.orderButtonText}>View Order</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// **Styles**
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backButton: {
        marginTop: 40,
        position: "absolute",
        top: 50,
        left: 16,
        zIndex: 1,
    },
    banner: {
        width: "100%",
        height: 180,
        resizeMode: "cover",
    },
    vendorInfo: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
    },
    vendorLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#73C94F",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    vendorLogoText: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
    },
    vendorName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    vendorRating: {
        fontSize: 14,
        color: "gray",
    },
    foodItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    foodImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
    },
    foodName: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
    },
    foodPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#28A745",
        marginRight: 10,
    },
    orderButton: {
        position: "absolute",
        bottom: 20,
        left: 16,
        right: 16,
        backgroundColor: "#28A745",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    orderButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default VendorScreen;
