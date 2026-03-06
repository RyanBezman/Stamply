import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { Skeleton } from './Skeleton';

export const HomeSkeleton = () => {
  return (
    <View style={styles.wrap}>
      <Skeleton style={{ width: 80, height: 14, marginBottom: 10 }} />
      <Skeleton style={{ width: '78%', height: 34, marginBottom: 10 }} />
      <Skeleton style={{ width: '92%', height: 20, marginBottom: 18 }} />

      <View style={styles.statsRow}>
        <Skeleton style={styles.statCard} />
        <Skeleton style={styles.statCard} />
      </View>

      {[0, 1, 2].map((n) => (
        <View key={n} style={styles.cityCard}>
          <Skeleton style={styles.hero} />
          <Skeleton style={{ height: 18, width: '40%', marginTop: 12 }} />
          <Skeleton style={{ height: 12, width: '30%', marginTop: 8 }} />
          <Skeleton style={{ height: 40, width: '50%', marginTop: 14, borderRadius: theme.radius.pill }} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { padding: 16, backgroundColor: theme.colors.bg, flex: 1 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  statCard: { flex: 1, height: 74, borderRadius: theme.radius.md },
  cityCard: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: 12,
    marginBottom: 14,
  },
  hero: { width: '100%', height: 200, borderRadius: 16 },
});
