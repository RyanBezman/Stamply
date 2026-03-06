import { CityPlace } from '../types';

export const buildCityPrompt = (place: CityPlace) => {
  const landmarks = place.landmarkKeywords.join(', ');
  return `Create a premium 3D miniature travel diorama representing ${place.name}, ${place.country}. Include iconic landmarks strongly associated with the city: ${landmarks}. Style: ultra-detailed collectible city model, full-frame composition where the city takes up most of the image, polished platform base, soft daylight, premium mobile hero aesthetic, clean light background, no people, no clouds, no text, no logo, no watermark.`;
};
