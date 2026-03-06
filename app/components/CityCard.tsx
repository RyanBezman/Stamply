import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { buildCityPreviewImage } from '../services/imageProvider';
import { theme } from '../theme';
import { CityPlace, Stamp } from '../types';
import { Skeleton } from './Skeleton';

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
  const imageUrl = stamp?.imageUrl || buildCityPreviewImage(city);

  return (
    <View style={styles.card}>
      {stamp?.status === 'generating' ? (
        <View style={styles.heroWrap}>
          <Skeleton style={styles.hero} />
          <View style={styles.overlayGenerating} />
          <View style={styles.topRowFloating}>
            <Text style={styles.city}>{city.name}</Text>
            <View style={[styles.badge, styles.badgeLocked]}>
              <Text style={styles.badgeText}>Generating</Text>
            </View>
          </View>
          <Text style={styles.countryFloating}>{city.country}</Text>
        </View>
      ) : (
        <ImageBackground source={{ uri: imageUrl }} style={styles.hero} imageStyle={styles.heroImage}>
          <View style={styles.overlay} />
          <View style={styles.topRow}>
            <Text style={styles.city}>{city.name}</Text>
            <View style={[styles.badge, unlocked ? styles.badgeReady : styles.badgeLocked]}>
              <Text style={styles.badgeText}>
                {unlocked
                  ? stamp?.status === 'ready'
                    ? 'Unlocked'
                    : stamp?.status === 'failed'
                      ? 'Retry needed'
                      : 'Generating'
                  : 'Locked'}
              </Text>
            </View>
          </View>
          <Text style={styles.country}>{city.country}</Text>
        </ImageBackground>
      )}

      <View style={styles.actions}>
        {unlocked ? (
          <Pressable style={styles.secondaryBtn} onPress={onOpen}>
            <Text style={styles.secondaryTxt}>Open stamp</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.primaryBtn} onPress={onUnlock}>
            <Text style={styles.primaryTxt}>Unlock stamp</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  heroWrap: {
    height: 320,
    position: 'relative',
    justifyContent: 'space-between',
    padding: 14,
  },
  hero: {
    height: 320,
    justifyContent: 'space-between',
    padding: 14,
  },
  heroImage: {
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  overlayGenerating: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  topRowFloating: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  city: {
    color: '#0f172a',
    fontSize: 24,
    fontWeight: '800',
    maxWidth: '70%',
  },
  country: {
    color: '#334155',
    marginTop: 4,
    fontSize: 15,
    fontWeight: '700',
    zIndex: 1,
  },
  countryFloating: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    color: '#334155',
    fontSize: 15,
    fontWeight: '700',
    zIndex: 2,
  },
  badge: {
    borderRadius: theme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeReady: { backgroundColor: 'rgba(16, 185, 129, 0.18)' },
  badgeLocked: { backgroundColor: 'rgba(15, 23, 42, 0.14)' },
  badgeText: { color: '#0f172a', fontSize: 11, fontWeight: '800' },
  actions: {
    padding: 14,
    paddingTop: 12,
  },
  primaryBtn: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
  },
  primaryTxt: { color: '#111827', fontWeight: '800' },
  secondaryBtn: {
    backgroundColor: theme.colors.surfaceSoft,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
  },
  secondaryTxt: { color: theme.colors.text, fontWeight: '700' },
});
