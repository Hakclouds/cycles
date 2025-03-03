import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";

const steps = [
    {
        title: 'Order Confirmed',
        subtitle: 'Your order has been received',
    },
    {
        title: 'Order is being prepared',
        subtitle: 'Your food is getting prepared',
    },
    {
        title: 'Order Prepared',
        subtitle: 'Your order has been prepared',
    },
    {
        title: 'Delivery in process',
        subtitle: 'Hang on, your food is on the way',
    },
    {
        title: 'Delivery successfully done',
        subtitle: 'Enjoy your food',
    },
];

const OrderStatusScreen = () => {
    
    const navigation = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const lastStepIndex = steps.length - 1;

    useEffect(() => {
        // Increment step every 5 seconds until the last step
        const interval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev < lastStepIndex) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Check if we've reached the last step
    const isAllComplete = currentStep === lastStepIndex;

    const handleProceed = () => {
        // Navigate to the next screen or do any final action
        navigation.navigate('/feedback');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBack} onPress={() => navigation?.back()}>
                    <Ionicons name="arrow-back" size={20} color="black" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order Status</Text>
            </View>

            {/* Instruction */}
            <Text style={styles.trackText}>Track your order</Text>

            {/* Steps */}
            <View style={styles.stepsContainer}>
                {steps.map((step, index) => {
                    const isActive = index <= currentStep; // if step is active or completed

                    return (
                        <View key={index} style={styles.stepRow}>
                            {/* Left Column: Circle + Vertical Line */}
                            <View style={styles.stepColumn}>
                                {/* Circle */}
                                <View
                                    style={[
                                        styles.circle,
                                        isActive ? styles.circleActive : styles.circleInactive,
                                    ]}
                                />
                                {/* Vertical line below the circle (except the last step) */}
                                {index < lastStepIndex && (
                                    <View
                                        style={[
                                            styles.verticalLine,
                                            isActive ? styles.lineActive : styles.lineInactive,
                                        ]}
                                    />
                                )}
                            </View>

                            {/* Right Column: Text */}
                            <View style={styles.textContainer}>
                                <Text style={styles.stepTitle}>{step.title}</Text>
                                <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* Proceed Button (visible only when all steps are complete) */}
            {isAllComplete && (
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                        <Text style={styles.proceedButtonText}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default OrderStatusScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    /* Header */
    header: {
        paddingTop: 16,
        paddingBottom: 8,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
    },
    headerBack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: 8,
        fontSize: 14,
    },
    headerTitle: {
        marginTop: 12,
        fontSize: 18,
        fontWeight: 'bold',
    },

    /* Instruction Text */
    trackText: {
        fontSize: 16,
        marginTop: 16,
        marginBottom: 8,
        color: '#000',
    },

    /* Steps */
    stepsContainer: {
        marginTop: 8,
        marginBottom: 24,
    },
    stepRow: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    stepColumn: {
        width: 30, // space for the circle + line
        alignItems: 'center',
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
    },
    circleActive: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    circleInactive: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
    },
    verticalLine: {
        width: 2,
        height: 40,
        marginTop: 2, // small spacing below circle
    },
    lineActive: {
        backgroundColor: '#4CAF50',
    },
    lineInactive: {
        backgroundColor: '#ccc',
    },
    textContainer: {
        marginLeft: 16,
        flexShrink: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#000',
    },
    stepSubtitle: {
        fontSize: 14,
        color: '#666',
    },

    /* Footer (Proceed Button) */
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
    },
    proceedButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    proceedButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
