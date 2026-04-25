# Smart Cooking Assistant - Testing Checklist

This document provides a structured approach to verify the functionality, reliability, and user experience of the Smart Cooking Assistant (Android & Web Mockup).

---

## 1. Sample Test Data
Use these inputs during testing to ensure consistency.

| Feature | Sample Input |
| :--- | :--- |
| **YouTube URL (Valid)** | `https://www.youtube.com/watch?v=dQw4w9WgXcQ` |
| **YouTube URL (Short)** | `https://youtu.be/dQw4w9WgXcQ` |
| **Invalid URL** | `https://google.com` or `not-a-link` |
| **Pantry Item (New)** | Name: `Red Chili Powder`, Qty: `500`, Unit: `g` |
| **Pantry Item (Edge Case)** | Name: `Averylongingredientnamewithnospaces`, Qty: `-10`, Unit: `!` |

---

## 2. Feature Test Cases

### A. Recipe Extraction
| Test ID | Test Name | Steps to Perform | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| EXT-01 | Valid URL Extraction | Paste valid YouTube URL and click "Extract" | Progress bar shows 100%, recipe title & steps appear. | | [ ] |
| EXT-02 | Invalid URL Validation | Enter "google.com" and click "Extract" | App shows error: "Invalid YouTube URL format". | | [ ] |
| EXT-03 | Empty Input | Leave URL field blank and click "Extract" | App shows alert: "Please enter a YouTube URL". | | [ ] |
| EXT-04 | High Confidence Check | Verify extraction stats table appears | Table shows confidence scores (>90%) for ingredients/steps. | | [ ] |

### B. Cooking Mode (Interactive)
| Test ID | Test Name | Steps to Perform | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| COOK-01 | Step Navigation (Next) | Click "NEXT STEP" button | UI updates to Step 2, text changes, TTS reads new step. | | [ ] |
| COOK-02 | Step Navigation (Prev) | Go to Step 2, then click "PREVIOUS" | UI returns to Step 1 correctly. | | [ ] |
| COOK-03 | Timer Functionality | Click "START" on a step with a timer | Timer counts down; "Step Complete" alert at 00:00. | | [ ] |
| COOK-04 | Timer Reset | Navigate to a new step | Timer resets to the specific duration of the new step. | | [ ] |

### C. Pantry Management
| Test ID | Test Name | Steps to Perform | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PAN-01 | Add Valid Item | Add "Sugar", "1", "kg" | Item appears in the list with "In Stock" status. | | [ ] |
| PAN-02 | Persistence Check | Add an item and refresh the page/app | Item is still present in the list (Loaded from DB). | | [ ] |
| PAN-03 | Delete Item | Click "✕" or Delete on "Sugar" | Item is removed from the UI and Database. | | [ ] |
| PAN-04 | Empty Quantity | Add "Salt" with Qty "0" | Item status automatically shows "Missing" (Red). | | [ ] |

---

## 3. Voice Integration Tests (Android Only)
| Test ID | Test Name | Steps to Perform | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| VOICE-01 | "Next" Command | Say "Next" clearly while in Cooking Mode | App navigates to next step automatically. | | [ ] |
| VOICE-02 | "Repeat" Command | Say "Repeat" clearly | App speaks the current instruction again. | | [ ] |
| VOICE-03 | "Exit" Command | Say "Stop" or "Exit" | App closes Cooking Mode and returns to Home. | | [ ] |
| VOICE-04 | Background Noise | Speak command with kitchen noise (water running) | App correctly identifies keyword despite noise. | | [ ] |

---

## 4. Edge Cases & Error Scenarios
| Test ID | Test Name | Scenario | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| EDGE-01 | Large Data | Extract a recipe with 50+ steps | UI remains responsive; text doesn't overflow container. | | [ ] |
| EDGE-02 | Offline Mode | Turn off Internet and try to Extract | App shows "Cloud extraction failed. Check connection." | | [ ] |
| EDGE-03 | Special Characters | Add pantry item named "@#$$%^" | App handles characters without crashing. | | [ ] |
| EDGE-04 | Rapid Clicking | Spam "NEXT STEP" button | App transitions smoothly without jumping multiple steps. | | [ ] |

---

## 5. User Flow Test (Complete Workflow)
**Workflow: "From Discovery to Table"**
1. **Discover:** Find a recipe on YouTube.
2. **Extract:** Paste into Smart Chef and wait for extraction.
3. **Pantry Check:** Check missing ingredients. Add "Onions" to Pantry.
4. **Prepare:** Click "Go to Cooking Mode".
5. **Cook:** Navigate all 6 steps using **Voice Only**.
6. **Finish:** Exit app.

**Expected Result:** Zero manual touches after clicking "Go to Cooking Mode". Every instruction read aloud clearly.
