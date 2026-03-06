import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StampCard } from '../components/StampCard';
import { useAppStore } from '../hooks/useAppStore';
import { theme } from '../theme';

export const PassportScreen = () => {
  const navigation = useNavigation<any>();
  const { cities, stamps } = useAppStore();
  const unlocked = stamps.length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Passport</Text>
      <View style={styles.counterWrap}>
        <Text style={styles.counterValue}>{unlocked}</Text>
        <Text style={styles.counterText}>of {cities.length} cities unlocked</Text>
      </View>

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
  screen: { flex: 1, backgroundColor: theme.colors.bg },
  content: { padding: 16 },
  title: { color: theme.colors.text, fontSize: 30, fontWeight: '800' },
  counterWrap: {
    marginTop: 10,
    marginBottom: 12,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  counterValue: {
    color: theme.colors.accentSoft,
    fontSize: 28,
    fontWeight: '800',
  },
  counterText: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});
