# Smart Cooking Assistant — Complete Specification
## A Hands-Free, Voice-First Indian Cooking Companion

---

## 1. Project Overview

**Purpose:** A hands-free, voice-first cooking companion for Indian kitchens that accepts any YouTube cooking video URL, extracts and cross-references ingredients from multiple sources for accuracy, and guides users step-by-step through recipes using voice commands — all with full offline capability for core cooking tasks.

**Target Users:** Indian home cooks (ages 18–50) who follow YouTube cooking channels and cook daily. Many are beginners who need step-by-step guidance while their hands are occupied with cooking tasks.

**Core Promise:** *"Paste any YouTube cooking video URL. Get an accurate, voice-guided recipe. Cook hands-free."*

The app works with ANY Indian cooking YouTube video — not just partner channels. If ingredients aren't in the description, the AI cross-references 3–4 similar recipes from different YouTubers to determine accurate amounts and ingredients. Everything works offline once downloaded, including voice commands and step-by-step guidance through TTS.

---

## 2. Core Problem Solved

Users cannot touch their phone while cooking but need to follow recipes, set timers, and navigate steps — all while their hands are occupied with flour, dough, oil, or masala. Existing apps require constant screen touching. This app solves that with:

- **Voice-first interaction** — every command spoken, not touched
- **Any-YouTube-URL support** — no partner program needed, works with every cooking channel
- **Cross-referencing for accuracy** — 3–4 recipes compared when one is incomplete
- **Full offline cooking mode** — voice, timers, step guidance all work without internet

---

## 3. The 11 Modules

### MODULE 1: RECIPE DISPLAY SYSTEM (Foundation)
- Recipe list with search
- Recipe detail with ingredients and steps
- Cooking mode with step-by-step navigation
- Progress tracking
- Local SQLite database storage
- Pre-loaded with 20 Indian recipes

### MODULE 2: VOICE CONTROL SYSTEM
- Wake word: "Hey Chef"
- Speech-to-text using Whisper (offline capable)
- Text-to-speech using Google TTS (offline capable)
- Works in cooking mode without touching phone

### MODULE 3: YOUTUBE VIDEO EXTRACTION
- Accept any YouTube URL format
- Extract video metadata via YouTube Data API v3
- Parse ingredients from description
- Extract steps from captions
- Cross-reference with 3–4 similar recipes for accuracy
- Generate structured recipe with confidence score

### MODULE 4: VIDEO STEP SYNC (Key Differentiator)
- YouTube embedded player in cooking screen
- Each step mapped to video timestamp range
- Video auto-seeks to current step section
- Visual indicator showing chef's position in video
- Video and step guidance always synchronized

### MODULE 5: TIMER SYSTEM
- Multiple simultaneous timers (3–4 at once)
- Named timers (Rice, Dal, Curry)
- Auto-detect timers from step text ("cook for 5 minutes")
- Background timers with notifications
- Voice announcement when timer completes

### MODULE 6: PANTRY AND HOME INGREDIENTS
- Add/edit/delete ingredients with quantities
- Categories: Vegetables, Spices, Dairy, Grains, etc.
- "What can I cook today?" — recipes matching pantry
- Percentage match for each recipe
- Auto-fill ingredients from cooking history

### MODULE 7: MISTAKE FIX AND SUBSTITUTIONS
- Voice trigger: "Too much salt", "Too spicy", "Burnt"
- Instant fix suggestions
- Common mistake database (20+ scenarios)
- Substitution suggestions (Jain mode, ingredient swaps)
- AI-powered fixes for uncommon mistakes

### MODULE 8: QUICK COMMERCE INTEGRATION
- Detect missing ingredients from pantry
- One-tap links to Zepto, Blinkit, Instamart
- "Order all missing" single button
- 10–15 minute delivery

### MODULE 9: NUTRITION AND HEALTH TRACKING
- Nutrition database for 100+ Indian ingredients
- Calculate calories, protein, carbs, fat per serving
- Weight loss mode with daily calorie budget
- Weight gain mode with high calorie goals
- Weekly progress tracking

