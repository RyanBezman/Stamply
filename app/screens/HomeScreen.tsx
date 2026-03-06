import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CityCard } from '../components/CityCard';
import { useAppStore } from '../hooks/useAppStore';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { cities, stamps, unlockCity } = useAppStore();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Browse Cities</Text>
      {cities.map((city) => {
        const stamp = stamps.find((s) => s.cityId === city.id);
        return (
          <CityCard
            key={city.id}
            city={city}
            stamp={stamp}
            onUnlock={() => unlockCity(city.id)}
            onOpen={() => stamp && navigation.navigate('StampDetail', { stampId: stamp.id })}
          />
        );
      })}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#030712' },
  content: { padding: 16 },
  title: { color: 'white', fontSize: 28, fontWeight: '800', marginBottom: 14 },
});
