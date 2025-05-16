import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LostItemsScreen from '../screens/LostItemsScreen';
import FoundItemsScreen from '../screens/FoundItemsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import HelpScreen from '../screens/HelpScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import TermsScreen from '../screens/TermsScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Lost Items" component={LostItemsScreen} />
      <Tab.Screen name="Found Items" component={FoundItemsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator({ theme, toggleTheme, setUserLoggedIn }) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings">
        {props => <SettingsScreen {...props} toggleTheme={toggleTheme} theme={theme} />}
      </Drawer.Screen>
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Contact Us" component={ContactUsScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} />
      <Drawer.Screen name="Terms of Service" component={TermsScreen} />
      <Drawer.Screen name="Privacy Policy" component={PrivacyScreen} />
       <Drawer.Screen name="Logout">
        {props => (
          <LogoutScreen
            {...props}
            route={{
              ...props.route,
              params: { setUserLoggedIn }
            }}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}