### MODULE 10: USER ACCOUNTS AND SYNC
- Google Sign-In authentication
- Cloud backup of recipes and preferences
- Dietary preference: Vegetarian, Non-Vegetarian, Jain
- Skill level: Beginner, Intermediate, Expert
- Family size for portion suggestions

### MODULE 11: SHOPPING LIST GENERATOR
- Select multiple recipes for the week
- Auto-generate combined shopping list
- Smart merging of duplicate ingredients
- Grouped by store category
- Share via WhatsApp or print

---

## 4. Core Features (MVP)

| Priority | Feature | Description |
|---|---|---|
| P0 | **Any YouTube URL Recipe Extraction** | Paste a YouTube video URL → AI extracts ingredients and steps from description + captions |
| P0 | **Cross-Reference Accuracy** | When a video lacks complete data, AI fetches 3–4 similar recipes and cross-references them |
| P0 | **Voice-Guided Cooking Mode** | Wake word ("Hey Chef") + Whisper offline STT. App speaks instructions aloud, user controls with voice |
| P0 | **Offline Voice Guidance** | Downloaded Whisper model + Google TTS voice pack. Voice works without internet |
| P0 | **Auto-Timer with Voice Alert** | Detects timer keywords → auto-starts countdown → announces completion by voice |
| P0 | **Smart Ingredient Auto-Fill** | App remembers previously cooked recipes and pre-selects ingredients automatically |
| P0 | **Dietary Filters** | Vegetarian, Non-Vegetarian, or Jain. App filters recommendations |

---

## 5. Smart Ingredient Auto-Fill — How It Works

When a user starts cooking, the app:

1. **Checks cooking history** — looks up previously cooked recipes
2. **Auto-selects ingredients** — pre-fills the ingredient picker with items from recently cooked dishes
3. **Shows suggestions** — "We noticed you cooked Paneer Butter Masala last week. Pre-select Paneer, Tomatoes, Butter, and Cream?"
4. **User confirms or adjusts** — can add/remove before confirming
5. **Learns from behaviour** — frequently cooked dishes get higher priority in auto-selection

### Auto-Selection Rules

- **Most recent:** Last cooked recipe's ingredients appear first
- **Most frequent:** If user cooks Dal Tadka every Tuesday, it auto-suggests on Tuesdays
- **Seasonal awareness:** Adjusts suggestions based on ingredients commonly used together
- **Dietary preference respected:** Jain mode won't auto-suggest onion/garlic even if previously used

### User Controls

- Toggle on/off in Settings
- Dismiss per session
- Clear cooking history

---

## 6. Portion & Serving Configuration

Before starting any recipe, the app asks the user how many people they are cooking for. This ensures the right quantities are calculated and communicated.

### How It Works

- When user taps "Start Cooking", the app immediately asks: "How many people are you cooking for?"
- User speaks a number (e.g., "4 people" or "2")
- App scales all ingredient quantities proportionally
- All step instructions reference the scaled amounts
- Voice guidance says: "For 4 people: add 2 cups of rice"

### Portion Selection Options

| Option | Use Case |
|---|---|
| "Just me" / 1 person | Single serving |
| "2 people" | Couple |
| "4 people" | Small family |
| "6 people" | Medium family |
| "8+ people" | Guests / large gathering |
| "Scale automatically" | App detects from recipe default |

### Voice Commands for Portion

| Command | Action |
|---|---|
| "Cooking for 4" | Scale recipe for 4 servings |
| "Just me" | Scale for 1 serving |
| "Full family" | Scale for 6 servings |
| "Adjust portions" | Re-open portion selector |

### Quantity Scaling Examples

| Recipe Default | Scaled for 2 | Scaled for 6 |
|---|---|---|
| 1 cup rice | 0.5 cup | 1.5 cups |
| 2 onions | 1 onion | 3 onions |
| 500g chicken | 250g chicken | 750g chicken |
| Serves 4 | Serves 2 | Serves 6 |

---

## 7. Human Error Prevention & Correction

This section covers real cooking mistakes — how the app detects them early, prevents them from happening, and helps fix them when they do.

### 7.1 Prevention — The App Asks Before Mistakes Happen

Before each critical step, the app confirms the user's action or alerts them proactively.

#### Before Adding Ingredients

