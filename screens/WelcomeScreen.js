import React, { useEffect, useRef } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Animated,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';

export default function WelcomeScreen({ onDone }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Instead of navigating here, notify parent after 3 seconds
    const timeout = setTimeout(() => {
      onDone && onDone();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground
        source={require('../assets/images/UGfind.png')}
        style={styles.image}
        resizeMode="cover"
      >
        {/* Loading spinner centered on top of image */}
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { flex: 1, width: '100%', height: '100%', justifyContent: 'center' },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
