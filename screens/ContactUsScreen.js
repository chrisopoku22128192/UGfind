import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function ContactUsScreen() {
  const whatsappNumber = '+233599289124'; // Replace with your WhatsApp number
  const whatsappMessage = 'Hello UGfind team!';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="mail-outline" size={48} color="#002147" style={{ marginBottom: 10 }} />
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.text}>
          Have questions, suggestions, or need help? Reach out to the UGfind team!
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:ugfindteam@gmail.com')}>
          <Text style={styles.link}>ugfindteam@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('tel:+233501234567')}>
          <Text style={styles.link}>+233 50 123 4567</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={() =>
            Linking.openURL(
              `https://wa.me/${whatsappNumber.replace(
                /[^\d]/g,
                ''
              )}?text=${encodeURIComponent(whatsappMessage)}`
            )
          }
        >
          <FontAwesome name="whatsapp" size={20} color="#25D366" />
          <Text style={styles.whatsappText}>Chat on WhatsApp</Text>
        </TouchableOpacity>
        <Text style={styles.textSmall}>
          University of Ghana, Legon Campus
        </Text>
      </View>
    </View>
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
    color: '#002147',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  textSmall: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 6,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#e8f5e9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  whatsappText: {
    color: '#25D366',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});