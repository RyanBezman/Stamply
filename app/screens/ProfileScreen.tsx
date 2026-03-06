import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppStore } from '../hooks/useAppStore';

export const ProfileScreen = () => {
  const { profile, cities, stamps } = useAppStore();
  const countries = new Set(stamps.map((s) => cities.find((c) => c.id === s.cityId)?.country).filter(Boolean)).size;

  return (
    <View style={styles.screen}>
      <View style={styles.avatar}><Text style={styles.avatarText}>🙂</Text></View>
      <Text style={styles.name}>@{profile.username}</Text>
      <Text style={styles.meta}>Cities: {stamps.length}</Text>
      <Text style={styles.meta}>Countries: {countries}</Text>
      <Text style={styles.meta}>Stamps: {stamps.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#030712', padding: 16, alignItems: 'center' },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#1f2937', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  avatarText: { fontSize: 34 },
  name: { color: 'white', fontWeight: '800', fontSize: 24, marginTop: 14 },
  meta: { color: '#9ca3af', marginTop: 8, fontSize: 16 },
});
