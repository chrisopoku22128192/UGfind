import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#111' }]}>
        Welcome to UGfind Home!
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? '#aaa' : '#444' }]}>
        Navigate through the tabs below to explore lost items, found items, and your profile.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center' },
});
