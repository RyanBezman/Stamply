# AGENTS.md — Stamply

## Project Overview
Stamply is a mobile travel passport app where users collect digital stamps for places they visit.

Each unlocked place generates an AI miniature “city stamp” image using Nano Banana (or a mock fallback). Users store stamps in a Passport collection and can share them in a social feed.

The goal right now is a frontend prototype demonstrating the core product loop.

---

## Core Product Loop
browse city → unlock stamp → generate image → save locally → view in Passport → post to Feed

The prototype is considered complete when this loop works end-to-end.

---

## Hard Constraints
Agents must follow these rules:
- Do NOT create or modify backend database schemas
- Do NOT run migrations
- Do NOT create Supabase tables
- Do NOT implement backend infrastructure
- Do NOT implement production auth systems
- Do NOT make irreversible infrastructure changes

If a feature normally requires backend work:
Replace it with a mock or local implementation and continue.

---

## Technology Stack
### Frontend
- React Native
- Expo
- TypeScript

### Local persistence
- in-memory state
- optional AsyncStorage

### Image generation
- Nano Banana provider
- mock fallback provider

Architecture should remain production-ready even if data is mocked.

---

## Project Structure
Use this structure:

```text
stamply/
├─ AGENTS.md
├─ README.md
├─ package.json
├─ app.json
├─ app/
│  ├─ components/
│  ├─ screens/
│  ├─ navigation/
│  ├─ services/
│  ├─ hooks/
│  └─ types/
├─ data/
│  └─ seedCities.json
├─ assets/
└─ docs/
```

---

## Seed Cities
Seed sample cities:
- New York
- Paris
- Tokyo
- Rome
- London
- Los Angeles
- Barcelona
- Miami
- Amsterdam
- Dubai

Each place should include:
- id
- name
- country
- slug
- promptSeed
- landmarkKeywords
- themeKeywords

---

## Image Generation System
Create an abstraction layer:
- `imageProvider.generateCityStampImage(place, stylePreset)`
- `imageProvider.generateTripRecapImage(trip)`
- `imageProvider.regenerateVariant(stampId)`

If Nano Banana API is configured → use it.
If Nano Banana is NOT configured → use a mock provider.

The app must never fail if the provider is unavailable.

---

## City Stamp Prompt Style
Images should look like collectible miniature worlds.

Style:
- miniature travel diorama
- recognizable landmarks
- premium collectible aesthetic
- soft cinematic lighting
- centered composition
- no text
- no watermark

Prompt example:

Create a premium miniature travel diorama representing {{city}}, {{country}}. Include iconic landmarks strongly associated with the city: {{landmarks}}. Style: collectible miniature world, highly detailed, elegant composition, soft cinematic lighting, premium travel aesthetic, mobile app hero image. No text. No watermark.

---

## Screens
Include these screens:
- Home
- Passport
- Stamp Detail
- Feed
- Profile

Use bottom tab navigation.

---

## Unlock Stamp Flow
Users must be able to unlock a city stamp.

For the prototype:
- unlocking occurs via dev mode button
- verificationType = manual_dev

System flow:
1. create stamp locally
2. trigger image generation
3. save result
4. display in Passport

---

## Passport Screen
Display collected stamps.

Features:
- grid layout
- locked vs unlocked cities
- completion counter
- stamp cards with generated images

---

## Stamp Detail Screen
Show:
- large image
- place name
- country
- unlock date
- share/post action

---

## Feed
Local feed only.

Posts may include:
- unlocked stamp
- trip recap
- milestone

Support:
- like
- comment (mock)

---

## Profile
Profile screen displays:
- avatar placeholder
- username
- city count
- country count
- stamp count
- stamp grid

Use mock profile data.

---

## Autonomy Rules
Agents should work autonomously.

Do NOT pause between tasks.
Do NOT ask for confirmation unless:
- a required API key is missing
- an irreversible infrastructure change would occur

---

## Execution Loop
Agents should run this loop:
1. create todo list
2. implement next task
3. run type checks / build
4. fix errors automatically
5. update todo list
6. continue

Repeat until done.

---

## Definition of Done
The prototype is complete when:
- Expo app runs locally
- sample cities appear
- user can unlock a city stamp
- stamp triggers image generation
- generated image appears in Passport
- stamp detail page works
- stamp can be posted to Feed

No backend infrastructure should exist.

---

## Fallback Rules
If any service is unavailable:
replace with mock implementation and continue.

Example:
If Nano Banana is unavailable → use placeholder images.

---

## Engineering Guidelines
Prefer:
- reusable components
- typed interfaces
- modular services

Avoid:
- monolithic files
- tightly coupled logic
- premature optimization

Focus on shipping the vertical slice.

---

## Development Priority
Implement features in this order:
1. app shell + navigation
2. seed data
3. unlock stamp flow
4. image generation system
5. passport UI
6. stamp detail
7. feed
8. profile
9. polish

Do not jump ahead.

---

## Important
This is a frontend prototype.
Backend will be implemented later.

Agents must avoid backend work entirely.

Goal: build a beautiful interactive demo of Stamply.
