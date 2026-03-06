import { CityPlace } from '../types';

export const buildCityPrompt = (place: CityPlace) => {
  const landmarks = place.landmarkKeywords.join(', ');
  return `Create a premium miniature travel diorama representing ${place.name}, ${place.country}. Include iconic landmarks strongly associated with the city: ${landmarks}. Style: collectible miniature world on a small platform base, highly detailed architecture, elegant composition, subtle depth of field, soft cinematic lighting, polished weather-app style hero image, no text, no logo, no watermark.`;
};