| Step | App Asks | Voice Says |
|---|---|---|
| Adding oil | — | "Adding oil. Approximately 2 tablespoons. This is step 3 of 8." |
| Adding spices | — | "Now adding cumin seeds. Wait until oil is hot." |
| Adding water | Confirm needed | "Rice needs 1.5 cups water. Should I set a timer for 10 minutes?" |
| Adding salt | Before or after | "Salt — 1 teaspoon. Voice confirm: 'Yes, add salt.'" |

#### Before Critical Actions

| Situation | App Asks |
|---|---|
| Turning flame to high heat | "Switching to high flame. Are you cooking rice or vegetables?" |
| Adding curd to curry | "Adding curd now. Reduce flame to low first." |
| Closing lid for dum cooking | "Setting to dum (low heat). Seal the lid. Timer set for 20 minutes." |
| Frying onions at high heat | "Frying onions on medium flame. Stir continuously." |

#### Voice Confirmation Prompts

Some steps require voice confirmation before proceeding:

| Step | App Asks | Expected Response |
|---|---|---|
| Adding spices to hot oil | "Adding spices now. Say 'Yes' to continue." | "Yes" / "Add it" |
| Adding curd | "Curd going in now. Say 'Yes'." | "Yes" |
| Closing dum lid | "Dum setting. Timer will start. Say 'Yes'." | "Yes" |
| Final simlaa (mixing) | "Final mix. Say 'Yes' when ready." | "Yes" |

---

### 7.2 Real-Time Mistake Detection

The app listens during cooking mode. If the user says something that indicates a mistake, it responds immediately.

#### Voice Triggers for Mistake Detection

| User Says | App Detects | App Responds |
|---|---|---|
| "I added too much water" | Excess water | "Too much water. Open lid, cook on high flame for 2 minutes to evaporate." |
| "I added too much salt" | Excess salt | "Too much salt. Add boiled potato pieces, or dilute with more vegetables." |
| "I added too much oil" | Excess oil | "Too much oil. Add vegetables to absorb, or add cooked rice to balance." |
| "I added too much chili" | Excess spice | "Too spicy. Add sugar, yogurt, or coconut milk to balance." |
| "It's burning" | Burning detected | "Burning! Move pan off heat immediately. Transfer to another pan, avoiding burnt layer." |
| "The curry is too thin" | Gravy too thin | "Gravy is thin. Simmer uncovered for 5 minutes, or add cornstarch slurry." |
| "The curry is too thick" | Gravy too thick | "Gravy is thick. Add water or broth gradually, 2 tablespoons at a time." |
| "The curd split" | Curd split | "Curd split! Stop heat immediately. Whisk vigorously, add little flour or water." |
| "Onions are not Browning" | Under-cooked onions | "Onions need more time. Cook on medium-low heat without stirring too much." |
| "It's too sour" | Too sour | "Too sour. Add sugar, cream, or sweet vegetables like carrots." |
| "I forgot to add onions" | Missing ingredient | "Onions not added yet. They go in step 2, before garlic. Want me to go back?" |
| "I added garlic but I'm Jain" | Dietary violation | "You are on Jain mode. Garlic was not in your recipe. Should I remove it from the list?" |

---

### 7.3 Mistake Fix Database — Common Indian Cooking Mistakes

