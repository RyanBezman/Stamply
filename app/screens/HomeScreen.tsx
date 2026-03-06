import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CityCard } from '../components/CityCard';
import { useAppStore } from '../hooks/useAppStore';
import { theme } from '../theme';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { cities, stamps, unlockCity } = useAppStore();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>STAMPLY</Text>
      <Text style={styles.title}>Collect beautiful city stamps</Text>
      <Text style={styles.subtitle}>Unlock a city, generate a miniature world, and save it in your passport.</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stamps.length}</Text>
          <Text style={styles.statLabel}>Unlocked</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{cities.length - stamps.length}</Text>
          <Text style={styles.statLabel}>To explore</Text>
        </View>
      </View>

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
  screen: { flex: 1, backgroundColor: theme.colors.bg },
  content: { padding: 16 },
  kicker: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  title: { color: theme.colors.text, fontSize: 32, fontWeight: '800', marginTop: 8 },
  subtitle: { color: theme.colors.textMuted, marginTop: 6, marginBottom: 14, lineHeight: 21 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 12,
  },
  statValue: { color: theme.colors.text, fontSize: 20, fontWeight: '800' },
  statLabel: { color: theme.colors.textMuted, fontSize: 12, marginTop: 4 },
});
