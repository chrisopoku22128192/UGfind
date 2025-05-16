import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

export default function LogoutScreen({ navigation, route }) {
  // Expect setUserLoggedIn to be passed via route.params
  useEffect(() => {
    Alert.alert(
      'Logout',
      'Do you really want to logout?',
      [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => navigation.goBack(),
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            if (route.params && typeof route.params.setUserLoggedIn === 'function') {
              route.params.setUserLoggedIn(false);
            }
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 18, color: '#333' },
});