| Mistake | What Happened | Instant Fix |
|---|---|---|
| Too much water in rice | Rice is mushy | Open lid, cook on high flame 2 min. Or add no water and cook covered 2 min. |
| Too little water in rice | Rice is undercooked | Add boiling water, 2 tablespoons at a time, cook covered 5 more minutes. |
| Too much salt in curry | Curry is salty | Add boiled potato pieces, or more vegetables, or dilute with water. |
| Too much oil in fried dish | Food is greasy | Add vegetables to absorb oil, or place food on paper towel. |
| Burnt at bottom of pan | Food scorched | Transfer to another pan immediately, leaving burnt layer behind. |
| Onions burnt while frying | Bitter taste | Remove burnt onions, add fresh onions, or add sugar to mask bitterness. |
| Curd split in curry | Grainy texture | Stop heat, whisk vigorously, add a spoon of flour or water. |
| Gravy too thick | Cannot mix | Add water or broth gradually, simmer uncovered. |
| Gravy too thin | Watery | Simmer uncovered 5 minutes, or add cornstarch slurry. |
| Gravy too spicy | Chilies excessive | Add sugar, yogurt, coconut milk, or sweet vegetables. |
| Gravy too sour | Excess tomato/tamarind | Add sugar, cream, or potato to neutralize. |
| Rice undercooked | Absorbed water too fast | Add boiling water, cover, cook on low 5–10 minutes. |
| Rice too sticky | Too much starch | Wash rice one more time, add drops of lemon juice while cooking. |
| Chapati too hard | Overworked or dry dough | Add water to dough, rest 10 minutes, roll with light pressure. |
| Chapati not puffing | Dough too dry or heat too low | Brush with water, increase flame, press edges while cooking. |
| Dal too watery | Too much water | Simmer uncovered, mash some dal to thicken. |
| Dal too thick | Less water added | Add warm water, boil gently. |
| Vegetables overcooked | Cooked too long | Not fixable — serve soft or make into curry. |
| Seasoning forgotten | Salt not added | Add now and adjust; app reminds before serving step. |
| Spice added before vegetables | Raw masala smell | Cook on medium heat 2–3 minutes until spices fragrant. |

---

### 7.4 Interactive Mistake Fix — Step by Step

When user reports a mistake, the app doesn't just give a one-line answer. It walks them through the fix interactively.

#### Example: "I added too much water"

```
App: "Too much water detected in rice. Let me help fix this."
App: "Step 1: Open the lid of the pot."
User: "Done"
App: "Step 2: Switch to high flame."
App: "Step 3: Cook uncovered for 2 minutes. I am timing you."
[Timer: 2 minutes]
App: "Timer complete. Check the rice texture. Is it better now?"
User: "Still a little watery"
App: "Step 4: Cook uncovered for 1 more minute on high flame."
[Timer: 1 minute]
App: "Done. Your rice should be perfect now. Say 'Next' to continue to step 5."
```

#### Example: "It's burning"

```
App: "Burning alert! Move pan off heat NOW."
User: "Done"
App: "Step 1: Transfer food to a clean pan immediately. Do not scrape the burnt bottom."
User: "Done"
App: "Step 2: Taste the transferred food. Does it taste burnt?"
User: "A little"
App: "Step 3: Add fresh sauce or curry base to mask the burnt taste. Use 2 tablespoons."
App: "Step 4: Continue cooking from here. Your recipe progress is saved."
```

---

### 7.5 Ingredient Substitution During Cooking

If user is missing an ingredient, the app suggests immediate substitutes already in their pantry.

#### Substitution Commands

| User Says | App Responds |
|---|---|
| "I don't have yogurt" | "You can substitute: 2 tablespoons lemon juice, or 2 tablespoons coconut milk." |
| "No garlic available" | "Without garlic: use ginger + a pinch of asafoetida (hing). For Jain mode: skip entirely." |
| "I ran out of onions" | "No onions: use 1 tablespoon tomato paste + 1 teaspoon sugar for sweetness." |
| "No cream available" | "Substitute: full-fat milk simmered until reduced, or 2 tablespoons butter + milk." |
| "No coriander leaves" | "Skip or use parsley. Green chutney optional at the end." |
| "No green chili" | "Use 1 teaspoon red chili powder, or skip for mild flavor." |
| "No Garam Masala" | "Make quick version: 1 tsp cumin + 4 cardamom pods + 1/2 tsp cinnamon + pinch of clove." |

---

### 7.6 Portion Mistake Correction

| Mistake | Detection | Fix |
|---|---|---|
| Made too much food | User says "Too much leftover" | App notes preference, reduces portion next time |
| Made too little food | User says "Not enough for everyone" | App increases portion suggestion next time |
| Wrong serving size chosen | User says "I cooked for 6 not 4" | App learns and auto-suggests 6 next time |

---

## 8. Dietary Categories Supported

| Category | Description | Example Dishes |
|---|---|---|
| **Vegetarian** | No meat, no fish, no eggs | Dal Tadka, Paneer Butter Masala |
| **Non-Vegetarian** | Includes meat, fish, chicken | Chicken Curry, Mutton Biryani |
| **Jain** | No onion, no garlic, no potato, no tomato | Jain Paneer, Sukhi Subzi |

