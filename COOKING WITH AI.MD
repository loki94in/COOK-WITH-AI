╔═══════════════════════════════════════════════════════════════════════════════╗
║                    SMART COOKING ASSISTANT — ANDROID DESIGN SPEC               ║
║                         Hands-Free Voice-First Indian Cooking App              ║
╚═══════════════════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                    THEME & COLORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIMARY THEME: Dark Kitchen Mode (Battery Saving + Kitchen Visibility)
┌─────────────────────────────────────────────────────────────────────────────┐
│  ELEMENT              │  COLOR CODE  │  USAGE                               │
├───────────────────────┼──────────────┼──────────────────────────────────────┤
│  Background Dark      │  #1A1A1A     │  Main screens, cooking mode         │
│  Background Card      │  #2D2D2D     │  Cards, modals, bottom sheets        │
│  Primary Accent       │  #FF6F00     │  CTAs, active states, timers         │
│  Secondary Accent     │  #FFB300     │  Highlights, progress bars           │
│  Saffron Gold         │  #FF9800     │  Voice active indicator              │
│  Success Green        │  #4CAF50     │  Confirmations, completion           │
│  Warning Red          │  #F44336     │  Mistakes, alerts                    │
│  Text Primary         │  #FFFFFF     │  Headings, important text             │
│  Text Secondary       │  #B0B0B0     │  Descriptions, hints                │
│  Text Muted           │  #757575     │  Timestamps, metadata                │
└───────────────────────┴──────────────┴──────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                              SCREEN 1: SPLASH / ONBOARDING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│                                         │
│            [Saffron Icon]               │
│                                         │
│         🧑‍🍳 SMART COOKING              │
│            ASSISTANT                    │
│                                         │
│    "Your Hands-Free Kitchen Buddy"      │
│                                         │
│                                         │
│         ○ ○ ○ (dots)                    │
│                                         │
│      [ Get Started → ]                  │
│                                         │
└─────────────────────────────────────────┘

ELEMENTS:
• App icon with chef hat + flame motif
• Tagline: "Your Hands-Free Kitchen Buddy"
• 3 onboarding swipeable pages:
  1. "Paste any YouTube recipe URL"
  2. "Cook hands-free with voice commands"
  3. "Never burn your dal again 🍛"
