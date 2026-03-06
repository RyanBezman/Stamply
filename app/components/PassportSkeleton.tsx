import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { Skeleton } from './Skeleton';

export const PassportSkeleton = () => {
  return (
    <View style={styles.wrap}>
      <Skeleton style={{ width: 140, height: 34, marginBottom: 12 }} />
      <Skeleton style={{ width: '100%', height: 66, borderRadius: theme.radius.md, marginBottom: 14 }} />
      <View style={styles.grid}>
        {[...Array(6)].map((_, i) => (
          <View key={i} style={styles.card}>
            <Skeleton style={styles.img} />
            <Skeleton style={{ height: 14, width: '65%', marginTop: 8 }} />
            <Skeleton style={{ height: 10, width: '45%', marginTop: 6 }} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { padding: 16, backgroundColor: theme.colors.bg, flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%',
    marginBottom: 14,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 8,
  },
  img: { width: '100%', aspectRatio: 1, borderRadius: 10 },
});
