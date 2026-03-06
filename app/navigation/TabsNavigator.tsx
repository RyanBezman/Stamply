import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { FeedScreen } from '../screens/FeedScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PassportScreen } from '../screens/PassportScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#030712' },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: '#030712', borderTopColor: '#1f2937' },
        tabBarActiveTintColor: '#f59e0b',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Passport" component={PassportScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
