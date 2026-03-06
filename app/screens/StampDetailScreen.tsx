import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { FadeInImage } from '../components/FadeInImage';
import { Skeleton } from '../components/Skeleton';
import { useAppStore } from '../hooks/useAppStore';
import { RootStackParamList } from '../types/navigation';
import { theme } from '../theme';

export const StampDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StampDetail'>>();
  const { stampId } = route.params;
  const { stamps, cities, postStampToFeed, retryStampImage, regenerateStampVariant } = useAppStore();

  const stamp = stamps.find((s) => s.id === stampId);
  if (!stamp)
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Stamp not found.</Text>
      </View>
    );

  const city = cities.find((c) => c.id === stamp.cityId);
  if (!city)
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>City not found.</Text>
      </View>
    );

  const postDisabled = stamp.status !== 'ready' || !stamp.imageUrl;

  return (
    <View style={styles.screen}>
      {stamp.status === 'generating' ? (
        <View style={styles.imageWrap}>
          <Skeleton style={styles.image} />
          <View style={styles.generatingBadge}>
            <Text style={styles.generatingText}>Generating stamp image...</Text>
          </View>
        </View>
      ) : stamp.imageUrl ? (
        <FadeInImage uri={stamp.imageUrl} style={styles.image} duration={260} />
      ) : (
        <View style={styles.image} />
      )}
      <Text style={styles.title}>{city.name}</Text>
      <Text style={styles.sub}>{city.country}</Text>

      <View style={styles.metaBox}>
        <Text style={styles.meta}>Unlocked: {new Date(stamp.unlockedAt).toLocaleString()}</Text>
        <Text style={styles.meta}>Status: {stamp.status}</Text>
        <Text style={styles.meta}>Verification: {stamp.verificationType}</Text>
      </View>

      <View style={styles.row}>
        <Pressable
          style={[styles.button, postDisabled && styles.buttonDisabled]}
          disabled={postDisabled}
          onPress={() => {
            postStampToFeed(stamp.id);
            Alert.alert('Posted', 'Stamp posted to local feed.');
          }}
        >
          <Text style={styles.buttonText}>Post to Feed</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => {
            retryStampImage(stamp.id).catch(() => undefined);
          }}
        >
          <Text style={styles.secondaryButtonText}>Retry</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.outlineButton}
        onPress={() => {
          regenerateStampVariant(stamp.id).catch(() => undefined);
        }}
      >
        <Text style={styles.outlineButtonText}>Regenerate Variant</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.bg, padding: 16 },
  imageWrap: { width: '100%', aspectRatio: 0.75, borderRadius: 20, overflow: 'hidden' },
  image: { width: '100%', aspectRatio: 0.75, borderRadius: 20, backgroundColor: '#dbeafe' },
  generatingBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(15,23,42,0.85)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  generatingText: { color: 'white', fontWeight: '700', fontSize: 12 },
  title: { color: theme.colors.text, fontSize: 30, fontWeight: '800', marginTop: 14 },
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
  row: { flexDirection: 'row', gap: 10, marginTop: 20 },
  button: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#111827', fontWeight: '800' },
  secondaryButton: {
    backgroundColor: theme.colors.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  secondaryButtonText: { color: theme.colors.text, fontWeight: '700' },
  outlineButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  outlineButtonText: { color: theme.colors.textMuted, fontWeight: '700' },
});
