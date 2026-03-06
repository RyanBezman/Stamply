import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StampDetailScreen } from '../screens/StampDetailScreen';
import { theme } from '../theme';
import { TabsNavigator } from './TabsNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.bg },
          headerTintColor: theme.colors.text,
          contentStyle: { backgroundColor: theme.colors.bg },
        }}
      >
        <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="StampDetail" component={StampDetailScreen} options={{ title: 'Stamp Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