---

## 9. Ingredient List & Smart Price Comparison

When a YouTube URL is pasted and the recipe is extracted, ALL ingredients with quantities are shown in one clean table. If anything is missing from the user's pantry, the app automatically searches and compares prices across platforms.

### Step-by-Step Flow

```
User pastes YouTube URL
        │
        ▼
Recipe extracted with all ingredients
        │
        ▼
INGREDIENT TABLE displayed
┌─────────────────────────────────────────────────────────────────┐
│  🍚 Chicken Biryani — Ingredients                               │
├─────────────────────────────────────────────────────────────────┤
│  INGREDIENT          │  QTY      │  Pantry  │  Blinkit Price    │
├──────────────────────┼───────────┼──────────┼───────────────────┤
│  Basmati Rice        │  1 cup    │  ✅ Have  │  —                │
│  Chicken             │  500g     │  ☐ Missing│  ₹180 @Blinkit    │
│  Onions              │  2 large  │  ✅ Have  │  —                │
│  Ginger-Garlic Paste │  2 tbsp   │  ☐ Missing│  ₹45 @Blinkit     │
│  Yogurt              │  1 cup    │  ✅ Have  │  —                │
│  Biryani Masala      │  2 tbsp   │  ☐ Missing│  ₹85 @Blinkit     │
│  Ghee                │  3 tbsp   │  ☐ Missing│  ₹120 @Blinkit    │
│  Green Cardamom      │  4 pods   │  ✅ Have  │  —                │
│  Bay Leaves          │  2        │  ☐ Missing│  ₹20 @Blinkit     │
│  Salt                │  to taste │  ✅ Have  │  —                │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
Missing items → Auto-search Blinkit + other platforms
        │
        ▼
PRICE COMPARISON TABLE
┌─────────────────────────────────────────────────────────────────┐
│  💰 BEST PRICES — Missing Items                                 │
├─────────────────────────────────────────────────────────────────┤
│  🥚 Chicken 500g                                                │
│     Blinkit:    ₹180   (Free delivery)              ⭐ 4.8       │
│     Zepto:      ₹175   (+₹20 delivery)              ⭐ 4.6       │
│     Instamart:  ₹195   (Free delivery)              ⭐ 4.5       │
│                                                                  │
│     💡 BEST PRICE: Zepto ₹175 — use code FIRST10 for 10% off    │
│                                                                  │
│  🧂 Biryani Masala 200g                                         │
│     Blinkit:    ₹85    (Free delivery)              ⭐ 4.9       │
│     Zepto:      ₹90    (+₹15 delivery)              ⭐ 4.7       │
│     Instamart:  ₹80    (+₹25 delivery)              ⭐ 4.4       │
│                                                                  │
│     💡 BEST PRICE: Instamart ₹80 — but add ₹25 delivery = ₹105   │
│     💡 BLINKIT ₹85 + FREE DELIVERY = BEST VALUE                │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
User taps to order → Opens Blinkit/Zepto/Instamart with item pre-searched
```

### Ingredient Table Features

| Feature | Description |
|---|---|
| Single unified table | All ingredients with quantities in one view |
| Pantry status | Auto-checked against user's pantry (✅ have / ☐ missing) |
| Quantity shown | Exact amount needed for selected servings |
| Item checked | Can uncheck items user doesn't want to order |
| Dietary filter applied | Items outside user's diet (meat in Jain mode) shown greyed out |
| Scrollable | Table scrolls if ingredients exceed screen |

### Automatic Price Comparison

When missing ingredients are detected:

1. **App searches all 3 platforms simultaneously** — Blinkit, Zepto, Instamart
2. **Shows best price first** — Platform with lowest effective price ranked top
3. **Delivery cost factored in** — "Effective price = item price + delivery"
4. **Discounts and codes shown** — If Blinkit has a coupon or flash sale, it's highlighted
5. **User rating shown** — ⭐ 4.8 helps user decide quality
6. **Estimated delivery time** — "10 min", "15 min", "25 min"
7. **One-tap open** — Tapping opens the app with item pre-searched

