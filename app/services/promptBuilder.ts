import { CityPlace } from '../types';

export const buildCityPrompt = (place: CityPlace) => {
  const landmarks = place.landmarkKeywords.join(', ');
  return `Create a premium miniature travel diorama representing ${place.name}, ${place.country}. Include iconic landmarks strongly associated with the city: ${landmarks}. Style: collectible miniature world, highly detailed, elegant composition, soft cinematic lighting, premium travel aesthetic, mobile app hero image. No text. No watermark.`;
};
