import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function PrivacyScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.sectionTitle}>1. Information Collection</Text>
        <Text style={styles.text}>
          We collect information you provide when you use UGfind, such as your name, email, and details about lost or found items.
        </Text>
        <Text style={styles.sectionTitle}>2. Use of Information</Text>
        <Text style={styles.text}>
          Your information is used to help connect users and improve the platform. We do not sell your data to third parties.
        </Text>
        <Text style={styles.sectionTitle}>3. Data Security</Text>
        <Text style={styles.text}>
          We take reasonable measures to protect your data, but cannot guarantee absolute security.
        </Text>
        <Text style={styles.sectionTitle}>4. Changes to Policy</Text>
        <Text style={styles.text}>
          We may update this policy. Continued use of UGfind means you accept the new policy.
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