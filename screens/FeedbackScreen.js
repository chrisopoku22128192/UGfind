import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert('Please enter your feedback.');
      return;
    }

    // ===== PLACE TO SEND FEEDBACK TO EMAIL/BACKEND =====
    // Example: sendFeedbackToBackend(feedback);
    // Example: sendEmailWithFeedback(feedback);
    // ================================================

    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    setFeedback('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Ionicons name="chatbubble-ellipses-outline" size={48} color="#007AFF" style={{ marginBottom: 10 }} />
          <Text style={styles.title}>Feedback</Text>
          <Text style={styles.text}>We value your feedback! Let us know your thoughts or suggestions below.</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your feedback here..."
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
          <Button title="Submit" onPress={handleSubmit} color="#007AFF" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6fa' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    margin: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#007AFF',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  input: {
    width: '100%',
    minHeight: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
});