• Progress dots at bottom
• Primary CTA button to start

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         SCREEN 2: HOME / DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│  ☰  Smart Cooking          [👤] [⚙️]   │
├─────────────────────────────────────────┤
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  🎤 "Hey Chef"                  │  │
│   │  [LARGE WAKE WORD BUTTON]       │  │
│   │  Tap or speak to start          │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  🔗 Paste YouTube URL           │  │
│   │  ┌───────────────────────────┐  │  │
│   │  │ https://youtube.com/...   │  │  │
│   │  └───────────────────────────┘  │  │
│   │              [Extract Recipe]    │  │
│   └─────────────────────────────────┘  │
│                                         │
│   QUICK ACTIONS                         │
│   ┌────────┐ ┌────────┐ ┌────────┐   │
│   │ Cook   │ │ My     │ │ Quick  │   │
│   │ What   │ │ Pantry │ │ Timers │   │
│   │ I Have │ │        │ │        │   │
│   └────────┘ └────────┘ └────────┘   │
│                                         │
│   SAVED RECIPES                         │
│   ┌───────────────────────────────┐    │
│   │ 🖼️ │ Chicken Biryani        │    │
│   │    │ 24 ingredients • 8 steps│    │
│   └───────────────────────────────┘    │
│   ┌───────────────────────────────┐    │
│   │ 🖼️ │ Dal Makhani             │    │
│   │    │ 12 ingredients • 6 steps │    │
│   └───────────────────────────────┘    │
│                                         │
│   [🏠]  [🔍]  [⏰]  [👤]               │
│   Home  Search Timers Profile           │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      SCREEN 3: YOUTUBE URL EXTRACTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│  ←  Recipe Extraction                  │
├─────────────────────────────────────────┤
│                                         │
│  PASTED URL                             │
│  ┌───────────────────────────────────┐  │
│  │ https://youtube.com/watch?v=abc123│  │
│  └───────────────────────────────────┘  │
│                                         │
│  ANALYZING...                           │
│  ┌───────────────────────────────────┐  │
│  │ 📺 Extracting video metadata     │  │
│  │ ✓ Title found: Chicken Biryani   │  │
│  │ ✓ 24 ingredients detected        │  │
│  │ ✓ Steps extracted from captions  │  │
│  │                                   │  │
│  │ 🔄 Cross-referencing 3 recipes   │  │
│  │   ↻ Recipe 1 of 3...             │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 📊 CROSS-REFERENCE RESULTS       │  │
│  │                                   │  │
│  │ Ingredient Match: 92%            │  │
│  │ [████████████░░░░] 24/26 items   │  │
│  │                                   │  │
│  │ Steps Verified: 100%             │  │
│  │ [██████████████] 8/8 steps       │  │
│  │                                   │  │
│  │ Confidence: HIGH ✓                │  │
│  └───────────────────────────────────┘  │
│                                         │
│         [View Recipe →]                │
│                                         │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      SCREEN 4: RECIPE DETAIL VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│  ←  Chicken Biryani           [♡] [📤]│
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐  │
│  │         [VIDEO THUMBNAIL]         │  │
│  │            ▶ Play                 │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Source: Sanjay Kapoor Cooks            │
│  ⭐ 4.8 (2.3K reviews)                 │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  QUICK INFO          [EDIT PORTIONS]    │
│  ┌────────┐ ┌────────┐ ┌────────┐      │
│  │ 45 min │ │ 4 servings│ │ 850 cal│     │
│  │ ⏱️ Prep│ │ 👥 Portions│ │ 🔥 Cal │     │
│  └────────┘ └────────┘ └────────┘      │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  INGREDIENTS (24)              [✓]    │
│  ┌───────────────────────────────────┐  │
│  │ • 500g Basmati Rice        ✓     │  │
│  │ • 750g Chicken             ✓     │  │
│  │ • 2 cups Yogurt            ○     │  │
│  │ • 3 tbsp Biryani Masala     ✓     │  │
│  │ • 1 cup Fried Onions       ○     │  │
│  │ • ... and 19 more                │  │
│  └───────────────────────────────────┘  │
│                                         │
│  STEPS (8)                              │
│  ┌───────────────────────────────────┐  │
│  │ 1. Soak rice for 30 minutes      │  │
│  │ 2. Marinate chicken with yogurt   │  │
│  │ 3. Layer chicken and rice         │  │
│  │ 4. Dum cook on low flame...       │  │
│  └───────────────────────────────────┘  │
│                                         │
│     [🔊 Start Voice Cooking Mode]       │
│                                         │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      SCREEN 5: COOKING MODE (VOICE ACTIVE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│  ←  Cooking Mode        [X] Exit       │
├─────────────────────────────────────────┤
│                                         │
│         CHICKEN BIRYANI                 │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │         STEP 3 OF 8              │  │
│  │                                   │  │
│  │    "Layer the rice over          │  │
│  │     the marinated chicken        │  │
│  │     evenly"                       │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │                             │  │  │
│  │  │    [STEP ILLUSTRATION]      │  │  │
│  │  │                             │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Timer: 25:00   [▶️ Start]        │  │
│  │  [████████░░░░░░░░░░░] 45%       │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 🎤 "Hey Chef" — Listening...     │  │
│  │                                   │  │
│  │  Available commands:              │  │
│  │  "Next step"  "Repeat"            │  │
│  │  "Start timer"  "Pause"          │  │
│  │  "How much [ingredient]?"         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  INGREDIENTS FOR THIS STEP              │
│  • 2 cups soaked basmati rice          │
│  • 1 tbsp ghee                         │
│  • Fresh coriander                      │
│                                         │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐    │
│  │ ◀◀  │  │ ▶️  │  │ ⏸️  │  │ ▶▶  │    │
│  │ Prev│  │Voice│  │Pause│  │Skip │    │
│  └─────┘  └─────┘  └─────┘  └─────┘    │
│                                         │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      SCREEN 6: VOICE COMMAND OVERLAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│           ┌───────────────┐             │
│           │               │             │
│           │  🎤 LISTENING │             │
│           │               │             │
│           │  "Next step"  │             │
│           │               │             │
│           │  ──────────── │             │
│           │  [SPEAKING]   │             │
│           │  ▂▃▅▇▅▃▂▃▅▇   │             │
│           │               │             │
│           └───────────────┘             │
│                                         │
│         SUGGESTED COMMANDS:              │
│    ┌────────┐  ┌────────┐  ┌────────┐  │
│    │Repeat  │  │ Timer  │  │ Pause  │  │
│    └────────┘  └────────┘  └────────┘  │
│                                         │
│                                         │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      SCREEN 7: MISTAKE FIX / EMERGENCY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│                                         │
│    ┌─────────────────────────────────┐  │
│    │                                 │  │
│    │     ⚠️  EMERGENCY FIX          │  │
│    │                                 │  │
│    │   "Too Much Salt"               │  │
│    │                                 │  │
│    │   Detected from your voice      │  │
│    │                                 │  │
│    └─────────────────────────────────┘  │
│                                         │
│    SOLUTION STEPS:                      │
│                                         │
│    ┌─────────────────────────────────┐  │
│    │  1. Add 3 boiled potato pieces │  │
│    │     to absorb excess salt       │  │
│    │     ⏱️ Timer: 5:00 auto-start  │  │
│    └─────────────────────────────────┘  │
│                                         │
│    ┌─────────────────────────────────┐  │
│    │  2. Stir gently and simmer     │  │
│    └─────────────────────────────────┘  │
│                                         │
│    ┌─────────────────────────────────┐  │
│    │  3. Remove potatoes before     │  │
│    │     serving                    │  │
│    └─────────────────────────────────┘  │
│                                         │
│         [I Fixed It ✓]                  │
│                                         │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      SCREEN 8: PANTRY MANAGER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│  ≡  My Pantry              [🔍] [+]    │
├─────────────────────────────────────────┤
│                                         │
│  WHAT'S IN YOUR KITCHEN?                │
│                                         │
│  [All] [Vegetables] [Spices] [Dairy]   │
│       [Grains] [Other]                  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 🥕 VEGETABLES              (8)   │  │
│  │ ┌─────────────────────────────┐  │  │
│  │ │ ✓ Onion        ✓ Tomato    │  │  │
│  │ │ ✓ Potato       ○ Cauliflower│  │  │
│  │ │ ✓ Green Chili  ✓ Ginger     │  │  │
│  │ └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 🌶️ SPICES                  (12) │  │
│  │ ┌─────────────────────────────┐  │  │
│  │ │ ✓ Turmeric     ✓ Red Chili  │  │  │
│  │ │ ✓ Cumin        ✓ Coriander  │  │  │
│  │ │ ✓ Garam Masala ✓ Cardamom   │  │  │
│  │ └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 🥛 DAIRY                   (5)   │  │
│  │ ┌─────────────────────────────┐  │  │
│  │ │ ✓ Milk        ○ Cream       │  │  │
│  │ │ ✓ Yogurt      ✓ Ghee         │  │  │
│  │ └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 🍚 GRAINS                  (6)   │  │
│  │ ┌─────────────────────────────┐  │  │
│  │ │ ✓ Basmati Rice ✓ Whole Wheat│  │  │
│  │ │ ✓ Chana Dal     ○ Moong Dal │  │  │
│  │ └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  MISSING FOR BIRYANI:                   │
│  ┌───────────────────────────────────┐  │
│  │  🥛 Yogurt        [Order →]     │  │
│  │  🧅 Fried Onions  [Order →]     │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  SUGGESTED QUICK RECIPES         │  │
│  │  Based on your pantry:           │  │
│  │                                   │  │
│  │  🍛 Dal Tadka      85% match     │  │
│  │  🧅 Onion Pakora   72% match     │  │
│  │  🍳 Egg Curry      68% match     │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      SCREEN 9: TIMER DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│  ≡  Timers              [Voice: ON 🎤]  │
├─────────────────────────────────────────┤
│                                         │
│  ACTIVE TIMERS                          │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  🍚 RICE SOAKING                 │  │
│  │                                   │  │
│  │       24:37                       │  │
│  │  ████████████████░░░░░░░░░░░░░░  │  │
│  │                                   │  │
│  │  [⏸️ Pause]  [🔁 Reset]  [✕]    │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  🥘 DAL PRESSURE COOK            │  │
│  │                                   │  │
│  │       08:15                       │  │
│  │  ███░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  │
│  │                                   │  │
│  │  [⏸️ Pause]  [🔁 Reset]  [✕]    │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  🍗 CHICKEN MARINADE             │  │
│  │                                   │  │
│  │       COMPLETED ✓                │  │
│  │                                   │  │
│  │       [🔁 Use Again]             │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  QUICK ADD                              │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ 1   │ │ 3   │ │ 5   │ │ 10  │       │
│  │ min │ │ min │ │ min │ │ min │       │
│  └─────┘ └─────┘ └─────┘ └─────┘       │
│                                         │
│         [🎤 Add Voice Timer]            │
│                                         │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      SCREEN 10: NUTRITION TRACKER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│  ≡  Nutrition                [📊 Week] │
├─────────────────────────────────────────┤
│                                         │
│  TODAY'S MEALS                          │
│                                         │
│  Breakfast     350 cal    ████████░░   │
│  Lunch         520 cal    ██████████░  │
│  Dinner        680 cal    ████████████│
│  Snacks        150 cal    ████░░░░░░░  │
│  ─────────────────────────────────────  │
│  TOTAL          1,700 cal  ████████░░   │
│  Budget: 2,000 cal                          │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │          CALORIE RING            │  │
│  │                                   │  │
│  │        ┌───────────┐              │  │
│  │       /             \             │  │
│  │      │   1,700      │             │  │
│  │      │   / 2,000    │             │  │
│  │      │   calories  │             │  │
│  │       \             /             │  │
│  │        └───────────┘              │  │
│  │                                   │  │
│  │    Protein: 65g    Carbs: 210g   │  │
│  │    Fat: 45g        Fiber: 18g    │  │
│  └───────────────────────────────────┘  │
│                                         │
│  MACROS BREAKDOWN                       │
│  ┌───────────────────────────────────┐  │
│  │ Protein ████████████░░░░░░ 32%   │  │
│  │ Carbs   ████████████████████ 52% │  │
│  │ Fat     ████████░░░░░░░░░░ 16%  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  GOALS                    [Edit Goals] │
│  ┌───────────────────────────────────┐  │
│  │ 🥗 Weight Loss Mode              │  │
│  │    1,800 cal/day • High Protein   │  │
│  │                                   │  │
│  │ 💪 Weight Gain Mode              │  │
│  │    2,500 cal/day • High Protein   │  │
│  │                                   │  │
│  │ ⚖️ Maintain Current Weight       │  │
│  │    2,000 cal/day • Balanced       │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      SCREEN 11: SETTINGS / PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│  ≡  Settings                           │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  👤  John Cook                   │  │
│  │      john@email.com              │  │
│  │      [Edit Profile]              │  │
│  └───────────────────────────────────┘  │
│                                         │
│  PREFERENCES                            │
│  ┌───────────────────────────────────┐  │
│  │ Diet Preference         [Veg ▾] │  │
│  │ Skill Level         [Beginner ▾]│  │
│  │ Family Size               [4 👥]│  │
│  │ Default Servings              [4]│  │
│  └───────────────────────────────────┘  │
│                                         │
│  VOICE SETTINGS                         │
│  ┌───────────────────────────────────┐  │
│  │ Wake Word        [Hey Chef    ▾] │  │
│  │ Voice Gender     [Female ▾]      │  │
│  │ Speech Speed     [Normal ▾]      │  │
│  │ Offline Mode     [🔘 ON]         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  NOTIFICATIONS                          │
│  ┌───────────────────────────────────┐  │
│  │ Timer Alerts         [🔘 ON]     │  │
│  │ Step Reminders       [🔘 ON]     │  │
│  │ Shopping Reminders   [🔘 OFF]    │  │
│  └───────────────────────────────────┘  │
│                                         │
│  DATA & SYNC                            │
│  ┌───────────────────────────────────┐  │
│  │ Google Sign-In    [🔗 Connected] │  │
│  │ Last Synced        [Today 10:30] │  │
│  │ [Sync Now]                          │  │
│  │ [Export Recipes]                    │  │
│  │ [Clear Cache]                       │  │
│  └───────────────────────────────────┘  │
│                                         │
│  QUICK COMMERCE                          │
│  ┌───────────────────────────────────┐  │
│  │ Preferred Delivery               │  │
│  │ [Zepto] [Blinkit] [Instamart]   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ABOUT                                   │
│  ┌───────────────────────────────────┐  │
│  │ Version                    1.0.0 │  │
│  │ [Privacy Policy]                  │  │
│  │ [Terms of Service]                │  │
│  │ [Help & Support]                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│            [Sign Out]                   │
│                                         │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      SCREEN 12: QUICK COMMERCE / ORDERING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│  ←  Missing Ingredients                 │
├─────────────────────────────────────────┤
│                                         │
│  FOR: Chicken Biryani                   │
│  3 items missing from your pantry       │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  🥛 Yogurt                       │  │
│  │     500g • ₹45                   │  │
│  │     [Qty: - 1 +]    [Add]       │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  🧅 Fried Onions                 │  │
│  │     200g • ₹80                   │  │
│  │     [Qty: - 1 +]    [Add]       │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  🌿 Fresh Coriander              │  │
│  │     1 bunch • ₹20               │  │
│  │     [Qty: - 1 +]    [Add]       │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  DELIVERY PLATFORM                      │
│                                         │
│  ┌─────────────┐  ┌─────────────┐      │
│  │   Zepto     │  │  Blinkit    │      │
│  │   12 min    │  │   15 min    │      │
│  │   ₹49       │  │   ₹39       │      │
│  │   delivery  │  │   delivery  │      │
│  │   ○ Select  │  │   ○ Select  │      │
│  └─────────────┘  └─────────────┘      │
│                                         │
│  ┌─────────────┐                       │
│  │  Instamart  │                       │
│  │   20 min    │                       │
│  │   ₹29       │                       │
│  │   delivery  │                       │
│  │   ○ Select  │                       │
│  └─────────────┘                       │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  ORDER SUMMARY                          │
│  Items: 3                               │
│  Subtotal: ₹145                         │
│  Delivery: ₹49                          │
│  ─────────────────────────────────────  │
│  Total: ₹194                            │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │     ORDER ALL FROM ZEPTO →       │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         NAVIGATION STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    ┌─────────────┐
                    │   SPLASH    │
                    │  ONBOARDING │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    HOME     │◄──────────────┐
                    │  DASHBOARD  │               │
                    └──────┬──────┘               │
                           │                       │
         ┌─────────────────┼─────────────────┐    │
         │                 │                 │    │
         ▼                 ▼                 ▼    │
   ┌──────────┐    ┌──────────┐    ┌──────────┐  │
   │  YOUTUBE  │    │  PANTRY  │    │  TIMERS  │  │
   │   URL     │    │ MANAGER  │    │DASHBOARD │  │
   └────┬──────┘    └────┬─────┘    └────┬─────┘  │
        │                │               │        │
        ▼                │               │        │
   ┌──────────┐         │               │        │
   │ EXTRACT  │         │               │        │
   │  RECIPE  │         │               │        │
   └────┬──────┘         │               │        │
        │                │               │        │
        ▼                │               │        │
   ┌──────────┐         │               │        │
   │  RECIPE  │─────────┴───────────────┤        │
   │  DETAIL  │                         │        │
   └────┬──────┘                         │        │
        │                               │        │
        ▼                               │        │
   ┌──────────┐                         │        │
   │  COOKING │◄────────────────────────┘        │
   │   MODE   │                                  │
   └────┬─────┘                                  │
        │                                        │
        ├──────────────────┐                     │
        ▼                  ▼                     │
   ┌──────────┐    ┌──────────┐                  │
   │ MISTAKE   │    │   VOICE  │─────────────────┘
   │   FIX     │    │ COMMAND  │
   └───────────┘    │ OVERLAY  │
                    └──────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         BOTTOM NAVIGATION BAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   │
│    │   🏠    │   │   🔍    │   │   ⏰    │   │   📊    │   │   👤    │   │
│    │         │   │         │   │         │   │         │   │         │   │
│    │  Home   │   │ Search  │   │  Timers │   │ Nutrition│  │Profile │   │
│    │         │   │         │   │         │   │         │   │         │   │
│    └─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

FLOATING ACTION BUTTON (Always Visible):
┌─────────────────────┐
│  🎤 "Hey Chef"      │  ← Wake word button (bottom center, above nav)
└─────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         VOICE COMMAND REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WAKE WORD: "Hey Chef"

┌─────────────────────────────────────────────────────────────────────────────┐
│  NAVIGATION COMMANDS                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  "Next step"          → Go to next cooking step                              │
│  "Previous step"      → Go back one step                                     │
│  "Repeat"             → Read current step again                              │
│  "Skip step"          → Skip current step                                     │
│  "Go to step [n]"     → Jump to specific step                                │
│  "Start recipe"       → Begin cooking mode                                    │
│  "Pause cooking"      → Pause current step                                    │
│  "Resume cooking"     → Resume paused step                                    │
│  "Exit cooking"       → Exit cooking mode                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  TIMER COMMANDS                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  "Set timer for [n] minutes" → Start new timer                                │
│  "Start timer"               → Begin current step timer                      │
│  "Pause timer"               → Pause active timer                             │
│  "Resume timer"              → Resume paused timer                            │
│  "Reset timer"               → Reset current timer                            │
│  "How much time left?"        → Announce remaining time                        │
│  "Timer done"                → Acknowledge timer completion                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  RECIPE COMMANDS                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  "What ingredients?"     → List all ingredients for current step              │
│  "How much [ingredient]?" → Get specific amount                                │
│  "Show ingredients"      → Display ingredients list                           │
│  "Scale recipe for [n]"   → Adjust portions                                    │
│  "Save recipe"            → Bookmark current recipe                           │
│  "Share recipe"           → Share recipe link                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  MISTAKE FIX COMMANDS                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  "Too much salt"         → Trigger salt reduction solution                    │
│  "Too spicy"             → Trigger spice reduction solution                    │
│  "Burnt"                 → Trigger burnt food solution                        │
│  "Too sour"              → Trigger acid reduction solution                     │
│  "Too sweet"             → Trigger sweet reduction solution                    │
│  "It's raw"              → Trigger undercooked food solution                  │
│  "Help"                  → Repeat last instruction                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  GENERAL COMMANDS                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  "Stop listening"        → Deactivate voice mode                              │
│  "Repeat after me"       → Teach custom phrase                                 │
│  "Change language"        → Switch voice language                               │
│  "What's cooking?"       → Announce current recipe and step                     │
│  "I'm done"              → Mark recipe as complete                            │
└─────────────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         TYPOGRAPHY SPECIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────────┐
│  FONT FAMILY: Roboto (Android default) + Noto Sans (Indic languages)         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  H1 - Screen Title          24sp   Bold     #FFFFFF                        │
│  H2 - Section Header        20sp   SemiBold #FFFFFF                        │
│  H3 - Card Title            18sp   Medium   #FFFFFF                        │
│  Body Large                  16sp   Regular  #FFFFFF                        │
│  Body Medium                14sp   Regular  #B0B0B0                        │
│  Body Small                12sp   Regular  #757575                        │
│  Caption                   11sp   Regular  #757575                        │
│                                                                             │
│  BUTTON TEXT              14sp   Medium   #FFFFFF (uppercase)              │
│  VOICE LISTENING TEXT    20sp   Medium   #FFB300 (animated)               │
│  TIMER DISPLAY           48sp   Bold     #FF6F00                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         SPACING & LAYOUT SYSTEM (8pt Grid)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────────┐
│  SPACING TOKENS:                                                              │
│                                                                             │
│  xs   = 4dp   (tight spacing between related elements)                      │
│  sm   = 8dp   (default inner padding)                                        │
│  md   = 16dp  (standard screen padding, card padding)                        │
│  lg   = 24dp  (section spacing)                                               │
│  xl   = 32dp  (major section breaks)                                         │
│  xxl  = 48dp  (screen header top padding)                                    │
│                                                                             │
│  CARD CORNER RADIUS: 12dp                                                    │
│  BUTTON CORNER RADIUS: 8dp                                                   │
│  INPUT FIELD CORNER RADIUS: 8dp                                              │
│                                                                             │
│  CARD ELEVATION: 2dp (subtle shadow)                                         │
│  FAB ELEVATION: 6dp (floating action button)                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         ANIMATION SPECIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────────┐
│  TRANSITIONS:                                                                │
│                                                                             │
│  Screen Transitions    300ms  Ease-In-Out  (slide horizontal)               │
│  Modal/Bottom Sheet    250ms  Ease-Out     (slide up)                        │
│  Fade Transitions      200ms  Linear                                            │
│                                                                             │
│  VOICE BUTTON:                                                              │
│  Idle → Listening    400ms  Pulse animation (scale 1.0 → 1.1 → 1.0)       │
│  Listening            Continuous ripple effect with saffron glow            │
│                                                                             │
│  TIMER:                                                                     │
│  Tick Animation        Subtle scale pulse every second                       │
│  Completion            500ms  Bounce + vibration + color change to green    │
│                                                                             │
│  STEP TRANSITION:                                                            │
│  Step Complete         300ms  Slide left + fade out                          │
│  New Step              300ms  Slide from right + fade in                    │
│                                                                             │
│  CARD INTERACTIONS:                                                          │
│  Press                 100ms  Scale to 0.98 + slight darken                  │
│  Release               150ms  Scale to 1.0                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         ICON SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────────┐
│  ICON LIBRARY: Material Design Icons + Custom Food Icons                     │
│                                                                             │
│  NAVIGATION:                                                                  │
│  🏠 Home             ← Back             ☰ Hamburger Menu                     │
│  🔍 Search           ⋮ More Options     ✕ Close                             │
│                                                                             │
│  ACTIONS:                                                                    │
│  🎤 Voice/Wake       ▶️ Play            ⏸️ Pause                            │
│  ⏹️ Stop             ⏭️ Skip           ⏮️ Previous                          │
│  ✓ Check/Complete    + Add              ✏️ Edit                              │
│  🗑️ Delete           📤 Share           💾 Save/Bookmark                     │
│                                                                             │
│  TIMERS:                                                                     │
│  ⏰ Timer             🔔 Alert           🔁 Reset                             │
│  ▶️ Start            ⏸️ Pause Timer     ⏹️ Stop Timer                        │
│                                                                             │
│  FOOD CATEGORIES:                                                            │
│  🍚 Grains/Rice      🥘 Curry/Dal       🧅 Spice/Vegetable                   │
│  🥛 Dairy            🍗 Meat             🥗 Salad/Fresh                       │
│  🍳 Cooking/Egg      🍲 Stew             🧁 Snack/Dessert                    │
│                                                                             │
│  STATUS:                                                                     │
│  ✓ Available/In Stock   ○ Out of Stock   ⚠️ Warning                          │
│  🔴 Emergency           ✓✓ Verified      🔄 Loading/Processing               │
│                                                                             │
│  NUTRITION:                                                                  │
│  🔥 Calories         💪 Protein       🍞 Carbs     🥑 Fat                     │
│  📊 Progress         📈 Increase      📉 Decrease                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         ERROR STATES & FEEDBACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────────┐
│  ERROR TYPES:                                                                │
│                                                                             │
│  ❌ NETWORK ERROR                                                            │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  📡 No Internet Connection                                            │ │
│  │                                                                        │ │
│  │  Some features require internet                                        │ │
│  │  - Voice commands (some)                                                │ │
│  │  - YouTube extraction                                                   │ │
│  │  - Quick commerce                                                       │ │
│  │                                                                        │ │
│  │  [Downloaded recipes work offline ✓]                                   │ │
│  │                                                                        │ │
│  │             [Retry]                                                    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ❌ YOUTUBE URL INVALID                                                      │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  🔗 Invalid YouTube URL                                                │ │
│  │                                                                        │ │
│  │  Please paste a valid YouTube link                                     │ │
│  │  Example: youtube.com/watch?v=...                                      │ │
│  │             youtu.be/...                                               │ │
│  │             youtube.com/shorts/...                                     │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ❌ VOICE NOT RECOGNIZED                                                     │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  🤔 Didn't catch that                                                  │ │
│  │                                                                        │ │
│  │  Try saying:                                                           │ │
│  │  • "Next step"                                                         │ │
│  │  • "Set timer for 5 minutes"                                           │ │
│  │  • "How much salt?"                                                    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ✅ SUCCESS TOASTS (Bottom of screen, auto-dismiss 3s)                        │
│  ───────────────────────────────────────────────────────────────────────   │
│  "Recipe saved ✓"                                                           │
│  "Timer set for 10 minutes ✓"                                               │
│  "Ingredients added to pantry ✓"                                            │
│  "Order placed! Arriving in 12 minutes ✓"                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         OFFLINE CAPABILITY INDICATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────────┐
│  OFFLINE MODE INDICATOR:                                                     │
│  ┌───────────────────────────────────────────────────────────────────────┐   │
│  │  📴 Offline Mode Active                                               │   │
│  │      Core features available: Voice, Timers, Downloaded Recipes     │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  DOWNLOADED CONTENT (Available Offline):                                     │
│  • Voice models (Whisper small)                                              │
│  • TTS voices (Hindi, English)                                               │
│  • 20 pre-loaded Indian recipes                                              │
│  • Common mistake database (20+ scenarios)                                    │
│  • Ingredient nutrition data (100+ items)                                    │
│                                                                             │
│  REQUIRES INTERNET:                                                          │
│  • YouTube video extraction                                                  │
│  • Cross-referencing recipes                                                 │
│  • Quick commerce ordering                                                   │
│  • Cloud sync/backup                                                         │
│  • Real-time voice recognition (full models)                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         QUICK COMMERCE PARTNERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────────┐
│  PARTNER              │ DELIVERY │ LOGO COLORS     │ INTEGRATION            │
├───────────────────────┼──────────┼─────────────────┼───────────────────────┤
│  Zepto                │ 10-15min │ Purple/Pink     │ Deep link to app       │
│  Blinkit              │ 10-20min │ Green/White     │ Deep link to app       │
│  Instamart            │ 15-25min │ Yellow/Black    │ Deep link to app       │
│  Swiggy Instamart     │ 15-30min │ Orange/White    │ Deep link to app       │
└─────────────────────────────────────────────────────────────────────────────┘

ORDER FLOW:
1. Detect missing ingredients from pantry
2. Show items with quantities and prices
3. Compare delivery times/prices across platforms
4. One-tap deep link to partner app with cart pre-filled
5. User completes payment in partner app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         MISTAKE FIX DATABASE (SAMPLE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────────┐
│  PROBLEM              │  SOLUTION                                            │
├───────────────────────┼──────────────────────────────────────────────────────┤
│  Too Much Salt        │  Add potato pieces, simmer 5min, remove              │
│                       │  OR add sugar/lemon to balance                       │
├───────────────────────┼──────────────────────────────────────────────────────┤
│  Too Spicy            │  Add coconut milk, yogurt, or cream                  │
│                       │  OR add more vegetables/tomato                       │
├───────────────────────┼──────────────────────────────────────────────────────┤
│  Burnt Food           │  If bottom burnt: transfer top to new pot carefully  │
│                       │  If fully burnt: start over, salvaged stock if soup │
├───────────────────────┼──────────────────────────────────────────────────────┤
│  Too Sour             │  Add sugar, honey, or potato to absorb               │
│                       │  OR add more vegetables to dilute                    │
├───────────────────────┼──────────────────────────────────────────────────────┤
│  Too Sweet            │  Add lemon juice, vinegar, or salt                   │
│                       │  Add chili for balance                              │
├───────────────────────┼──────────────────────────────────────────────────────┤
│  Undercooked Rice     │  Add 1/4 cup water, cover, cook 5-7 min low         │
│                       │  Or microwave with damp paper towel 2 min           │
├───────────────────────┼──────────────────────────────────────────────────────┤
│  Overcooked Dal       │  Mash部分, add tempering, serve as soup             │
│                       │  Or make pakora batter from excess                  │
├───────────────────────┼──────────────────────────────────────────────────────┤
│  Dry Curry            │  Add hot water, milk, or yogurt                     │
│                       │  Simmer 2-3 minutes covered                         │
├───────────────────────┼──────────────────────────────────────────────────────┤
│  Sticky Rice          │  Spread on plate, let dry 5 min                      │
│                       │  OR make fried rice with it                          │
├───────────────────────┼──────────────────────────────────────────────────────┤
│  Too Much Ghee        │  Serve with roti/naan to absorb                     │
│                       │  Or add boiled vegetables to balance                 │
└───────────────────────┴──────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                              END OF DESIGN SPEC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━