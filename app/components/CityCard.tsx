import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { buildCityPreviewImage } from '../services/imageProvider';
import { CityPlace, Stamp } from '../types';
import { theme } from '../theme';

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
      <ImageBackground source={{ uri: imageUrl }} style={styles.hero} imageStyle={styles.heroImage}>
        <View style={styles.overlay} />
        <View style={styles.topRow}>
          <Text style={styles.city}>{city.name}</Text>
          <View style={[styles.badge, unlocked ? styles.badgeReady : styles.badgeLocked]}>
            <Text style={styles.badgeText}>{unlocked ? (stamp?.status === 'ready' ? 'Unlocked' : 'Generating') : 'Locked'}</Text>
          </View>
        </View>
        <Text style={styles.country}>{city.country}</Text>
      </ImageBackground>

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
    marginBottom: 14,
    overflow: 'hidden',
  },
  hero: {
    height: 170,
    justifyContent: 'flex-end',
    padding: 14,
  },
  heroImage: {
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.45)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  city: {
    color: theme.colors.text,
    fontSize: 23,
    fontWeight: '800',
    maxWidth: '70%',
  },
  country: {
    color: '#dbeafe',
    marginTop: 4,
    fontSize: 15,
    fontWeight: '600',
    zIndex: 1,
  },
  badge: {
    borderRadius: theme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeReady: { backgroundColor: 'rgba(16, 185, 129, 0.22)' },
  badgeLocked: { backgroundColor: 'rgba(30, 41, 59, 0.75)' },
  badgeText: { color: theme.colors.text, fontSize: 11, fontWeight: '700' },
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
