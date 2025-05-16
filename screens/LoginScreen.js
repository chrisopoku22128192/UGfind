import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ setUserLoggedIn }) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Updated login handler using setUserLoggedIn
  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      // Simulate successful login
    //    navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'MainApp' }],
    // });
      setUserLoggedIn(true);
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111' : '#fff' }]}>
      {/* UGfind Header */}
      <Text style={styles.brand}>
        <Text style={styles.brandUG}>UG</Text>
        <Text style={styles.brandFind}>find 🔍</Text>
      </Text>

      <Text style={[styles.subtitle, { color: isDark ? '#aaa' : '#444' }]}>
        Helping students find their lost items quickly on campus.
      </Text>

      {/* Login Form */}
      <TextInput
        style={[styles.input, { backgroundColor: isDark ? '#333' : '#eee' }]}
        placeholder="School Email"
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { backgroundColor: isDark ? '#333' : '#eee' }]}
        placeholder="Password"
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up link */}
      <View style={styles.signupContainer}>
        <Text style={{ color: isDark ? '#ccc' : '#333' }}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: '#00274D', fontWeight: '600' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  brand: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  brandUG: {
    color: '#00274D', // UG blue
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
  },
  brandFind: {
    color: '#DAA520', // Gold
    fontWeight: 'normal',
    fontFamily: 'Times New Roman',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#DAA520',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
