import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

const CheckoutPage = () => {
    const navigation = useRouter();
    // Example form states
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

    // Example submit handler
    const handleCheckout = () => {
        // Validate and proceed
        console.log({
            address,
            phoneNumber,
            cardName,
            cardNumber,
            expiryMonth,
            expiryYear,
            cvv,
        });
        // Navigate or process payment
        navigation.navigate("/status")
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBack} onPress={() => navigation?.back?.()}>
                    <Ionicons name="arrow-back" size={20} color="black" />
                    <Text style={styles.headerBackText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout Page</Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* ADDRESS Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>ADDRESS</Text>

                    {/* Your Address */}
                    <Text style={styles.label}>
                        Your Address <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Full Address"
                        multiline
                        style={styles.input}
                    />

                    {/* Phone Number */}
                    <Text style={styles.label}>
                        Phone Number <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        style={styles.input}
                    />
                </View>

                {/* PAYMENT Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.paymentHeader}>
                        <Text style={styles.sectionTitle}>Pay with Mastercard and Visa</Text>
                        <View style={styles.paymentIcons}>
                            <FontAwesome name="cc-mastercard" size={24} color="#E63946" style={styles.icon} />
                            <FontAwesome name="cc-visa" size={24} color="#023e8a" style={styles.icon} />
                        </View>
                    </View>

                    {/* Card Name */}
                    <Text style={styles.label}>Card Name</Text>
                    <TextInput
                        value={cardName}
                        onChangeText={setCardName}
                        placeholder="Name on Card"
                        style={styles.input}
                    />

                    {/* Card Number */}
                    <Text style={styles.label}>Card Number</Text>
                    <TextInput
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        placeholder="XXXX XXXX XXXX XXXX"
                        keyboardType="number-pad"
                        style={styles.input}
                    />

                    {/* Expiry & CVV Row */}
                    <View style={styles.expiryRow}>
                        {/* Expire Date (Month) */}
                        <View style={styles.expiryContainer}>
                            <Text style={styles.label}>Expire Date (MM)</Text>
                            <TextInput
                                value={expiryMonth}
                                onChangeText={setExpiryMonth}
                                placeholder="MM"
                                keyboardType="number-pad"
                                maxLength={2}
                                style={styles.input}
                            />
                        </View>
                        {/* Expire Date (Year) */}
                        <View style={styles.expiryContainer}>
                            <Text style={styles.label}>Expire Date (YY)</Text>
                            <TextInput
                                value={expiryYear}
                                onChangeText={setExpiryYear}
                                placeholder="YY"
                                keyboardType="number-pad"
                                maxLength={2}
                                style={styles.input}
                            />
                        </View>
                        {/* CVV */}
                        <View style={styles.expiryContainer}>
                            <Text style={styles.label}>CVV</Text>
                            <TextInput
                                value={cvv}
                                onChangeText={setCvv}
                                placeholder="CVV"
                                keyboardType="number-pad"
                                maxLength={3}
                                style={styles.input}
                            />
                        </View>
                    </View>
                </View>

                {/* Extra space so the bottom button isn't overlapped */}
                <View style={{ height: 120 }} />
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.bottomButton} onPress={handleCheckout}>
                    <Text style={styles.bottomButtonText}>AGREE AND CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CheckoutPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    headerBack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerBackText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#000',
    },
    headerTitle: {
        marginTop: 12,
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollView: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    sectionContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        color: '#333',
    },
    required: {
        color: 'red',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 12,
        fontSize: 14,
        color: '#000',
    },
    paymentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    paymentIcons: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 8,
    },
    expiryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    expiryContainer: {
        flex: 1,
        marginRight: 8,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: 'transparent',
    },
    bottomButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    bottomButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