### Price Comparison Logic

| Scenario | What App Shows |
|---|---|
| Item cheaper on Blinkit | "BEST: Blinkit ₹85 FREE delivery" |
| Item has flash sale | "🔥 SALE: ₹80 (was ₹100) — ends in 2 hours" |
| Platform has coupon code | "Use FIRST10 for extra 10% off" |
| Item out of stock | "❌ Out of stock on Blinkit — available on Zepto" |
| Price tie | "Blinkit and Zepto both ₹90 — Blinkit has faster delivery (10 min vs 15 min)" |
| Bulk deal available | "Buy 2 for ₹150 (save ₹30) — on Instamart" |

### Quick Commerce Platforms Supported

| Platform | Logo | Delivery Time | Notes |
|---|---|---|---|
| Blinkit | 🟠 | 10–15 min | Primary partner, most Indian cities |
| Zepto | 🔵 | 10–15 min | Fast growing, key metro cities |
| Instamart | 🟢 | 15–25 min | Part of Swiggy, wider reach |

### User Controls for Price Comparison

| Action | Result |
|---|---|
| Tap item row | Opens price comparison for that item |
| Tap "Order all missing" | Opens all missing items in Blinkit app (pre-filled cart) |
| Uncheck item | Excludes from bulk order |
| "Best price only" toggle | Shows only the cheapest option per item |
| "Filter by platform" | Show only Blinkit, or only Zepto |
| "Save for later" | Adds item to shopping list instead of ordering now |

### Voice Commands During Price Comparison

| Command | Action |
|---|---|
| "Order all missing" | Opens Blinkit with all missing items |
| "Order from Blinkit" | Opens Blinkit, excludes other platforms |
| "Show me prices" | Reads out prices for missing items |
| "Skip ordering" | Closes price view, proceeds to cooking |
| "Check chicken price" | Reads specific item price comparison |

### Special Offers Display

When a platform has an active offer on an ingredient:

```
┌─────────────────────────────────────────────────────────────────┐
│  🟠 Blinkit — Active Offer on Garam Masala                      │
│                                                                  │
│  Garam Masala 100g — ₹85 (was ₹110)                            │
│                                                                  │
│  ┌─────────────────────────────────────────────┐               │
│  │  🎉 Use code FIRSTCOOK — get 15% extra off   │               │
│  │     Valid till: Today 11:59 PM               │               │
│  └─────────────────────────────────────────────┘               │
│                                                                  │
│  [ADD TO CART — ₹85]    [VIEW IN BLINKIT]                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. YouTube URL Recipe Extraction Flow

### Supported URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`
- `https://youtube.com/clip/VIDEO_ID`

### Extraction Process

1. User pastes YouTube URL
2. Backend fetches video metadata (title, description, captions)
3. AI parses ingredients from description
4. If ingredients are incomplete or missing, AI fetches 3–4 similar recipes from other YouTubers
5. AI cross-references all sources to generate consensus ingredient list with quantities
6. App displays recipe with confidence indicator per ingredient

### Cross-Reference Confidence Display

| Ingredient | Quantity | Status |
|---|---|---|
| Basmati Rice | 1 cup | ✅ Verified by 3 recipes |
| Turmeric Powder | 1 tsp | ✅ Verified by 4 recipes |
| Garam Masala | 1 tsp | ⚠️ Verified by 2 recipes |
| Green Cardamom | 4 pods | ✅ Verified by 4 recipes |

---

## 11. Cooking Mode — Voice-Only Operation

### Wake Word

Default: **"Hey Chef"** — activates the app when screen is off

Alternative wake words:
- "जय चेफ" (Hindi)
- "शेफ जी" (Hindi)
- "OK Chef" (English)

### Voice Commands During Cooking

| Command | Action |
|---|---|
| "Hey Chef" | Wake the app |
| "Next" / "Previous" | Navigate steps |
| "Repeat" | Repeat current step |
| "Pause" / "Resume" | Pause or resume |
| "What's next?" | Preview next step |
| "Jump to step [N]" | Jump to specific step |
| "What's in step [N]?" | Read specific step |
| "How much time left?" | Announce timer |
| "Set timer [X] minutes" | Set manual timer |
| "Stop timer" | Cancel timer |
| "Show ingredients" | Read full ingredient list |
| "Scale for [N] people" | Rescale recipe |
| "Save this recipe" | Save for offline |
| "Too much salt" | Mistake fix triggered |
| "It's burning" | Emergency alert |
| "Help" | Read all commands |

