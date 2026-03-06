import { CityPlace, Stamp } from '../types';
import { buildCityPrompt } from './promptBuilder';

interface ImageProvider {
  generateCityStampImage(place: CityPlace, stylePreset?: string): Promise<string>;
  generateTripRecapImage(trip: { title: string; cities: string[] }): Promise<string>;
  regenerateVariant(stampId: string): Promise<string>;
}

const mockProvider: ImageProvider = {
  async generateCityStampImage(place) {
    return `https://picsum.photos/seed/stamply-${place.slug}/900/900`;
  },
  async generateTripRecapImage(trip) {
    return `https://picsum.photos/seed/trip-${trip.title.replace(/\s+/g, '-')}/1200/700`;
  },
  async regenerateVariant(stampId) {
    return `https://picsum.photos/seed/variant-${stampId}-${Date.now()}/900/900`;
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
