import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HelpScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Ionicons name="help-circle-outline" size={48} color="#007AFF" style={{ marginBottom: 10 }} />
        <Text style={styles.title}>Help & FAQs</Text>
        <Text style={styles.sectionTitle}>How do I report a lost item?</Text>
        <Text style={styles.text}>
          Go to the "Lost Items" tab and tap the "+" button to submit details about your lost item.
        </Text>
        <Text style={styles.sectionTitle}>How do I report a found item?</Text>
        <Text style={styles.text}>
          Go to the "Found Items" tab and tap the "+" button to submit details about the item you found.
        </Text>
        <Text style={styles.sectionTitle}>How do I edit my profile?</Text>
        <Text style={styles.text}>
          Tap the "Profile" tab, then tap "Edit Profile" to update your information or profile picture.
        </Text>
        <Text style={styles.sectionTitle}>Need more help?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Contact Us')}>
          <Text style={styles.link}>Contact Us</Text>
        </TouchableOpacity>
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
    marginBottom: 18,
    color: '#007AFF',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    color: '#222',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
    lineHeight: 22,
  },
  link: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 8,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});