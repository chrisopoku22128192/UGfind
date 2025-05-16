import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../assets/images/UGfind.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>About UGfind</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>UGfind</Text> is a platform to help students and staff of the University of Ghana find and report lost and found items on campus.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Developers:</Text> A group of Level 200 students, University of Ghana.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Version:</Text> 1.0.0
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: 18,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 14,
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
  bold: {
    fontWeight: 'bold',
    color: '#002147',
  },
});