export type VerificationType = 'manual_dev';

export interface CityPlace {
  id: string;
  name: string;
  country: string;
  slug: string;
  promptSeed: string;
  landmarkKeywords: string[];
  themeKeywords: string[];
  previewImageUrl?: string;
}

export interface Stamp {
  id: string;
  cityId: string;
  imageUrl?: string;
  status: 'generating' | 'ready' | 'failed';
  unlockedAt: string;
  verificationType: VerificationType;
}

export type FeedPostType = 'unlocked_stamp' | 'trip_recap' | 'milestone';

export interface FeedPost {
  id: string;
  type: FeedPostType;
  stampId?: string;
  text: string;
  createdAt: string;
  likes: number;
  comments: { id: string; text: string }[];
}

export interface UserProfile {
  username: string;
  avatarUrl?: string;
}
