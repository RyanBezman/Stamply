import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppStore } from '../hooks/useAppStore';
import { RootStackParamList } from '../types/navigation';
import { theme } from '../theme';

export const StampDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StampDetail'>>();
  const { stampId } = route.params;
  const { stamps, cities, postStampToFeed } = useAppStore();

  const stamp = stamps.find((s) => s.id === stampId);
  if (!stamp) return <View style={styles.screen}><Text style={styles.title}>Stamp not found.</Text></View>;

  const city = cities.find((c) => c.id === stamp.cityId);
  if (!city) return <View style={styles.screen}><Text style={styles.title}>City not found.</Text></View>;

  return (
    <View style={styles.screen}>
      {stamp.imageUrl ? <Image source={{ uri: stamp.imageUrl }} style={styles.image} /> : <View style={styles.image} />}
      <Text style={styles.title}>{city.name}</Text>
      <Text style={styles.sub}>{city.country}</Text>

      <View style={styles.metaBox}>
        <Text style={styles.meta}>Unlocked: {new Date(stamp.unlockedAt).toLocaleString()}</Text>
        <Text style={styles.meta}>Status: {stamp.status}</Text>
        <Text style={styles.meta}>Verification: {stamp.verificationType}</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          postStampToFeed(stamp.id);
          Alert.alert('Posted', 'Stamp posted to local feed.');
        }}
      >
        <Text style={styles.buttonText}>Post to Feed</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.bg, padding: 16 },
  image: { width: '100%', aspectRatio: 1, borderRadius: 20, backgroundColor: '#1f2937' },
  title: { color: 'white', fontSize: 30, fontWeight: '800', marginTop: 14 },
  sub: { color: '#cbd5e1', fontSize: 18, marginTop: 2 },
  metaBox: {
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 4,
  },
  meta: { color: '#9ca3af' },
  button: { marginTop: 20, backgroundColor: theme.colors.accent, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  buttonText: { color: '#111827', fontWeight: '800' },
});
