import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CityPlace, Stamp } from '../types';

export const CityCard = ({
  city,
  stamp,
  onUnlock,
  onOpen,
}: {
  city: CityPlace;
  stamp?: Stamp;
  onUnlock: () => void;
  onOpen: () => void;
}) => {
  const unlocked = Boolean(stamp);

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city.name}</Text>
      <Text style={styles.country}>{city.country}</Text>
      <View style={styles.row}>
        {unlocked ? (
          <Pressable style={styles.secondaryBtn} onPress={onOpen}>
            <Text style={styles.secondaryTxt}>View Stamp</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.primaryBtn} onPress={onUnlock}>
            <Text style={styles.primaryTxt}>Unlock (dev)</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#111827', borderRadius: 14, padding: 14, marginBottom: 12 },
  city: { color: 'white', fontSize: 18, fontWeight: '700' },
  country: { color: '#9ca3af', marginTop: 2, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'flex-start' },
  primaryBtn: { backgroundColor: '#f59e0b', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  primaryTxt: { color: '#111827', fontWeight: '700' },
  secondaryBtn: { backgroundColor: '#374151', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  secondaryTxt: { color: 'white', fontWeight: '600' },
});
