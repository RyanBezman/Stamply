import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { Skeleton } from './Skeleton';

export const FeedSkeleton = () => {
  return (
    <View style={styles.wrap}>
      <Skeleton style={{ width: 90, height: 34, marginBottom: 12 }} />
      <Skeleton style={{ width: '100%', height: 42, borderRadius: 10, marginBottom: 12 }} />

      {[0, 1, 2].map((n) => (
        <View key={n} style={styles.card}>
          <View style={styles.row}>
            <Skeleton style={{ width: 88, height: 18, borderRadius: 999 }} />
            <Skeleton style={{ width: 120, height: 12 }} />
          </View>
          <Skeleton style={{ width: '95%', height: 18, marginTop: 10 }} />
          <Skeleton style={{ width: '80%', height: 18, marginTop: 8 }} />
          <Skeleton style={{ width: 78, height: 32, marginTop: 12, borderRadius: 10 }} />
          <Skeleton style={{ width: '100%', height: 40, marginTop: 10, borderRadius: 10 }} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { padding: 16, backgroundColor: theme.colors.bg, flex: 1 },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
