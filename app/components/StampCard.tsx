import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { CityPlace, Stamp } from '../types';
import { Skeleton } from './Skeleton';

export const StampCard = ({
  city,
  stamp,
  onPress,
}: {
  city: CityPlace;
  stamp?: Stamp;
  onPress?: () => void;
}) => {
  const unlocked = !!stamp;

  return (
    <Pressable style={styles.card} onPress={onPress} disabled={!onPress}>
      {unlocked ? (
        stamp?.status === 'generating' ? (
          <View style={styles.imageWrap}>
            <Skeleton style={styles.image} />
            <View style={styles.generatingBadge}>
              <Text style={styles.generatingText}>Generating...</Text>
            </View>
          </View>
        ) : stamp?.imageUrl ? (
          <Image source={{ uri: stamp.imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.locked]}>
            <Text style={styles.lockedText}>{stamp?.status === 'failed' ? 'Generation failed' : 'No image yet'}</Text>
          </View>
        )
      ) : (
        <View style={[styles.image, styles.locked]}>
          <Text style={styles.lockedText}>Locked</Text>
        </View>
      )}
      <Text style={styles.name}>{city.name}</Text>
      <Text style={styles.sub}>{unlocked ? stamp?.status : 'Not unlocked'}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 14,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 8,
  },
  imageWrap: { width: '100%', aspectRatio: 1, borderRadius: 10, overflow: 'hidden' },
  image: { width: '100%', aspectRatio: 1, borderRadius: 10, backgroundColor: '#1f2937' },
  generatingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(15,23,42,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  generatingText: { color: 'white', fontSize: 11, fontWeight: '700' },
  locked: { alignItems: 'center', justifyContent: 'center' },
  lockedText: { color: '#9ca3af', fontWeight: '700', textAlign: 'center', paddingHorizontal: 8 },
  name: { color: theme.colors.text, marginTop: 8, fontWeight: '700' },
  sub: { color: '#9ca3af', fontSize: 12, textTransform: 'capitalize' },
});
