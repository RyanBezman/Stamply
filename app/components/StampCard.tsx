import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CityPlace, Stamp } from '../types';

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
      {unlocked && stamp?.imageUrl ? (
        <Image source={{ uri: stamp.imageUrl }} style={styles.image} />
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
  card: { width: '48%', marginBottom: 12 },
  image: { width: '100%', aspectRatio: 1, borderRadius: 12, backgroundColor: '#1f2937' },
  locked: { alignItems: 'center', justifyContent: 'center' },
  lockedText: { color: '#9ca3af', fontWeight: '700' },
  name: { color: 'white', marginTop: 8, fontWeight: '700' },
  sub: { color: '#9ca3af', fontSize: 12, textTransform: 'capitalize' },
});
