import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRouter} from "expo-router";
import {addData, setData} from "@/firebaseService";
import {SafeAreaView} from "react-native-safe-area-context";

// Firestore imports

const FeedbackScreen = ( ) => {
    const [feedback, setFeedback] = useState('');
    const navigation = useRouter();

    const handleSubmit = async () => {
        // Basic validation
        if (!feedback.trim()) {
            showToast('Please enter a review before submitting');
            return;
        }

        try {
            // Save feedback to Firestore (in a 'feedback' collection)
            await addData('feedback', {
                feedback,
            });

            showToast('Feedback submitted successfully!');

            // Reset the text area
            setFeedback('');
            // Navigate back or to another screen if desired
            navigation.back();
        } catch (error) {
            console.error('Error saving feedback:', error);
            showToast('Failed to submit feedback. Please try again.');
        }
    };

    // Cross-platform toast helper
    const showToast = (message: any) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            // Fallback for iOS (use an Alert or a toast library)
            // Example using Alert:
            // Alert.alert('Feedback', message);
            console.log(message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBack} onPress={() => navigation?.back?.()}>
                    <Ionicons name="arrow-back" size={20} color="black" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Feedback</Text>
            </View>

            {/* Question */}
            <Text style={styles.question}>How was the delivery experience?</Text>

            {/* Feedback TextArea */}
            <TextInput
                style={styles.textArea}
                value={feedback}
                onChangeText={setFeedback}
                placeholder="Enter your review for this service"
                multiline
            />

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
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
    question: {
        marginTop: 20,
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    textArea: {
        minHeight: 100,
        borderColor: '#4CAF50',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        textAlignVertical: 'top', // ensures multiline text starts at top-left
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});
