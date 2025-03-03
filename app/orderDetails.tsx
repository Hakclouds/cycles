import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialOrders = [
    { id: '1', name: 'Jollof Rice', price: 250, quantity: 4, image: require('../assets/burger.png') },
    { id: '2', name: 'Jollof Rice', price: 250, quantity: 3, image: require('../assets/burger.png') },
    { id: '3', name: 'Beef', price: 200, quantity: 5, image: require('../assets/burger.png') },
];

const OrderDetailsScreen = () => {
    const navigation = useRouter();
    const [orders, setOrders] = useState(initialOrders);
    const [modalVisible, setModalVisible] = useState(false);
    const [orderAccepted, setOrderAccepted] = useState(false);

    const updateQuantity = (id, delta) => {
        setOrders(prevOrders =>
            prevOrders.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );
    };

    const calculateTotal = () => {
        const subtotal = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const deliveryCharge = 500;
        return { subtotal, total: subtotal + deliveryCharge };
    };

    const handleCheckout = () => {
        setModalVisible(true);
        setTimeout(() => {
            setOrderAccepted(true);
        }, 7000);
    };

    const handleProceedToPayment = () => {
        setModalVisible(false);
        setOrderAccepted(false);
        navigation.navigate('/payment'); // Replace with actual payment screen route
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.back()}>
                    <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order details</Text>
            </View>

            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>₦{item.price}.00</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => updateQuantity(item.id, -1)}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => updateQuantity(item.id, 1)}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <View style={styles.summary}>
                <Text style={styles.summaryText}>Sub-Total: ₦{calculateTotal().subtotal}.00</Text>
                <Text style={styles.summaryText}>Delivery Charge: ₦500.00</Text>
                <Text style={styles.totalText}>Total: ₦{calculateTotal().total}.00</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for Vendor Confirmation */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    {orderAccepted ? (
                        // Second popup: Order Accepted
                        <View style={styles.orderAcceptedBox}>
                            <Text style={styles.orderAcceptedText}>Order Accepted</Text>
                            <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToPayment}>
                                <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // First popup: Waiting for Vendor Confirmation
                        <View style={styles.modalBox}>
                            <Text style={styles.modalText}>Waiting for Vendor Confirmation...</Text>
                            <Text style={styles.modalText}>Please wait while the vendor checks availability.</Text>
                            <Icon name="hourglass" size={40} color="black" />
                        </View>
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'white' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
    orderItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'white', marginVertical: 4 },
    image: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
    details: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14, color: 'green' },
    quantityContainer: { flexDirection: 'row', alignItems: 'center' },
    button: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#552B1E', borderRadius: 15, marginHorizontal: 5 },
    buttonText: { color: 'white', fontSize: 18 },
    quantity: { fontSize: 16, fontWeight: 'bold' },
    summary: { padding: 16, backgroundColor: '#a6ce39', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    summaryText: { fontSize: 16, color: 'white' },
    totalText: { fontSize: 18, fontWeight: 'bold', color: 'white', marginVertical: 5 },
    checkoutButton: { backgroundColor: 'green', padding: 12, borderRadius: 5, alignItems: 'center' },
    checkoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalBox: { width: 365, height: 264, backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    modalText: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
    orderAcceptedBox: { width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    orderAcceptedText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    proceedButton: { backgroundColor: 'green', padding: 12, borderRadius: 5, alignItems: 'center', width: '100%' },
    proceedButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default OrderDetailsScreen;
