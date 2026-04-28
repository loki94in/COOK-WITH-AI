# Smart Cooking Assistant 🧑‍🍳 AI

Welcome to the **Smart Cooking Assistant**, an offline-first, voice-controlled React Native mobile application built to guide you through complex recipes without ever needing to touch your screen with messy hands.

## 🚀 Current Architecture
This project uses a split Client-Server architecture:
1. **Frontend (React Native/Expo):** Handles voice recognition, timers, local SQLite pantry tracking, and dynamic UI rendering.
2. **Backend (Node.js/Express):** Handles YouTube URL extraction and serves the structured recipe JSON back to the mobile app.

---

## 🛠️ How to Run the Project Locally

You can now start both the **AI Backend** and the **Mobile App** with a single command from the root folder:

```bash
npm run dev
```

This will automatically launch the Gemini server and the Metro bundler at the same time. Once the QR code appears, scan it with your phone!

---

## 🛠️ Environment Troubleshooting

### Android SDK Issue
If you see `Failed to resolve the Android SDK path`, you need to set your `ANDROID_HOME` environment variable:
1. Open **Environment Variables** in Windows.
2. Add a new User variable:
   - **Variable name:** `ANDROID_HOME`
   - **Variable value:** `C:\Users\ratna\AppData\Local\Android\Sdk` (or your actual SDK path)
3. Add `%ANDROID_HOME%\platform-tools` to your **Path** variable.

### Web Support
If Expo complains about missing web dependencies, run:
`npx expo install react-dom react-native-web`

---

## 📋 Feature Checklist
- [x] **Voice Control ("Hey Chef")**: Safely listens for commands without picking up background noise.
- [x] **Pantry Intelligence**: Cross-references required ingredients with local inventory using Levenshtein distance.
- [x] **Dynamic Extraction**: Reaches out to the backend to turn YouTube URLs into actionable JSON steps.
- [x] **Unbroken UI Flow**: View your pantry, active timers, and nutrition stats without ever exiting Cooking Mode.
- [ ] **AI Video Scraping**: (Next Step) Implement the LLM engine in the backend to scrape real videos instead of serving mock data.

---

## 🔮 What's Next? (Developer Notes)
The frontend is 100% complete and stabilized. The **final step** to finish this product is to edit `backend/server.js`.
You need to integrate an LLM provider (OpenAI, Gemini, etc.) and a YouTube transcript package to dynamically process the `url` sent from the mobile app.
