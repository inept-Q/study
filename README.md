# StudyVault Firebase Repo

This repo is pre-wired for your Firebase project:
- **Firebase project ID:** `studyvault-cbf19`
- **Target GitHub repo:** `Bumble-Q/studynvault`

## What this repo does
- runs as an Expo app locally
- exports a static web build to `dist/`
- deploys that web build to **Firebase Hosting**
- uses Firebase Auth, Firestore, and Storage config from environment variables

## Important reality check
Firebase Hosting deploys the **web build** of this Expo app. It does **not** generate the Android app binary.

Use this stack like this:
- **GitHub -> Firebase Hosting** for the web app
- **Expo / EAS** for Android builds

## Included
- Expo Router app
- Firebase SDK setup
- AsyncStorage local-first store
- Hosting config for `studyvault-cbf19`
- GitHub Actions deploy workflow
- `.env.example` already filled with your Firebase web config

## Local setup

```bash
npm install
cp .env.example .env
npm run start
```

For web:

```bash
npm run web
```

## Export the web build

```bash
npm run build:web
```

This generates `dist/`.

## Deploy locally with Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase use studyvault-cbf19
npm run firebase:deploy
```

## GitHub Actions deploy setup
Add these **GitHub repository secrets** in `Bumble-Q/studynvault`:

- `FIREBASE_SERVICE_ACCOUNT`
- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`
- `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID`

The workflow file is:

`.github/workflows/firebase-hosting.yml`

It will:
1. install dependencies
2. create a `.env` file from secrets
3. export Expo web
4. deploy `dist/` to Firebase Hosting

## Notes
- Your Firebase web config is not a private server secret, but the service account **is** sensitive and must stay in GitHub secrets only.
- If your repo name was meant to be `studyvault` instead of `studynvault`, fix that before wiring anything else.
- For Android packaging, keep using Expo / EAS.
