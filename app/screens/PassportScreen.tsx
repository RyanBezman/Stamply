import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StampCard } from '../components/StampCard';
import { useAppStore } from '../hooks/useAppStore';

export const PassportScreen = () => {
  const navigation = useNavigation<any>();
  const { cities, stamps } = useAppStore();
  const unlocked = stamps.length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Passport</Text>
      <Text style={styles.subtitle}>{unlocked}/{cities.length} unlocked</Text>
      <View style={styles.grid}>
        {cities.map((city) => {
          const stamp = stamps.find((s) => s.cityId === city.id);
          return (
            <StampCard
              key={city.id}
              city={city}
              stamp={stamp}
              onPress={stamp ? () => navigation.navigate('StampDetail', { stampId: stamp.id }) : undefined}
            />
          );
        })}
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#030712' },
  content: { padding: 16 },
  title: { color: 'white', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#9ca3af', marginTop: 4, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});
