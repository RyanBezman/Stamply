# Stamply (Frontend Prototype)

Stamply is a mobile travel passport app prototype built with **Expo + React Native + TypeScript**.

## Implemented Vertical Slice

browse city → unlock stamp (dev mode) → generate image (Nano Banana or mock fallback) → save locally → render in Passport → post to local Feed

## Tech

- React Native + Expo
- TypeScript
- React Navigation (bottom tabs + detail screen)
- Local state + AsyncStorage persistence
- Resilient image generation provider (Nano Banana + mock fallback)

## Run

```bash
npm install
npm run start
```

## Optional Nano Banana Config

Set these in your Expo env (e.g. `.env`):

```bash
EXPO_PUBLIC_NANO_BANANA_API_URL=https://your-api-url
EXPO_PUBLIC_NANO_BANANA_API_KEY=your-key
```

If not set (or API fails), app falls back to mock image URLs automatically.

## Screens

- Home (browse + unlock dev button)
- Passport (grid, locked/unlocked, counter)
- Stamp Detail (image + metadata + post action)
- Feed (local posts + like + mock comments)
- Profile (mock stats)

## Constraints honored

- No backend schema work
- No migrations
- No Supabase setup
- No production auth
