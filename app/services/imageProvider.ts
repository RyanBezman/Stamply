import { CityPlace } from '../types';
import { buildCityPrompt } from './promptBuilder';

interface ImageProvider {
  generateCityStampImage(place: CityPlace, stylePreset?: string): Promise<string>;
  generateTripRecapImage(trip: { title: string; cities: string[] }): Promise<string>;
  regenerateVariant(stampId: string): Promise<string>;
}

const buildPollinationsUrl = (prompt: string, seed: string) => {
  const encodedPrompt = encodeURIComponent(prompt);
  const encodedSeed = encodeURIComponent(seed);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${encodedSeed}&nologo=true`;
};

export const buildCityPreviewImage = (place: CityPlace) => {
  if (place.previewImageUrl) {
    return place.previewImageUrl;
  }

  const previewPrompt = `cinematic travel postcard of ${place.name}, ${place.country}, iconic skyline and landmarks, moody lighting, premium mobile app background, no text`;
  return buildPollinationsUrl(previewPrompt, `${place.slug}-preview`);
};

const mockProvider: ImageProvider = {
  async generateCityStampImage(place) {
    const prompt = buildCityPrompt(place);
    return buildPollinationsUrl(prompt, `${place.slug}-stamp`);
  },
  async generateTripRecapImage(trip) {
    const prompt = `premium travel collage, miniature city landmarks, cities: ${trip.cities.join(', ')}, elegant composition, soft cinematic lighting, no text`;
    return buildPollinationsUrl(prompt, `trip-${trip.title.replace(/\s+/g, '-')}`);
  },
  async regenerateVariant(stampId) {
    return buildPollinationsUrl(
      `premium miniature travel diorama, alternate composition, collectible style, no text`,
      `variant-${stampId}-${Date.now()}`,
    );
  },
};

const nanoProvider: ImageProvider = {
  async generateCityStampImage(place, stylePreset = 'miniature_diorama') {
    const apiUrl = process.env.EXPO_PUBLIC_NANO_BANANA_API_URL;
    const apiKey = process.env.EXPO_PUBLIC_NANO_BANANA_API_KEY;
    if (!apiUrl || !apiKey) {
      throw new Error('Nano Banana config missing');
    }

    const prompt = buildCityPrompt(place);

    const res = await fetch(`${apiUrl}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        stylePreset,
        size: '1024x1024',
      }),
    });

    if (!res.ok) {
      throw new Error(`Nano Banana failed: ${res.status}`);
    }

    const json = await res.json();
    return json.imageUrl as string;
  },

  async generateTripRecapImage(trip) {
    const city: CityPlace = {
      id: 'trip',
      name: trip.title,
      country: 'Global',
      slug: trip.title.toLowerCase().replace(/\s+/g, '-'),
      promptSeed: 'trip recap',
      landmarkKeywords: trip.cities,
      themeKeywords: ['travel', 'milestone'],
    };

    return nanoProvider.generateCityStampImage(city, 'trip_recap');
  },

  async regenerateVariant(stampId) {
    const apiUrl = process.env.EXPO_PUBLIC_NANO_BANANA_API_URL;
    const apiKey = process.env.EXPO_PUBLIC_NANO_BANANA_API_KEY;
    if (!apiUrl || !apiKey) {
      throw new Error('Nano Banana config missing');
    }

    const res = await fetch(`${apiUrl}/regenerate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ stampId }),
    });

    if (!res.ok) {
      throw new Error(`Nano Banana failed: ${res.status}`);
    }

    const json = await res.json();
    return json.imageUrl as string;
  },
};

class ResilientImageProvider implements ImageProvider {
  async generateCityStampImage(place: CityPlace, stylePreset?: string): Promise<string> {
    try {
      return await nanoProvider.generateCityStampImage(place, stylePreset);
    } catch {
      return mockProvider.generateCityStampImage(place, stylePreset);
    }
  }

  async generateTripRecapImage(trip: { title: string; cities: string[] }): Promise<string> {
    try {
      return await nanoProvider.generateTripRecapImage(trip);
    } catch {
      return mockProvider.generateTripRecapImage(trip);
    }
  }

  async regenerateVariant(stampId: string): Promise<string> {
    try {
      return await nanoProvider.regenerateVariant(stampId);
    } catch {
      return mockProvider.regenerateVariant(stampId);
    }
  }
}

export const imageProvider = new ResilientImageProvider();
