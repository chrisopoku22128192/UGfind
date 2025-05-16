import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator
        userLoggedIn={userLoggedIn}
        setUserLoggedIn={setUserLoggedIn}
        welcomeDone={welcomeDone}
        setWelcomeDone={setWelcomeDone}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </NavigationContainer>
  );
}