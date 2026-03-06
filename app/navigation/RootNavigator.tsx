import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StampDetailScreen } from '../screens/StampDetailScreen';
import { TabsNavigator } from './TabsNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#030712' },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: '#030712' },
        }}
      >
        <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="StampDetail" component={StampDetailScreen} options={{ title: 'Stamp Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
