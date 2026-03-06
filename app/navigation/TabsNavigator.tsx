import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { FeedScreen } from '../screens/FeedScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PassportScreen } from '../screens/PassportScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: theme.colors.bg },
        headerTintColor: theme.colors.text,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: '#f7fbff',
          borderTopColor: '#dbeafe',
          height: 74,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: { fontWeight: '700', fontSize: 11 },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'Home') {
            return <Ionicons name={focused ? 'compass' : 'compass-outline'} size={size} color={color} />;
          }
          if (route.name === 'Passport') {
            return <MaterialCommunityIcons name={focused ? 'passport' : 'book-open-page-variant'} size={size} color={color} />;
          }
          if (route.name === 'Feed') {
            return <Ionicons name={focused ? 'sparkles' : 'sparkles-outline'} size={size} color={color} />;
          }
          return <FontAwesome6 name={focused ? 'user-large' : 'user'} size={size - 2} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Explore' }} />
      <Tab.Screen name="Passport" component={PassportScreen} options={{ title: 'Passport' }} />
      <Tab.Screen name="Feed" component={FeedScreen} options={{ title: 'Community' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'You' }} />
    </Tab.Navigator>
  );
};
