import React from 'react';
import { AppStoreProvider } from './app/hooks/useAppStore';
import { RootNavigator } from './app/navigation/RootNavigator';

export default function App() {
  return (
    <AppStoreProvider>
      <RootNavigator />
    </AppStoreProvider>
  );
}