---

## 12. Hands-Free Cooking — Real Usage Scenario

**User:** Ramesh, cooking Chicken Biryani. Hands covered in marinade. Phone is 2 feet away, screen off.

**STEP 1 — Wake and Start**
- User: "Hey Chef"
- App: "Yes? How can I help?"
- User: "Start cooking"
- App: "Which recipe would you like to cook?"
- User: "Chicken Biryani"
- App: "Found Chicken Biryani. 8 steps, serves 4. How many people are you cooking for?"
- User: "6"
- App: "Scaled for 6 people. Shall I begin?"
- User: "Yes"
- App: "Step 1 of 8. Wash 3 cups basmati rice until water runs clear. Soak for 30 minutes. Timer set automatically."

**STEP 2 — Navigate Steps**
- User: "Next"
- App: "Step 2 of 8. Marinate 750g chicken with 1.5 cups yogurt, 1.5 tsp turmeric, 3 tsp red chili powder, and 1.5 tsp salt. Keep aside for 15 minutes."
- User: "Repeat"
- App: "Step 2 of 8. Marinate 750g chicken with 1.5 cups yogurt, 1.5 tsp turmeric, 3 tsp red chili powder, and 1.5 tsp salt. Keep aside for 15 minutes."

**STEP 3 — Timer in Background**
- [App auto-detected "15 minutes" and started timer]
- [Phone screen is off]
- App: "⏰ Timer complete! Marination is done. Ready for step 3."

**STEP 4 — Mistake Correction**
- User: "I added too much salt"
- App: "Too much salt detected. Step 1: Add 3 boiled potato pieces. Step 2: Stir gently. Step 3: Simmer for 2 minutes. Want me to start a 2-minute timer?"
- User: "Yes"
- App: "Timer set for 2 minutes. Timer started."

**STEP 5 — Ask Anything**
- User: "How much time left on my biryani?"
- App: "You have 45 minutes of cooking time remaining. Currently on step 5 of 8."

---

## 13. Timer System

### Auto-Detected Timers

The app reads each step and automatically starts timers when it detects time references:

| Step Text | Timer Started |
|---|---|
| "Soak rice for 30 minutes" | 30-minute timer labeled "Rice Soaking" |
| "Marinate for 15 minutes" | 15-minute timer labeled "Marination" |
| "Cook on low flame for 20 minutes" | 20-minute timer labeled "Dum Cooking" |
| "Fry onions for 5 minutes" | 5-minute timer labeled "Onion Frying" |

### Named Multiple Timers

Users can run up to 4 timers simultaneously:

| Timer Name | Time Remaining |
|---|---|
| 🍚 Rice | 12:45 |
| 🟡 Dal | 08:30 |
| 🍛 Biryani Dum | 25:00 |

### Timer Voice Commands

| Command | Action |
|---|---|
| "How much time left?" | Announces all active timers |
| "Set timer 10 minutes" | Starts new named timer |
| "Stop timer" | Cancels most recent timer |
| "Check my timers" | Lists all active timers |
| "Pause timer" | Pauses named timer |

---

## 14. Hindi-Only User Support

### Language Modes

- **Hindi Only** — Full Hindi UI, Hindi voice commands, Hindi TTS. English never required.
- **English Only** — Full English UI, English voice commands, English TTS.
- **Bilingual** — Hindi UI with English recipe names; switch between languages in Settings.

Default language: Hindi (India primary market)

### Hindi Wake Word

| Hindi | Pronunciation |
|---|---|
| हे चेफ | "heh chehf" |
| जय चेफ | "jai chehf" |
| शेफ जी | "shehf jee" |

### Hindi Voice Commands

