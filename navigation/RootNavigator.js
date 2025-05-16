import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator({
  userLoggedIn,
  setUserLoggedIn,
  welcomeDone,
  setWelcomeDone,
  theme,
  toggleTheme
}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userLoggedIn ? (
        <Stack.Screen name="Main">
          {props => (
            <MainNavigator
              {...props}
              theme={theme}
              toggleTheme={toggleTheme}
              setUserLoggedIn={setUserLoggedIn}
            />
          )}
        </Stack.Screen>
      ) : !welcomeDone ? (
        <Stack.Screen name="Welcome">
          {props => <WelcomeScreen {...props} onDone={() => setWelcomeDone(true)} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setUserLoggedIn={setUserLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}