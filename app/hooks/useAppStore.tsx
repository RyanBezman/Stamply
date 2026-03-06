import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import seedCities from '../../data/seedCities.json';
import { CityPlace, FeedPost, Stamp, UserProfile } from '../types';
import { imageProvider } from '../services/imageProvider';

type AppState = {
  cities: CityPlace[];
  stamps: Stamp[];
  feedPosts: FeedPost[];
  profile: UserProfile;
  unlockCity: (cityId: string) => Promise<void>;
  postStampToFeed: (stampId: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
};

const AppStoreContext = createContext<AppState | null>(null);

const STORAGE_KEY = 'stamply_state_v1';

export const AppStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const cities = seedCities as CityPlace[];

  useEffect(() => {
    const hydrate = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setStamps(parsed.stamps ?? []);
          setFeedPosts(parsed.feedPosts ?? []);
        }
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

  const unlockCity = async (cityId: string) => {
    const city = cities.find((c) => c.id === cityId);
    if (!city) return;

    const existing = stamps.find((s) => s.cityId === cityId);
    if (existing) return;

    const newStamp: Stamp = {
      id: `${cityId}-${Date.now()}`,
      cityId,
      status: 'generating',
      unlockedAt: new Date().toISOString(),
      verificationType: 'manual_dev',
    };

    setStamps((prev) => [newStamp, ...prev]);

    try {
      const imageUrl = await imageProvider.generateCityStampImage(city, 'miniature_diorama');
      setStamps((prev) => prev.map((s) => (s.id === newStamp.id ? { ...s, imageUrl, status: 'ready' } : s)));
    } catch {
      setStamps((prev) => prev.map((s) => (s.id === newStamp.id ? { ...s, status: 'failed' } : s)));
    }
  };

  const postStampToFeed = (stampId: string) => {
    const stamp = stamps.find((s) => s.id === stampId);
    if (!stamp) return;

    const city = cities.find((c) => c.id === stamp.cityId);
    if (!city) return;

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

  const likePost = (postId: string) => {
    setFeedPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)));
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    setFeedPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, { id: `c-${Date.now()}`, text }] } : p,
      ),
    );
  };

  const value = useMemo<AppState>(
    () => ({
      cities,
      stamps,
      feedPosts,
      profile: { username: 'stamply_traveler' },
      unlockCity,
      postStampToFeed,
      likePost,
      addComment,
    }),
    [cities, stamps, feedPosts],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
};

export const useAppStore = () => {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
};
