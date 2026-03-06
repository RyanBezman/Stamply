import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import seedCities from '../../data/seedCities.json';
import { imageProvider } from '../services/imageProvider';
import { CityPlace, FeedPost, Stamp, UserProfile } from '../types';

type AppState = {
  cities: CityPlace[];
  stamps: Stamp[];
  feedPosts: FeedPost[];
  profile: UserProfile;
  hydrated: boolean;
  unlockCity: (cityId: string) => Promise<void>;
  retryStampImage: (stampId: string) => Promise<void>;
  regenerateStampVariant: (stampId: string) => Promise<void>;
  postStampToFeed: (stampId: string) => void;
  createTripRecapPost: () => Promise<void>;
  likePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
};

const AppStoreContext = createContext<AppState | null>(null);

const STORAGE_KEY = 'stamply_state_v2';

const isValidStatus = (status: unknown): status is Stamp['status'] => {
  return status === 'generating' || status === 'ready' || status === 'failed';
};

const normalizeStamp = (value: any): Stamp | null => {
  if (!value || typeof value !== 'object') return null;
  if (typeof value.id !== 'string' || typeof value.cityId !== 'string') return null;
  if (!isValidStatus(value.status)) return null;

  return {
    id: value.id,
    cityId: value.cityId,
    imageUrl: typeof value.imageUrl === 'string' ? value.imageUrl : undefined,
    status: value.status,
    unlockedAt: typeof value.unlockedAt === 'string' ? value.unlockedAt : new Date().toISOString(),
    verificationType: 'manual_dev',
  };
};

const normalizeFeedPost = (value: any): FeedPost | null => {
  if (!value || typeof value !== 'object') return null;
  if (typeof value.id !== 'string' || typeof value.text !== 'string') return null;

  return {
    id: value.id,
    type: value.type === 'trip_recap' || value.type === 'milestone' ? value.type : 'unlocked_stamp',
    stampId: typeof value.stampId === 'string' ? value.stampId : undefined,
    text: value.text,
    createdAt: typeof value.createdAt === 'string' ? value.createdAt : new Date().toISOString(),
    likes: typeof value.likes === 'number' ? value.likes : 0,
    comments: Array.isArray(value.comments)
      ? value.comments
          .map((c: any) => ({ id: typeof c?.id === 'string' ? c.id : `c-${Date.now()}`, text: String(c?.text ?? '') }))
          .filter((c: { id: string; text: string }) => c.text.trim().length > 0)
      : [],
  };
};

export const AppStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const cities = seedCities as CityPlace[];

  const generateImageForStamp = async (stampId: string, mode: 'default' | 'variant' = 'default') => {
    const existingStamp = stamps.find((s) => s.id === stampId);
    if (!existingStamp) return;

    const city = cities.find((c) => c.id === existingStamp.cityId);
    if (!city) return;

    setStamps((prev) => prev.map((s) => (s.id === stampId ? { ...s, status: 'generating' } : s)));

    try {
      const imageUrl =
        mode === 'variant'
          ? await imageProvider.regenerateVariant(stampId)
          : await imageProvider.generateCityStampImage(city, 'miniature_diorama');

      setStamps((prev) => prev.map((s) => (s.id === stampId ? { ...s, imageUrl, status: 'ready' } : s)));
    } catch {
      setStamps((prev) => prev.map((s) => (s.id === stampId ? { ...s, status: 'failed' } : s)));
    }
  };

  useEffect(() => {
    const hydrate = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setHydrated(true);
          return;
        }

        const parsed = JSON.parse(raw);
        const parsedStamps = Array.isArray(parsed?.stamps) ? parsed.stamps.map(normalizeStamp).filter(Boolean) as Stamp[] : [];
        const parsedFeedPosts = Array.isArray(parsed?.feedPosts)
          ? parsed.feedPosts.map(normalizeFeedPost).filter(Boolean) as FeedPost[]
          : [];

        setStamps(parsedStamps);
        setFeedPosts(parsedFeedPosts);
      } catch {
        // Corrupt local state should never break app startup.
        setStamps([]);
        setFeedPosts([]);
      } finally {
        setHydrated(true);
      }
    };

    hydrate();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ stamps, feedPosts })).catch(() => undefined);
  }, [stamps, feedPosts, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    // Heal stale "generating" states from app restarts/network blips.
    const staleGenerating = stamps.filter((s) => s.status === 'generating');
    staleGenerating.forEach((stamp) => {
      generateImageForStamp(stamp.id).catch(() => undefined);
    });
    // intentionally runs when hydration settles
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const unlockCity = async (cityId: string) => {
    const city = cities.find((c) => c.id === cityId);
    if (!city) return;

    const existing = stamps.find((s) => s.cityId === cityId);
    if (existing) {
      if (existing.status === 'failed') {
        await generateImageForStamp(existing.id);
      }
      return;
    }

    const newStamp: Stamp = {
      id: `${cityId}-${Date.now()}`,
      cityId,
      status: 'generating',
      unlockedAt: new Date().toISOString(),
      verificationType: 'manual_dev',
    };

    setStamps((prev) => [newStamp, ...prev]);
    await generateImageForStamp(newStamp.id);
  };

  const retryStampImage = async (stampId: string) => {
    await generateImageForStamp(stampId);
  };

  const regenerateStampVariant = async (stampId: string) => {
    await generateImageForStamp(stampId, 'variant');
  };

  const postStampToFeed = (stampId: string) => {
    const stamp = stamps.find((s) => s.id === stampId);
    if (!stamp || stamp.status !== 'ready' || !stamp.imageUrl) return;

    const city = cities.find((c) => c.id === stamp.cityId);
    if (!city) return;

    const alreadyPosted = feedPosts.some((p) => p.type === 'unlocked_stamp' && p.stampId === stampId);
    if (alreadyPosted) return;

    const post: FeedPost = {
      id: `post-${Date.now()}`,
      type: 'unlocked_stamp',
      stampId,
      text: `Unlocked ${city.name}, ${city.country} ✨`,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    setFeedPosts((prev) => [post, ...prev]);
  };

  const createTripRecapPost = async () => {
    const readyStamps = stamps.filter((s) => s.status === 'ready');
    if (readyStamps.length < 2) return;

    const recent = readyStamps.slice(0, 3);
    const recapCities = recent
      .map((stamp) => cities.find((c) => c.id === stamp.cityId)?.name)
      .filter(Boolean) as string[];

    if (recapCities.length === 0) return;

    const recapTitle = `${recapCities[0]} + ${Math.max(recapCities.length - 1, 0)} more`;
    const recapImage = await imageProvider.generateTripRecapImage({ title: recapTitle, cities: recapCities });

    const post: FeedPost = {
      id: `trip-${Date.now()}`,
      type: 'trip_recap',
      text: `Trip recap: ${recapCities.join(' • ')}`,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: recapImage ? [{ id: `c-${Date.now()}`, text: `Recap image: ${recapImage}` }] : [],
    };

    setFeedPosts((prev) => [post, ...prev]);
  };

  const likePost = (postId: string) => {
    setFeedPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)));
  };

  const addComment = (postId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setFeedPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, { id: `c-${Date.now()}`, text: trimmed }] } : p,
      ),
    );
  };

  const value = useMemo<AppState>(
    () => ({
      cities,
      stamps,
      feedPosts,
      profile: { username: 'stamply_traveler' },
      hydrated,
      unlockCity,
      retryStampImage,
      regenerateStampVariant,
      postStampToFeed,
      createTripRecapPost,
      likePost,
      addComment,
    }),
    [cities, stamps, feedPosts, hydrated],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
};

export const useAppStore = () => {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
};
