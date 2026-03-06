import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppStore } from '../hooks/useAppStore';
import { theme } from '../theme';

export const ProfileScreen = () => {
  const { profile, cities, stamps } = useAppStore();
  const countries = new Set(stamps.map((s) => cities.find((c) => c.id === s.cityId)?.country).filter(Boolean)).size;

  return (
    <View style={styles.screen}>
      <View style={styles.avatar}><Text style={styles.avatarText}>✈️</Text></View>
      <Text style={styles.name}>@{profile.username}</Text>
      <Text style={styles.bio}>Miniature world collector</Text>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stamps.length}</Text>
          <Text style={styles.statLabel}>Cities</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{countries}</Text>
          <Text style={styles.statLabel}>Countries</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stamps.length}</Text>
          <Text style={styles.statLabel}>Stamps</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.bg, padding: 16, alignItems: 'center' },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  avatarText: { fontSize: 34 },
  name: { color: 'white', fontWeight: '800', fontSize: 24, marginTop: 14 },
  bio: { color: '#94a3b8', marginTop: 4, marginBottom: 18 },
  stats: { width: '100%', flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: { color: theme.colors.text, fontWeight: '800', fontSize: 22 },
  statLabel: { color: theme.colors.textMuted, marginTop: 4, fontSize: 12 },
});