| Hindi Command | English Meaning | Action |
|---|---|---|
| हे चेफ | Hey Chef | Wake app |
| खाना शुरू करो | Start cooking | Open recipe |
| अगला | Next | Next step |
| पिछला | Previous | Previous step |
| दोहराओ | Repeat | Repeat step |
| रुको | Pause | Pause cooking |
| जारी रखो | Resume | Resume cooking |
| आगे क्या है? | What's next? | Preview next step |
| स्टेप 3 बताओ | Step 3 | Jump to step 3 |
| टाइमर कितना बचा? | Time left? | Timer status |
| 10 मिनट टाइमर लगाओ | Timer 10 min | Set timer |
| टाइमर बंद करो | Stop timer | Cancel timer |
| सामग्री बताओ | Ingredients | List ingredients |
| रेसिपी सेव करो | Save recipe | Save recipe |
| मेरी सेव्ड रेसिपी | My recipes | Open saved recipes |
| बहुत नमक है | Too much salt | Mistake fix |
| जल रहा है | It's burning | Emergency fix |
| मदद चाहिए | Help | Show commands |

### Hindi UI Elements

| Screen | Hindi |
|---|---|
| Home | होम |
| Add Recipe | रेसिपी जोड़ें |
| My Pantry | मेरी रसोई |
| Saved Recipes | सेव की हुई रेसिपी |
| Settings | सेटिंग्स |
| Timer | टाइमर |
| Step 3 of 8 | स्टेप 3 / 8 |

### Hindi Ingredient Synonyms Handled

| Hindi | English |
|---|---|
| प्याज | Onion |
| लहसुन | Garlic |
| अदरक | Ginger |
| टमाटर | Tomato |
| हरा धनिया | Coriander leaves |
| मिर्च | Chili |
| जीरा | Cumin |
| धनिया | Coriander powder |

---

## 15. Offline Functionality

| Feature | Online | Offline |
|---|---|---|
| Paste YouTube URL and extract recipe | ✅ | ❌ |
| Voice guidance (TTS read-aloud) | ✅ | ✅ |
| Voice commands (STT) | ✅ | ✅ |
| Wake word detection | ✅ | ✅ |
| Recipe step viewing | ✅ | ✅ |
| Timer with voice alert | ✅ | ✅ |
| Mistake fix suggestions | ✅ | ✅ (database) |

### What Downloads Once

| Component | Size |
|---|---|
| Whisper STT model (small) | ~500 MB |
| Google TTS voice pack (English + Hindi) | ~100 MB |
| Individual recipe cache | ~1–5 MB each |

---

## 16. Build Order — Month-by-Month

| Month | Module | Goal |
|---|---|---|
| 1–2 | Recipe Display System | Foundation complete |
| 3 | YouTube Extraction | URL to recipe |
| 4 | Video Step Sync | Key differentiator |
| 5 | Voice Controls | Hands-free operation |
| 6 | Timer System | Multi-timer system |
| 7 | Pantry Management | Home ingredients |
| 8 | Quick Commerce | Ordering integration |
| 9 | Mistake Fix System | Fix common mistakes |
| 10–12 | Modules 9–11 | Health, Accounts, Shopping Lists |

**Core app ready: Month 4**
**Full app complete: Month 12**

---

## 17. MVP Scope Summary

**In Scope for MVP:**

1. Any YouTube URL recipe extraction
2. Cross-referencing 3–4 similar recipes for accuracy
3. Voice-guided cooking mode with offline support
4. Wake word ("Hey Chef") + Whisper offline STT
5. Google TTS read-aloud with downloadable voice pack
6. Auto-timer detection and voice alerts
7. Basic recipe scaling (2/4/6/8 servings)
8. User pantry management
9. Dietary filters: Vegetarian, Non-Vegetarian, Jain
10. Human error prevention and correction (Section 7)
11. Node.js backend with MongoDB

**Out of Scope for MVP:**

- Camera-based pantry scanner
- AI substitutions (API-dependent)
- Meal planner
- Shopping list generator
- iOS version
- Video playback inside app

---

## 18. Nice-to-Have Features (Post-MVP)

| Feature |
|---|
| Camera-based ingredient scanner |
| AI-powered ingredient substitutions |
| Weekly meal planner |
| Nutrition info per serving |
| Video embed for recipe demos |
| Personal recipe variations |
| One-tap save from any cooking video |

---
