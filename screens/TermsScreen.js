import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function TermsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By using UGfind, you agree to abide by these Terms of Service and all applicable laws and regulations.
        </Text>
        <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
        <Text style={styles.text}>
          You agree to provide accurate information and not to misuse the platform for fraudulent or harmful purposes.
        </Text>
        <Text style={styles.sectionTitle}>3. Privacy</Text>
        <Text style={styles.text}>
          Your personal information will be handled according to our Privacy Policy.
        </Text>
        <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
        <Text style={styles.text}>
          UGfind is not responsible for lost or found items, nor for any damages resulting from use of the app.
        </Text>
        <Text style={styles.sectionTitle}>5. Changes to Terms</Text>
        <Text style={styles.text}>
          We may update these terms at any time. Continued use of the app means you accept the new terms.
        </Text>
        <Text style={styles.textSmall}>
          For questions, contact us via the "Contact Us" page.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6fa', paddingVertical: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    margin: 24,
    alignItems: 'flex-start',
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
    marginBottom: 18,
    color: '#007AFF',
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    color: '#222',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  textSmall: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
});