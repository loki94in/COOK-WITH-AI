# Smart Cooking Assistant 🧑‍🍳 AI

Welcome to the **Smart Cooking Assistant**, an offline-first, voice-controlled React Native mobile application built to guide you through complex recipes without ever needing to touch your screen with messy hands.

## 🚀 Current Architecture
This project uses a split Client-Server architecture:
1. **Frontend (React Native/Expo):** Handles voice recognition, timers, local SQLite pantry tracking, and dynamic UI rendering.
2. **Backend (Node.js/Express):** Handles YouTube URL extraction and serves the structured recipe JSON back to the mobile app.

---

## 🛠️ How to Run the Project Locally

Because the project now features a real backend API, you must run **both** the server and the mobile app simultaneously.

### Step 1: Start the Backend Server
Open a terminal and run the following commands:
```bash
cd backend
npm install
npm run dev
```
*The server will start on `http://localhost:5000`.*

### Step 2: Start the Mobile App
Open a **new, separate terminal window** and run:
```bash
npm install
npm start
```
*Use the Expo Go app on your phone, or an Android/iOS emulator to open the app.*

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
