# Smart Cooking Assistant — Setup Checklist

> 📋 Get these items ready to fully build the app. Check each box as you complete it.

---

## 📌 App Identity

| Field | Value |
|-------|-------|
| **App Name** | Cook with AI |
| **Tagline** | Your hands-free cooking companion |
| **Language** | English only (tap-only, no multi-language for now) |

---

## 🔑 API Keys (Required)

### YouTube API (Recommended — works for title + description)

| Step | Action |
|------|--------|
| 1 | Go to **[console.cloud.google.com](https://console.cloud.google.com)** |
| 2 | Create project (or use existing: `532550201377`) |
| 3 | Enable **YouTube Data API v3** |
| 4 | Go to **Credentials** → Create API Key |
| 5 | Save below ↓ |

```
YOUTUBE_API_KEY = _______________________
```

### Gemini AI (Best — extracts real chef steps from video)

| Step | Action |
|------|--------|
| 1 | Visit **[console.cloud.google.com/apis/api/generativelanguage.googleapis.com](https://console.developers.google.com/apis/api/generativelanguage.googleapis.com/overview?project=532550201377)** |
| 2 | Click **"Enable"** |
| 3 | Your YouTube API key works for Gemini too! |

```
GEMINI_API_KEY = _______________________
```
*(Same key as YouTube — enable Gemini API in same project)*

---

## 🍳 13 Features — Include / Exclude

Copy this list and mark each as `[x]` Include or `[ ]` Exclude:

```
FEATURES:

[x] 1. URL Input — Paste any recipe video link (YouTube, websites)
[x] 2. AI Video Analysis — Gemini AI scans video + description + transcript
[x] 3. Smart Ingredient Parser — Extracts name, quantity, unit, emoji per item
[x] 4. 6-Stage Roadmap — Preparation → Wash → Chop → Cook → Garnish → Serve
[x] 5. Interactive Steps — Check off subtasks as you cook
[x] 6. Timer Tracking — Per-task timers with alerts
[x] 7. Ingredient Alternatives — Suggest substitutes if item missing
[x] 8. Voice Guidance — Hands-free cooking mode (wake word)
[x] 9. My Pantry — Store what ingredients you have at home
[x] 10. Shopping List — Auto-generate missing ingredients
[ ] 11. Delivery Integration — Order missing ingredients via app
[ ] 12. Multi-Language — Hindi + English UI (currently English only)
[ ] 13. Social Sharing — Share completed recipe on social media

Priority order for development:
  1. URL Input + AI Analysis
  2. Ingredient Parser + Roadmap
  3. Interactive Steps + Timer
  4. My Pantry + Alternatives
  5. Voice Guidance
  6. Shopping List
  7. Delivery Integration (future)
  8. Multi-Language (future)
  9. Social Sharing (future)
```

---

## 💾 Data to Store (What the App Remembers)

### Required (for app to work)

| Data | Purpose | Example |
|------|---------|---------|
| **Pantry** | What ingredients user has | `["Chicken 1kg", "Ginger", "Garlic"]` |
| **Preferences** | Diet type, spice level, portion size | `{"diet": "non-veg", "spice": "medium"}` |

### Optional (for better UX)

| Data | Purpose | Example |
|------|---------|---------|
| **Recipe History** | Past URLs analyzed | `["youtube.com/watch?v=abc", ...]` |
| **Saved Recipes** | Bookmarked recipes | `{name, url, ingredients[], tasks[]}` |
| **Timer History** | Recently used timers | `{"Biryani": "30 min", ...}` |

### All stored as JSON in browser localStorage

```javascript
{
  "pantry": ["Onion 5pcs", "Garlic 1 bulb", "Chicken 500g"],
  "preferences": {
    "diet": "non-veg",
    "spiceLevel": "medium",
    "portionSize": 4
  },
  "history": [
    {"url": "youtube.com/...","name": "Chicken Biryani","date":"2026-04-27"}
  ],
  "savedRecipes": []
}
```

---

## 🔐 Privacy & Security

| Item | Status |
|------|--------|
| All data stored in **browser localStorage** | ✅ No server database |
| No login required to use app | ✅ Works anonymously |
| No data shared with third parties | ✅ Private by default |
| API keys stored in Zo Space secrets | ✅ Not exposed in frontend |

---

## 📁 Files Structure (Already Built)

```
/home/workspace/
├── Smart-Cooking-Assistant-UI-v2.html   ← Android-style UI mockup
├── Smart-Cooking-Checklist.md           ← This file
└── /smart-cooking-assistant/            ← Zo Space app
    ├── routes/
    │   ├── index.tsx                    ← Main UI page
    │   └── api/
    │       └── analyze.ts               ← URL analysis API
    └── package.json
```

---

## ✅ What to Do Next

1. **Enable Gemini API** → [Click here](https://console.developers.google.com/apis/api/generativelanguage.googleapis.com/overview?project=532550201377)
2. **Provide your API keys** in this checklist
3. **Confirm 13 features** — mark include/exclude
4. **Confirm data storage** — pantry, history, preferences

Once done, I'll integrate Gemini AI and build all selected features into your app!